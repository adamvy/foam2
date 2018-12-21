foam.CLASS({
  package: 'foam.build',
  name: 'Test',
  requires: [
    'foam.build.WebBinary',
    'foam.build.ScrapedArtifactDAO'
  ],
  exports: [
    'artifactDAO'
  ],
  properties: [
    {
      class: 'String',
      name: 'controller'
    },
    {
      class: 'String',
      name: 'target'
    },
    {
      class: 'String',
      name: 'srcdir'
    },
    {
      name: 'artifactDAO',
      factory: function() {
        return this.ScrapedArtifactDAO.create({ root: this.srcdir });
      }
    }
  ],
  methods: [
    function execute() {
      var bin = this.WebBinary.create({
        controller: this.controller
      });
      bin.build(this.__subContext__, this.target);
    }
  ]
});
