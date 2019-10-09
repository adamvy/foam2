foam.CLASS({
  package: 'foam.script',
  name: 'SmalltalkCompilerDemo',
  requires: [
    'foam.script.SmalltalkRecognizer',
  ],
  properties: [
    {
      class: 'String',
      view: { class: 'foam.u2.tag.TextArea', rows: 30 },
      name: 'statement'
    },
    {
      class: 'String',
      view: { class: 'foam.u2.tag.TextArea', rows: 30 },
      visibility: 'RO',
      name: 'output',
      expression: function(statement) {
        var res;
        try {
          res = this.SmalltalkRecognizer.create().parseString(statement, 'statement');
          if ( ! res ) {
            return 'Failed to parse.';
          }
          return foam.json.Compact.stringify(res.value);
        } catch (e) {
          return e.toString();
        }
      }
    }
  ]
});
