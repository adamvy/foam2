foam.CLASS({
  package: 'foam.comics2',
  name: 'Window',
  properties: [
    {
      name: 'id',
      hidden: true
    },
    {
      class: 'String',
      name: 'title'
    },
    {
      class: 'Boolean',
      name: 'active',
      value: false
    },
    {
      name: 'view'
    }
  ]
});
