foam.CLASS({
  package: 'foam.script',
  name: 'ParserCompilerDemo',
  requires: [
    'foam.script.BootstrapParserCompiler'
  ],
  properties: [
    {
      class: 'String',
      view: { class: 'foam.u2.tag.TextArea', rows: 30 },
      name: 'grammar'
    },
    {
      class: 'String',
      view: { class: 'foam.u2.tag.TextArea', rows: 30 },
      visibility: 'RO',
      name: 'one',
    },
    {
      class: 'String',
      view: { class: 'foam.u2.tag.TextArea', rows: 30 },
      visibility: 'RO',
      name: 'two',
    },
    {
      class: 'String',
      view: { class: 'foam.u2.tag.TextArea', rows: 30 },
      visibility: 'RO',
      name: 'three',
    },
  ],
  actions: [
    function go() {
      var res, parser, grammar = this.grammar;

      try {
        res = this.BootstrapParserCompiler.create().parseString(grammar, 'grammar');
        res = res ? res.value : res;
      } catch (e) {
        res = '' + e;
      }


      if ( res ) this.one = foam.json.Pretty.stringify(res);

      try {
        parser = res.buildClass().create();
        res = parser.parseString(grammar, 'grammar');
        res = res ? res.value : res;
      } catch(e) {
        res = '' + e;
      }

      if ( res ) this.two = foam.json.Pretty.stringify(res);

      try {
        parser = res.buildClass().create();
        res = parser.parseString(grammar, 'grammar');

        res = res ? res.value : res;
      } catch(e) {
        res = '' + e;
      }

      if ( res ) this.three = foam.json.Pretty.stringify(res);
    }
  ]
});
