foam.CLASS({
  package: 'foam.build',
  name: 'ScrapedArtifactDAO',
  extends: 'foam.dao.ProxyDAO',
  requires: [
    'foam.dao.ArrayDAO',
    'foam.build.Script'
  ],
  properties: [
    {
      class: 'String',
      name: 'root'
    },
    {
      name: 'delegate',
      factory: function() {
        var dao = this.ArrayDAO.create();

        function visitFile(file) {
        }

        function visitLink(link) {
        }

        function visitDir(dir) {
          var names = require('fs').readdirSync(dir);
        }
        
        function visit(stat) {
          var stat = require('fs').lstatSync(path);

          return stat.isDirectory() ?
            visitDir(path) : stat.isSymbolicLink() ?
            visitLink(path) : stat.isFile() ?
            visitFile(path) :
            null;
        }

        return dao;
      }
    }
  ],
  methods: [
    function find(id) {
      return this.delegate.find(id).then(function(o) {
        if ( o ) return o;
        
        var code = require('fs').readFileSync(this.root + require('path').sep + id.replace(/\./g, "/") + ".js");
        
        return this.Script.create({
          id: id,
          jsCode: code
        });
      }.bind(this));
    }
  ]
});
