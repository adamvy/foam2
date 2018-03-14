foam.CLASS({
  package: 'foam.apploader',
  name: 'ModelFileDAO',
  documentation: 'ModelDAO which reads hand written models.',
  extends: 'foam.dao.AbstractDAO',
  properties: [
    {
      class: 'Map',
      name: 'cache'
    },
    {
      class: 'StringArray',
      name: 'flags'
    },
    'fetcher',
  ],
  methods: [
    {
      name: 'find_',
      code: function(x, id) {
        var promise;
        var self = this;

        if ( this.cache[id] ) {
          promise = Promise.resolve(this.cache[id]);
        } else {
          promise = this.fetcher.getFile(id).then(function(text) {
            if ( ! text ) return null;

            var json;

            var context = {
              foam: Object.create(foam)
            };

            context.foam.GENMODEL = function(m) {
              json = m;
              json.__genmodel__ = true;
            };

            context.foam.CLASS = function(m) {
              var jsonId = m.package ?
                  m.package + '.' + m.name :
                  m.name;

              if ( jsonId !== id ) {
                self.cache[jsonId] = m;
                return;
              }

              json = m;
            };

            context.foam.INTERFACE = function(json) {
              json.class = json.class || 'foam.core.InterfaceModel',
              context.foam.CLASS(json);
            };

            context.foam.ENUM = function(json) {
              json.class = json.class || 'foam.core.EnumModel';
              context.foam.CLASS(json);
            };

            context.foam.RELATIONSHIP = function(r) {
              console.log("Latching", r.sourceModel, r.targetModel);
              console.log("Found while loading", id);

              var references = foam.json.references(x, r);

              var sem = 2;
              function trigger() {
                sem--;
                if ( sem == 0 ) {
                  var obj = foam.dao.Relationship.create(r, x);

                  obj.validate && obj.validate();
                  foam.package.registerClass(obj);
                }
              }

              foam.package.waitForClass(trigger, r.sourceModel);
              foam.package.waitForClass(trigger, r.targetModel);
            };

            with ( context ) { eval(text + '\n//# sourceURL=' + id); }

            if ( ! json ) {
              throw new Error('No model found for ' + id);
            }

            return json;
          });
        }

        return promise.then(function(json) {
          if ( ! json ) return null;

          var references = foam.json.references(x, json);

          if ( json.__genmodel__ ) {
            references = references.concat(json.requires.map(x.classloader.load.bind(x.classloader)));
          }

          return Promise.all(references).then(function() {
            if ( json.__genmodel__ ) {
              return json.build(x);
            }

            return foam.lookup(json.class || 'Model').create(json, x);
          });
        });
      }
    }
  ]
});
