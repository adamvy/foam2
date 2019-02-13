foam.CLASS({
  package: 'foam.build.java',
  name: 'Build',
  //TODO: Generate from models not classes so we don't have to build
  //all the classes, we can totally manage this from just plain old
  //data
  properties: [
    {
      class: 'String',
      name: 'configFile'
    },
    {
      class: 'String',
      name: 'targetDirectory'
    }
  ],
  methods: [
    function execute() {
      var x = this.__context__;
      var self = this;

      var classes = [];
      var proxies = [];
      var skeletons = [];

      var data = require('fs').readFileSync(this.configFile, 'utf8')
      data = JSON.parse(data);

      classes = data.classes || [];
      proxies = data.proxies || [];
      skeletons = data.skeletons || [];

      // TODO: Only UNIX paths supported.

      function mkdirP(then, abort, path) {
        require('fs').stat(path, function(err, stat) {
          if ( err && err.code == 'ENOENT' )
            mkdirP(function() {
              require('fs').mkdir(path, function(err) {
                if ( err && err.code == 'EEXIST' ) mkdirP(then, abort, path);
                else if ( err ) abort(err);
                else then();
              });
            }, abort, require('path').dirname(path))
          else if ( err )
            abort(err);
          else if ( stat && ! stat.isDirectory() )
            abort(path + " already exists and is not a directory.");
          else
            then();
        });
      }

      function open(then, abort, path) {
        require('fs').open(path, "w", function(err, fd) {
          if ( err ) abort(err);
          else then(fd);
        });
      }

      function encode(then, abort, str) {
        then(Buffer.from(str, 'utf8'));
      }

      function write(then, abort, fd, data) {
        var len = data.byteLength;
        require('fs').write(fd, data, function(err, written, str) {
          if ( err ) abort(err);
          else then();
        });
      }

      function close(then, abort, fd) {
        require('fs').close(fd, function(err) {
          if ( err ) abort(err);
          then();
        });
      }

      with ( foam.cps ) {
        function generateOne(then, abort, cls) {
          var id = cls.id;
          var path = self.targetDirectory + '/' + id.replace(/\./g, '/') + '.java';
          var fd;

          sequence(
            function(then, abort) {
              if ( foam.core.FObject.isSubClass(cls) &&
                   foam.core.MultiPartID.isInstance(cls.getAxiomByName('id')) )
                generateOne(then, abort, self.__context__.lookup(cls.id + 'Id'));
              else
                then();
            },
            compose(mkdirP, value(require('path').dirname(path))),
            function(then, abort) {
              open(function(a) { fd = a; then(); }, abort, path);
            },
            function(then, abort) {
              write(then, abort, fd, cls.buildJavaClass().toJavaSource());
            },
            function(then, abort) {
              close(then, abort, fd);
            })(then, abort);
        }

        var generateAll = forEach(generateOne);

        function getClass(then, abort, id) {
          then(self.__context__.lookup(id));
        }
        function getSkeleton(then, abort, id) {
          then(foam.java.Skeleton.create({ of: self.__context__.lookup(id) }));
        }
        function getProxy(then, abort, id) {
          var pkg = id.substring(0, id.lastIndexOf('.'));
          var name = id.substring(id.lastIndexOf('.') + 1);

          var proxyId = (pkg ? (pkg + '.') : '') + 'Proxy' + name;

          if ( self.__context__.lookup(proxyId, true) )
            then(self.__context__.lookup(proxyId));
          else {
            var model = foam.core.Model.create({
              package: pkg,
              name: 'Proxy' + name,
              implements: [ id ],
              properties: [
                { class: 'Proxy', of: id, name: 'delegate' }
              ]
            });
            then(model.buildClass());
          }
        }

        parallel(
          compose(generateAll, compose(map(getProxy), value(proxies))),
          compose(generateAll, compose(map(getSkeleton), value(skeletons))),
          compose(generateAll, compose(map(getClass), value(classes))))(nop, function(...args) {
            console.log("ERROR", ...args);
          });
      }
    }
  ]
});
