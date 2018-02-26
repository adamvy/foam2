// TODO: find the right package for this.?

foam.CLASS({
  package: 'foam.build',
  name: 'FileDAO',
  extends: 'foam.dao.AbstractDAO',
  requires: [
    'foam.build.File'
  ],
  properties: [
    {
      class: 'String',
      name: 'root',
      preSet: function(_, v) {
        return require('path').normalize(require('path').resolve(v));
      }
    }
  ],
  methods: [
    function put_(x, obj) {
      var sep = require('path').sep;
      var path = require('path').resolve(
        this.root,
        require('path').normalize(
          obj.path.split('/').join(sep)));

      if ( ! path.startsWith(this.root) ) {
        throw new Error("Invalid path.");
      }

      this.ensurePath_(path);

      try {
        require('fs').writeFileSync(path, obj.contents);
      } catch(e) {
        return Promise.reject(e);
      }

      return Promise.resolve(obj);
    },
    function ensurePath_(p) {
      var i = p.indexOf(require('path').sep);
      var last = p.lastIndexOf(require('path').sep);

      while ( i != -1 && i <= last ) {
        var part = p.substring(0, i);
        i = p.indexOf(require('path').sep, i + 1);

        if ( part == '' ) continue;

        try {
          var stat = require('fs').statSync(part);
          if ( ! stat.isDirectory() ) throw new Error('Parent directory ' + part + ' is not a directory.');
        } catch(e) {
          if ( e.code == "ENOENT" ) {
            require('fs').mkdirSync(part);
          } else {
            throw e;
          }
        }
      }
    },
    function select_() {
      // TODO: implement directory traversal, in particular
      // support .where(EQ(File.PARENT, someFile))
      throw new Error("Unsupported.");
    }
  ]
});
