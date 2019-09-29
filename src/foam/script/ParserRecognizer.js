foam.CLASS({
  package: 'foam.script',
  name: 'BootstrapParserRecognizer',
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

      grammarId: P.and(
        P.sym('identifier'),
        P.and(
          P.literal('.'),
          P.sym('identifier')).
          star()),

      grammar: P.and(
        P.sym('optionalWhitespace'),
        P.and(
          P.literal('grammar'),
          P.and(
            P.sym('whitespace'),
            P.and(
              P.sym('grammarId'),
              P.and(
                P.sym('whitespace'),
                P.and(
                  P.literal('='),
                  P.and(
                    P.sym('whitespace'),
                    P.and(
                      P.literal('('),
                      P.and(
                        P.and(
                          P.sym('optionalWhitespace'),
                          P.sym('production')).star(),
                        P.and(
                          P.sym('optionalWhitespace'),
                          P.literal(')'))))))))))),

      production: P.and(
        P.sym('identifier'),
        P.and(
          P.sym('optionalWhitespace'),
          P.and(
            P.literal('='),
            P.and(
              P.sym('optionalWhitespace'),
              P.and(
                P.sym('compoundRule'),
                P.literal(';')))))),

      ruleComponent: P.and(
        P.or(
          P.sym('parenthesisedRule'),
          P.or(
            P.sym('optionalRule'),
            P.or(
              P.sym('starRule'),
              P.or(
                P.sym('literalRule'),
                P.sym('symbolRule'))))),
        P.sym('subtractionRule').maybe()),

      subtractionRule: P.and(
        P.sym('optionalWhitespace'),
        P.and(
          P.literal('-'),
          P.and(
            P.sym('optionalWhitespace'),
            P.sym('ruleComponent')))),

      compoundRule: P.and(
        P.sym('ruleComponent'),
        P.and(
          P.sym('optionalWhitespace'),
          P.or(
            P.sym('sequenceRule'),
            P.sym('alternateRule')).
            maybe())),

      // Right recursive on compound rule
      sequenceRule: P.and(
        P.literal(','),
        P.and(
          P.sym('optionalWhitespace'),
          P.sym('compoundRule'))),

      alternateRule: P.and(
        P.literal('|'),
        P.and(
          P.sym('optionalWhitespace'),
          P.sym('compoundRule'))),

      identifier: P.and(
        P.sym('letter'),
        P.sym('letter').star()),

      symbolRule: P.sym('identifier'),

      nestedRule: P.and(
        P.sym('optionalWhitespace'),
        P.and(
          P.sym('compoundRule'),
          P.sym('optionalWhitespace'))),

      parenthesisedRule: P.and(
        P.literal('('),
        P.and(
          P.sym('nestedRule'),
          P.literal(')'))),


      starRule: P.and(
        P.literal('{'),
        P.and(
          P.sym('nestedRule'),
          P.literal('}'))),

      optionalRule: P.and(
        P.literal('['),
        P.and(
          P.sym('nestedRule'),
          P.literal(']'))),

      singleQuoteLiteral: P.and(
        P.literal("'"),
        P.and(
          P.except(
            P.sym('character'),
            P.literal("'")),
          P.and(
            P.except(
              P.sym('character'),
              P.literal("'")).
              star(),
            P.literal("'")))),

      doubleQuoteLiteral: P.and(
        P.literal('"'),
        P.and(
          P.except(
            P.sym('character'),
            P.literal('"')),
          P.and(
            P.except(
              P.sym('character'),
              P.literal('"')).
              star(),
            P.literal('"')))),

      literalRule: P.or(
        P.sym('singleQuoteLiteral'),
        P.sym('doubleQuoteLiteral'))
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
