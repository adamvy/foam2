foam.CLASS({
  package: 'foam.script',
  name: 'ParserCompiler',
  requires: [
    //    'foam.script.ParserParser',
    'foam.script.BootstrapParserCompiler as ParserParser',
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
      name: 'output',
      expression: function(grammar) {
        var res;
        try {
          res = this.ParserParser.create().parseString(grammar, 'grammar');
          if ( ! res ) {
            return 'Failed to parse.';
          }
          return foam.json.Pretty.stringify(res.value);
        } catch (e) {
          return e.toString();
        }
      }
    }
  ]
});
