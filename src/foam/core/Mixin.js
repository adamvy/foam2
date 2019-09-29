foam.CLASS({
  package: 'foam.core',
  name: 'Mixin',
  properties: [
    {
      name: 'name'
    },
    [ 'priority', 150 ]
  ],
  methods: [
    function installInClass(cls) {
      cls.installModel(this.__context__.lookup(this.name).model_);
    }
  ]
});

foam.CLASS({
  package: 'foam.core',
  name: 'ModelMixinRefinement',
  refines: 'Model',
  properties: [
    {
      class: 'AxiomArray',
      of: 'foam.core.Mixin',
      name: 'mixins',
      adaptArrayElement: function(e) {
        return foam.String.isInstance(e) ?
          foam.core.Mixin.create({ name: e }) :
          foam.core.Mixin.create(e);
      }
    }
  ]
});
