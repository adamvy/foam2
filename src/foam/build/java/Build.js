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
  imports: [
    'classloader'
  ],
  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.build.java.Classes',
      name: 'classes'
    },
    {
      class: 'String',
      name: 'targetDirectory'
    },
    {
      class: 'String',
      name: 'classesFile'
    },
    {
      name: 'fileDAO',
      factory: function() {
        return this.FileDAO.create({ root: this.targetDirectory });
      }
    },
    {
      class: 'StringArray',
      name: 'internalBlacklist',
      factory: function() {
        return [
          'FObject',
          'foam.core.Validatable',

          // No java equivalent
          'foam.core.AbstractEnum',
          'foam.core.AbstractInterface',
          'foam.core.Property',
          'foam.core.String',
          'foam.blob.BlobBlob',

          // These have hand written java impls so we don't want to
          // clobber them.  TODO: Change generator prefer hand written
          // java files over generated.  Alternatively just update the
          // models so they generate properly and drop the hand
          // written versions.
          'foam.dao.FilteredDAO',
          'foam.dao.LimitedDAO',
          'foam.dao.OrderedDAO',
          'foam.dao.SkipDAO',
          'foam.dao.JDAO',

          // TODO: These models currently don't compile in java but
          // could be updated to compile properly.
          'foam.dao.CompoundDAODecorator',
          'foam.dao.DAODecorator',
          'foam.dao.FlowControl',
          'foam.dao.PromisedDAO',
          'foam.dao.sync.SyncRecord',
          'foam.dao.sync.VersionedSyncRecord',
          'foam.mlang.order.ThenBy',
          'foam.mlang.Expressions',
          'foam.nanos.menu.MenuBar',

          'foam.box.Context',
          'foam.box.SocketBox',
          'foam.box.WebSocketBox',
          'foam.box.TimeoutBox',
          'foam.box.RetryBox',
          'foam.dao.CachingDAO',
          'foam.dao.CompoundDAODecorator',
          'foam.dao.DecoratedDAO',
          'foam.dao.DeDupDAO',
          'foam.dao.IDBDAO',
          'foam.dao.LoggingDAO',
          'foam.dao.MDAO',
          'foam.dao.PromisedDAO',
          'foam.dao.RequestResponseClientDAO',
          'foam.dao.SyncDAO',
          'foam.dao.TimingDAO'
        ];
      }
    }
  ],
  methods: [
    function execute() {
      if ( ! this.classes && ! this.classesFile ) {
        throw new Error("No classes specified.");
      }

      var self = this;

      var classes = this.classes ?
          Promise.resolve(classes) :
          new Promise(function(resolve, reject) {
            require('fs').readFile(self.classesFile, { encoding: 'utf8' }, function(err, text) {
              if ( err ) {
                reject(err);
                return;
              }
              resolve(text);
            });
          }).then(function(json) {
            return foam.json2.Deserializer.create().aparseString(self.__context__, json);
          });


      var seq = function(a, f) {
        var i = 0;
        return function() {
          if ( i < a.length ) return f(a[i++]);
        };
      };

      var join = function(a, b) {
        return function() {
          return a() || b();
        };
      };

      var loop = function(f) {
        return function l() {
          var v = f();
          return v && v.then ? v.then(l) : v;
        }
      };

      classes.then(function(conf) {
        var classes = seq(conf.classes, self.generateClass.bind(self));
        var skeletons = seq(conf.skeletons, self.generateSkeleton.bind(self));
        var proxies = seq(conf.proxies, self.generateProxy.bind(self));

        loop(join(join(classes, skeletons), proxies))();
      });
    },
    function generateClass(cls, done) {
      console.log("Generate:", cls);
      done = done || {};
      if ( done[cls] ) return Promise.resolve();
      done[cls] = true;

      if ( this.internalBlacklist.indexOf(cls) != -1 ) {
        return Promise.resolve();
      }

      var self = this;
      return this.classloader.load(cls).then(function(cls) {
        var a = [].concat(
          cls.getAxiomsByClass(foam.core.Requires).map(function(r) {
            return r.javaPath ? self.generateClass(r.javaPath, done) : Promise.resolve();
          }),
          cls.getAxiomsByClass(foam.core.Implements).map(function(r) {
            return self.generateClass(r.path, done);
          }),
          cls.model_.extends ? self.generateClass(cls.model_.extends, done) : Promise.resolve(),
          self.generateClass_(cls, done));
        return Promise.all(a);
      });
    },
    function generateClass_(cls) {
      console.log("generate_", cls.id);
      return this.fileDAO.put(this.File.create({
        path: cls.id.replace(/\./g, '/') + '.java',
        contents: cls.buildJavaClass().toJavaSource()
      }));
    },
    function generateSkeleton(cls) {
      var self = this;
      return this.classloader.load(cls).then(function(cls) {
        return self.generateClass_(foam.java.Skeleton.create({ of: cls }));
      });
    },
    function generateProxy(cls) {
      var self = this;
      return this.classloader.load(cls).then(function(intf) {
        var proxy = self.__context__.lookup(intf.package + '.Proxy' + intf.name, true);

        if ( proxy ) return self.generateClass_(proxy);

        proxy = foam.core.Model.create({
          package: intf.package,
          name: 'Proxy' + intf.name,
          implements: [intf.id],
          properties: [
            {
              class: 'Proxy',
              of: intf.id,
              name: 'delegate'
            }
          ]
        });

        return self.generateClass_(proxy.buildClass());
      });
    }
  ]
});
