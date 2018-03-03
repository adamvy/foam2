foam.CLASS({
  package: 'foam.build.java',
  name: 'Class',
  documentation: 'Represents a standalone java class as you would find in a .java file.',
  properties: [
    {
      class: 'String',
      name: 'package'
    },
    {
      class: 'String',
      name: 'name'
    },
    {
      class: 'String',
      name: 'id',
      expression: function(package, name) {
        return package ?
          package + '.' + name :
          name;
      }
    },
    {
      class: 'String',
      name: 'code'
    }
  ]
});
