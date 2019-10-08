foam.CLASS({
  package: 'foam.script.parse',
  name: 'ParserContext',
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'StringPStream',

  properties: [
    {
      name: 'str',
    },
    {
      name: 'pos',
    },
    {
      name: 'head',
      getter: function() {
        return this.str[0][this.pos];
      }
    },
    {
      name: 'tail',
      getter: function() {
        if ( ! this.instance_.tail ) {
          var ps = this.cls_.create();
          ps.str = this.str;
          ps.pos = this.pos + 1;
          this.instance_.tail = ps;
        }
        return this.instance_.tail;
      },
      setter: function(value) {
        this.instance_.tail = value;
      }
    },
    {
      name: 'valid',
      getter: function() {
        return this.pos < this.str[0].length;
      }
    },
    {
      name: 'value',
      setter: function(value) { this.instance_.value = value; },
      getter: function() {
        return this.instance_.value !== undefined ?
          this.instance_.value :
          this.str[0].charAt(this.pos - 1);
      }
    }
  ],

  methods: [
    function initArgs() {},

    function setValue(value) {
      // Force undefined values to null so that hasOwnProperty checks are faster.
      if ( value === undefined ) value = null;
      var ps = this.cls_.create();
      ps.str   = this.str;
      ps.pos   = this.pos;
      ps.tail  = this.tail;
      ps.value = value;
      return ps;
    },

    function setString(s) {
      if ( ! this.pos ) this.pos = 0;
      if ( ! this.str ) this.str = [];
      this.str[0] = s;
    },

    function substring(end) {
      foam.assert(this.str === end.str &&
                  end.pos >= this.pos,
                  'Cannot make substring: end PStream is not a tail of this.');

      return this.str[0].substring(this.pos, end.pos);
    },

    function apply(p, obj) {
      return p.parse(this, obj);
    },

    function compareTo(o) {
      return this.pos - o.pos;
    }
  ]
});

foam.CLASS({
  package: 'foam.script',
  name: 'BootstrapParserParser',
  requires:  [
    'foam.script.parse.Sequence',
    'foam.script.parse.Alternate',
    'foam.script.parse.Literal',
    'foam.script.parse.Symbol',
    'foam.script.parse.Except',
    'foam.script.parse.Optional',
    'foam.script.parse.Repeat'
  ],
  extends: 'foam.script.BootstrapParserRecognizer',
  methods: [
    {
      class: 'foam.script.CompiledMethod',
      name: 'production',
      ast: { class: 'foam.script.parse.WithAction',
             arg: { class: 'foam.script.parse.Super' },
             args: [ 'name', 'ast' ],
             code: function(name, ast) {
               return foam.script.CompiledMethod.create({
                 name: name,
                 ast: ast
               });
             }
           }
    },
    {
      class: 'foam.script.CompiledMethod',
      name: 'grammarId',
      ast: { class: 'foam.script.parse.Substring',
             arg: { class: 'foam.script.parse.Super' } }
    },
    {
      class: 'foam.script.CompiledMethod',
      name: 'grammar',
      ast: { class: 'foam.script.parse.WithAction',
             arg: { class: 'foam.script.parse.Super' },
             args: [ 'id', 'productions' ],
             code: function(id, productions) {
               debugger;

               var pkg, name;

               if ( id.indexOf('.') != -1 )
                 pkg = id.substring(0, id.lastIndexOf('.'));

               name = id.substring(id.lastIndexOf('.') + 1);

               return ps.setValue(foam.core.Model.create({
                 package: pkg,
                 name: name,
                 extends: 'foam.script.parse.AbstractGrammar',
                 mixins: [ 'foam.script.parse.CharacterClasses' ],
                 methods: productions.map(m => m[1])
               }));
               },
             }
    },
    function sequenceRule(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;

      return ps.setValue([this.Sequence, ps.value[2]]);
    },
    function subtractionRule(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;

      return ps.setValue(ps.value[1][1][1]);
    },
    function alternateRule(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;

      return ps.setValue([this.Alternate, ps.value[2]]);
    },
    function identifier(ps) {
      var start = ps;
      ps = this.SUPER(ps);

      return ps ? ps.setValue(start.substring(ps)) : ps;
    },
    {
      class: 'foam.script.CompiledMethod',
      ast: { class: 'foam.script.parse.WithAction',
             arg: { class: 'foam.script.parse.Super' },
             args: [ 'primary', 'negated'],
             code: function(primary, negated) {
               if ( negated ) return this.Except.create({
                 arg1: primary,
                 arg2: negated
               });

               return primary;
             }
           },
      name: 'ruleComponent'
    },
    {
      class: 'foam.script.CompiledMethod',
      ast: { class: 'foam.script.parse.WithAction',
             arg: { class: 'foam.script.parse.Super' },
             args: [ 'component', 'combinator' ],
             code: function(lhs, rhs) {
               return rhs ? rhs[0].create({ arg1: lhs, arg2: rhs }) : lhs;
             }
           },
      name: 'compoundRule'
    },
    function nestedRule(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;

      return ps.setValue(ps.value[1][0]);
    },
    function starRule(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;

      return ps.setValue(this.Repeat.create({
        arg: ps.value[1][0]
      }));
    },
    function parenthesisedRule(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;

      return ps.setValue(ps.value[1][0]);
    },
    function optionalRule(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;

      return ps.setValue(this.Optional.create({
        arg: ps.value[1][0]
      }));
    },
    function symbolRule(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;

      return ps.setValue(this.Symbol.create({ name: ps.value }));
    },
    function escapedSingleQuote(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;
      return ps.setValue('\'');
    },
    function literalRule(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;

      return ps.setValue(this.Literal.create({
        string: ps.value[1][0].join('')
      }));
    }
  ]
});
