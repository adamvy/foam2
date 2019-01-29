foam.CLASS({
  package: 'foam.build.java',
  name: 'Build',
  //TODO: Generate from models not classes so we don't have to build
  //all the classes, we can totally manage this from just plain old
  //data
  properties: [
    {
      class: 'StringArray',
      name: 'classes',
      adapt: function(_, s) {
        if ( foam.String.isInstance(s) ) {
          return s.split(',');
        }
        return s;
      }
    },
    {
      class: 'StringArray',
      name: 'skeletons',
    },
    {
      class: 'StringArray',
      name: 'proxies'
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

      // TODO: Only UNIX paths supported.

      function mkdirP(then, abort, path) {
        if ( path == '.' || path == '/' )
          then();
        else
          require('fs').stat(path, function(err, stat) {
            if ( err && err.code == 'ENOENT' )
              require('fs').mkdir(path, function(err) {
                if ( err ) abort(err);
                mkdirP(then, abort, require('path').dirname(path));
              });
            else if ( err )
              abort(err);
            else if ( stat && ! stat.isDirectory )
              abort(path + " already exists and is not a directory.");
            else
              mkdirP(then, abort, require('path').dirname(path));
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
        function generator(f) {
          return forEach(function(then, abort, id) {
            var path = self.targetDirectory + '/' + id.replace(/\./g, '/') + '.java';
            var fd;

            sequence(
              compose(mkdirP, value(require('path').dirname(path))),
              function(then, abort) {
                open(function(a) { fd = a; then(); }, abort, path);
              },
              compose(
                function(then, abort, data) {
                  write(then, abort, fd, data);
                },
                compose(generator, value(id))),
              function(then, abort) {
                close(then, abort, fd);
              })(then, abort);
          })
        }
        var classes = generator(function(then, abort, id) {
          then(self.__context__.lookup(id).
               buildJavaClass().
               toJavaSource());
        });

        var skeletons = generator(function(then, abort, id) {
          then(foam.java.Skeleton.create({ of: self.__context__.lookup(id) }).
               buildJavaClass().
               toJavaSource());
        });

        var proxies = generator(function(then, abort, id) {
          var pkg = id.substring(0, id.lastIndexOf('.'));
          var name = id.substring(id.lastIndexOf('.') + 1);

          var proxyId = (pkg ? (pkg + '.') : '') + 'Proxy' + name;

          if ( self.__context__.lookup(proxyId, true) )
            then(then, abort, self.__context__.lookup(proxyId).
                 buildJavaClass().
                 toJavaSource());
          else {
            var model = foam.core.Model.create({
              package: pkg,
              name: 'Proxy' + name,
              implements: [ id ],
              properties: [
                { class: 'Proxy', of: id, name: 'delegate' }
              ]
            });
            then(model.buildClass().
                 buildJavaClass().
                 toJavaSource());
          }
        });

      parallel(
        compose(proxies, value(this.proxies)),
        compose(skeletons, value(this.skeletons)),
        compose(classes, value(this.classes)))(nop, function(...args) {
          console.log("ERROR", ...args);
        });
      }
    }
  ]
});
