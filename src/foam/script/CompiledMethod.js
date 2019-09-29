foam.INTERFACE({
  package: 'foam.script',
  name: 'Compilable',
  methods: [
    {
      type: 'Code',
      name: 'compile'
    }
  ]
});

foam.CLASS({
  package: 'foam.script',
  name: 'CompiledMethod',
  extends: 'foam.core.Method',
  documentation: `A method who's code is compiled at install time from some sort of AST.`,
  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.script.Compilable',
      name: 'ast'
    },
    {
      name: 'code',
      expression: function(ast) {
        return ast.compile();
      }
    }
  ]
});
