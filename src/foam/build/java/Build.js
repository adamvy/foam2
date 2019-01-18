foam.CLASS({
  package: 'foam.build.java',
  name: 'Build',
  //TODO: Generate from models not classes so we don't have to build
  //all the classes, we can totally manage this from just plain old
  //data
  requires: [
    'foam.build.File',
    'foam.build.FileDAO'
  ],
  properties: [
    {
      class: 'StringArray',
      name: 'classes'
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
        if ( path == '.' || path == '/' ) then();
        require('fs').mkdir(path, function(err) {
          if ( err ) abort(err);
          mkdirP(then, abort, require('path').dirname(path));
        });
      }

      function open(then, abort, path) {
        require('fs').fopen(path, "w", function(err, fd) {
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

      var loadClass = foam.cps.wrap(function() {
        return self.__context__.lookup(id);
      });

      function generateJavaSource(then, abort, cls) {
        then(cls.buildJavaClass().toJavaSource());
      }

      function generateSkeleton(then, abort, cls) {
        generateJavaSource(then, abort, foam.java.Skeleton.create({ of: cls }));
      }

      function generateProxy(then, abort, id) {
        var pkg = id.substring(0, id.lastIndexOf('.'));
        var name = id.substring(id.lastIndexOf('.') + 1);

        var proxyId = (pkg ? (pkg + '.') : '') + 'Proxy' + name;

        if ( self.__context__.lookup(proxyId, true) )
          generateJavaSource(then, abort, self.__context__.lookup(proxyId));
        else {
          var model = foam.core.Model.create({
            package: pkg,
            name: 'Proxy' + name,
            implements: [ id ],
            properties: [
              { class: 'Proxy', of: id, name: 'delegate' }
            ]
          });
          generateJavaSource(then, abort, model.buildClass());
        }
      }

      with ( foam.cps ) {
        var classes = forEach(function(then, abort, id) {
          var path = self.targetDirectory + '/' + id.replace(/\./g, '/');
          var fd;

          sequence(
            function(then, abort) {
              open(function(a) { fd = a; then(); }, abort, path);
            },
            compose(
              function(then, abort, data) {
                write(then, abort, fd, data);
              },
              compose(generateJavaSource, function(then) { then(self.__context__.lookup(id)); })),
            function(then, abort) {
              close(then, abort, fd);
            })(then, abort);
        });

        var skeletons = forEach(function(then, abort, id) {
          var path = self.targetDirectory + '/' + id.replace(/\./g, '/');
          var fd;

          sequence(
            function(then, abort) {
              open(function(a) { fd = a; then(); }, abort, path);
            },
            compose(
              function(then, abort, data) {
                write(then, abort, fd, data);
              },
              compose(generateSkeleton, function(then) { then(self.__context__.lookup(id)); })),
            function(then, abort) {
              close(then, abort, fd);
            })(then, abort);
        });

        var proxies = forEach(function(then, abort, id) {
          var path = self.targetDirectory + '/' + id.replace(/\./g, '/');
          var fd;

          sequence(
            function(then, abort) {
              open(function(a) { fd = a; then(); }, abort, path);
            },
            compose(
              function(then, abort, data) {
                write(then, abort, fd, data);
              },
              compose(generateProxy, value(id))),
            function(then, abort) {
              close(then, abort, fd);
            })(then, abort);
        });
      }

      parallel(
        compose(proxies, value(this.proxies)),
        compose(skeletons, value(this.skeletons)),
        compose(classe, value(this.classes)))(nop, function(e) {
          console.error("ERROR", e);
        });
    }
  ]
});
