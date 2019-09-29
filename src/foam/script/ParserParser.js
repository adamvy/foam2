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
    function production(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return undefined;

      return ps.setValue(foam.script.CompiledMethod.create({
        name: ps.value[0],
        ast: ps.value[1][1][1][1][0]
      }));
    },
    function grammarId(ps) {
      var start = ps;
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;

      return ps.setValue(start.substring(ps));
    },
    function grammar(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return undefined;

      var id = ps.value[1][1][1][0];

      var pkg, name;

      if ( id.indexOf('.') != -1 )
        pkg = id.substring(0, id.lastIndexOf('.'));

      name = id.substring(id.lastIndexOf('.') + 1);

      return ps.setValue(foam.core.Model.create({
        package: pkg,
        name: name,
        extends: 'foam.script.parse.AbstractGrammar',
        mixins: [ 'foam.script.parse.CharacterClasses' ],
        methods: ps.value[1][1][1][1][1][1][1][1][0].map(m => m[1])
      }));
    },
    function whitespace(ps) {
      ps = this.SUPER(ps);
      return ps ? ps.setValue(null) : ps;
    },
    function optionalWhitespace(ps) {
      ps = this.SUPER(ps);
      return ps ? ps.setValue(null) : ps;
    },
    function sequenceRule(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;

      return ps.setValue([this.Sequence, ps.value[1][1]]);
    },
    function subtractionRule(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;

      return ps.setValue([this.Except, ps.value[1][1][1]]);
    },
    function alternateRule(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;

      return ps.setValue([this.Alternate, ps.value[1][1]]);
    },
    function identifier(ps) {
      var start = ps;
      ps = this.SUPER(ps);

      return ps ? ps.setValue(start.substring(ps)) : ps;
    },
    function ruleComponent(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;

      if ( ! ps.value[1] ) return ps.setValue(ps.value[0]);

      return ps.setValue(ps.value[1][0].create({
        arg1: ps.value[0],
        arg2: ps.value[1][1]
      }));
    },
    function compoundRule(ps) {
      ps = this.SUPER(ps);
      if ( !ps ) return ps;

      // if no compound piece, return the first component.

      if ( ! ps.value[1][1] ) return ps.setValue(ps.value[0]);


      return ps.setValue(ps.value[1][1][0].create({
        arg1: ps.value[0],
        arg2: ps.value[1][1][1]
      }));
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
    function literalRule(ps) {
      ps = this.SUPER(ps);
      if ( ! ps ) return ps;

      return ps.setValue(this.Literal.create({
        string: ps.value[1][0] + ps.value[1][1][0].join('')
      }));
    }
  ]
});
