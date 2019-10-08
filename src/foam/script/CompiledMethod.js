foam.INTERFACE({
  package: 'foam.script',
  name: 'Compilable',
  methods: [
    {
      type: 'Code',
      name: 'compile',
      args: [
        { name: 'scope' }
      ]
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
      expression: function(name, ast) {
        var x = {
          _methodName: name,
          locals: {}
        };

        return ast.compile(x);
      }
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'ParserMethod',
  extends: 'foam.core.Method',
  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.script.Compilable',
      name: 'parser'
    },
    {
      class: 'Function',
      name: 'action',
    },
    {
      name: 'code',
      expression: function(parser, action) {
      }
    }
  ],
  methods: [
  ]
});
