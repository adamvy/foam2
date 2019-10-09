foam.CLASS({
  package: 'foam.script',
  name: 'BootstrapParserCompiler',
  extends: 'foam.script.parse.AbstractGrammar',
  mixins: [
    'foam.script.parse.CharacterClasses'
  ],
  methods: (function() {
    var P = foam.script.parse.Parsers.create();

    var symbolMap = {
      optionalWhitespace: P.or(
        P.sym('whitespaceCharacter'),
        P.sym('comment')).
        star(),

      whitespace: P.and(
        P.or(P.sym('whitespaceCharacter'),
             P.sym('comment')),
        P.sym('optionalWhitespace')),

      comment: P.and(
        P.literal('(*'),
        P.and(
          P.except(
            P.sym('character'),
            P.literal('*)')).
            star(),
          P.literal('*)'))),

      package: P.withAction(
        P.named('xs', P.and(P.sym('identifier'),
                            P.literal('.')).
                star()),
        function(xs) { var s = xs.map(a => a.join('')).join(''); return s.substring(0, s.length - 1); }),

      grammar: P.withAction(
        P.and(
          P.sym('optionalWhitespace'),
          P.and(
            P.literal('grammar'),
            P.and(
              P.sym('whitespace'),
              P.and(
                P.named('pkg', P.sym('package')),
                P.and(
                  P.named('name', P.substring(P.sym('identifier'))),
                  P.and(
                    P.sym('whitespace'),
                    P.and(
                      P.literal('='),
                      P.and(
                        P.sym('whitespace'),
                        P.and(
                          P.literal('('),
                          P.and(
                            P.named('productions',
                                    P.and(
                                      P.sym('optionalWhitespace'),
                                      P.sym('production')).star()),
                            P.and(
                              P.sym('optionalWhitespace'),
                              P.literal(')')))))))))))),
        function(pkg, name, productions) {
          return foam.core.Model.create({
            package: pkg,
            name: name,
            extends: 'foam.script.parse.AbstractGrammar',
            mixins: [ 'foam.script.parse.CharacterClasses' ],
            methods: productions.map(m => m[1])
          });
        }),

      production: P.withAction(
        P.and(
          P.named('name', P.sym('identifier')),
        P.and(
          P.sym('optionalWhitespace'),
          P.and(
            P.literal('='),
            P.and(
              P.sym('optionalWhitespace'),
              P.and(
                P.named('ast', P.sym('compoundRule')),
                P.and(
                  P.named('action', P.sym('semanticAction').maybe()),
                  P.literal(';'))))))),
        function(name, ast, action) {
          var args = [];
          ast.visit(function(node) {
            if ( foam.script.parse.Named.isInstance(node) )
              args.push(node.name);
          });

          var compiled = Function.apply(null, args.concat(action));

          if ( action ) {
            ast = foam.script.parse.WithAction.create({
              code: compiled,
              args: args,
              arg: ast
            });
          }

          return foam.script.CompiledMethod.create({
            name: name,
            ast: ast
          });
        }),

      semanticAction: P.withAction(
        P.and(
          P.sym('optionalWhitespace'),
          P.and(
            P.literal('->'),
            P.and(
              P.sym('optionalWhitespace'),
              P.named('a', P.sym('action'))))),
        function(a) { return a; }),

      action: P.withAction(
        P.and(
          P.literal('{{'),
          P.and(
            P.named('xs', P.except(P.sym('character'), P.literal('}}')).star()),
            P.literal('}}'))),
        function(xs) {
          return xs.join('');
        }),


      ruleComponent: P.withAction(
        P.and(
          P.named('primary',
                  P.or(
                    P.sym('parenthesisedRule'),
                    P.or(
                      P.sym('optionalRule'),
                      P.or(
                        P.sym('starRule'),
                        P.or(
                          P.sym('literalRule'),
                          P.sym('symbolRule')))))),
          P.and(
            P.named('name', P.sym('namedMatch').maybe()),
            P.named('negated', P.sym('subtractionRule').maybe()))),
        function(primary, name, negated) {
          var parser = negated ? foam.script.parse.Except.create({
            arg1: primary,
            arg2: negated
          }) : primary;

          return name ? foam.script.parse.Named.create({
            name: name,
            arg: parser
          }) : parser;
        }),

      namedMatch: P.withAction(
        P.and(P.literal(':'),
              P.named('id', P.sym('identifier'))),
        function(id) { return id; }),

      subtractionRule: P.withAction(
        P.and(
          P.sym('optionalWhitespace'),
          P.and(
            P.literal('-'),
            P.and(
              P.sym('optionalWhitespace'),
              P.named('rhs', P.sym('ruleComponent'))))),
        function(rhs) { return rhs; }),

      compoundRule: P.withAction(
        P.and(
          P.named('lhs', P.sym('ruleComponent')),
          P.and(
            P.sym('optionalWhitespace'),
            P.named('rhs',
                    P.or(
                      P.sym('sequenceRule'),
                      P.sym('alternateRule')).
                    maybe()))),
        function(lhs, rhs) {
          if ( lhs == null ) debugger;

          if ( rhs ) return rhs[0].create({
            arg1: lhs,
            arg2: rhs[1]
          });
          return lhs;
        }),

      // Right recursive on compound rule
      sequenceRule: P.withAction(
        P.and(
          P.literal(','),
          P.and(
            P.sym('optionalWhitespace'),
            P.named('rhs', P.sym('compoundRule')))),
        function(rhs) {
          return [ foam.script.parse.Sequence, rhs ];
        }),

      alternateRule: P.withAction(
        P.and(
          P.literal('|'),
          P.and(
            P.sym('optionalWhitespace'),
            P.named('rhs', P.sym('compoundRule')))),
        function(rhs) {
          return [ foam.script.parse.Alternate, rhs ];
        }),

      identifier: P.substring(
        P.and(
          P.sym('letter'),
          P.sym('letter').star())),

      symbolRule: P.withAction(
        P.named('name', P.sym('identifier')),
        function(name) {
          return foam.script.parse.Symbol.create({
            name: name
          });
        }),

      nestedRule: P.withAction(
        P.and(
          P.sym('optionalWhitespace'),
          P.and(
            P.named('inner', P.sym('compoundRule')),
            P.sym('optionalWhitespace'))),
        function(inner) { return inner; }),

      parenthesisedRule: P.withAction(
        P.and(
          P.literal('('),
          P.and(
            P.named('inner', P.sym('nestedRule')),
            P.literal(')'))),
        function(inner) { return inner; }),

      starRule: P.withAction(
        P.and(
          P.literal('{'),
          P.and(
            P.named('inner', P.sym('nestedRule')),
            P.literal('}'))),
        function(inner) { return foam.script.parse.Repeat.create({ arg: inner }); }),

      optionalRule: P.withAction(
        P.and(
          P.literal('['),
          P.and(
            P.named('inner', P.sym('nestedRule')),
            P.literal(']'))),
        function(inner) {
          return foam.script.parse.Optional.create({ arg: inner });
        }),

      escapedSingleQuote: P.withAction(
        P.literal('\'\''),
        function() { return '\''; }),

      literalRule: P.withAction(
        P.and(
          P.literal('\''),
          P.and(
            P.named('chars',
                    P.or(
                      P.sym('escapedSingleQuote'),
                      P.except(
                        P.sym('character'),
                        P.literal('\''))).
                    star()),
            P.literal('\''))),
        function(chars) {
          return foam.script.parse.Literal.create({
            string: chars.join('')
          });
        })
    };

    var symbols = Object.keys(symbolMap);

    return symbols.map(function(s) {
      return foam.script.CompiledMethod.create({
        name: s,
        ast: symbolMap[s]
      });
    });
  })()
});
