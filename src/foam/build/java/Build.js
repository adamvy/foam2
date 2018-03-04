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
        var classes = conf.classes;
        var skeletons = conf.skeletons;
        var proxies = conf.proxies;

        var p = [];

        for ( var i = 0 ; i < classes.length ; i++ ) {
          p.push(self.classloader.load(classes[i]).then(function(cls) {
            cls.getAxiomsByClass(foam.core.Requires).forEach(function(r) {
              if ( ( ! r.flags || r.flags.indexOf('java') != -1 ) && r.javaPath ) classes.push(r.javaPath);
            });
            cls.getAxiomsByClass(foam.core.Implements).forEach(function(r) {
              if ( ! r.flags || r.flags.indexOf('java') != -1 ) classes.push(r.path);
            });
            if ( cls.model_.extends ) classes.push(cls.model_.extends);
          }, (function(id) {
            return function(e) {
              console.warn("Skipping class that failed to load", id, e);
            };
          })(classes[i])));
        }

        skeletons.forEach(function(s) { p.push(self.classloader.load(s)); });
        proxies.forEach(function(s) { p.push(self.classloader.load(s)); });

        return Promise.all(p).then(function() {
          classes.forEach(self.generateClass.bind(self));
          skeletons.forEach(self.generateSkeleton.bind(self));
          proxies.forEach(self.generateProxy.bind(self));
        });
      });
    },
    function generateClass(cls) {
      if ( this.internalBlacklist.indexOf(cls) != -1 ) return;
      this.generateClass_(foam.lookup(cls));
    },
    function generateClass_(cls) {
      return this.fileDAO.put(this.File.create({
        path: cls.id.replace(/\./g, '/') + '.java',
        contents: cls.buildJavaClass().toJavaSource()
      }));
    },
    function generateSkeleton(cls) {
      cls = foam.lookup(cls);
      this.generateClass_(foam.java.Skeleton.create({ of: cls }));
    },
    function generateProxy(intf) {
      intf = foam.lookup(intf);

      var proxy = this.__context__.lookup(intf.package + '.Proxy' + intf.name, true);

      if ( proxy ) return this.generateClass_(proxy);

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
      return this.generateClass_(proxy.buildClass());
    }
  ]
});
