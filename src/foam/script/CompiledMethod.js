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

foam.INTERFACE({
  package: 'foam.script',
  name: 'Node',
  methods: [
    {
      type: 'Void',
      name: 'visit',
      args: [
        { name: 'visitor', type: 'Function' }
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
        var f = ast.compile();

        return function(ps) {
          var x = {
            _methodName: name,
            locals: {}
          };

          return f.call(this, x, ps);
        }
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
