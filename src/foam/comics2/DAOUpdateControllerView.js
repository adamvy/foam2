foam.CLASS({
  package: 'foam.comics2',
  name: 'DAOUpdateControllerView',
  extends: 'foam.comics2.DAOCreateControllerView',

  properties: [
    {
      name: 'key',
      postSet: function(_, k) {
        this.obj = undefined;
        this.dao.find(k).then(function(o) {
          if ( o == null ) this.error = new Error('No object found.');
          this.obj = o.clone();
        }.bind(this), function(e) {
          this.loadError = e;
        }.bind(this));
      }
    },
    {
      name: 'obj',
      factory: null
    },
    {
      name: 'loadError'
    },
    {
      class: 'Boolean',
      name: 'initialLoad',
      value: true
    },
    {
      class: 'String',
      name: 'title',
      expression: function(dao$of, obj) {
        if ( obj ) {
          var title = obj.cls_.getAxiomsByClass(foam.core.String).filter(function(p) { return ! p.hidden; })[0];
        }
        return 'Edit ' + ( title ? title.f(obj) : dao$of.name );
      }
    },
    {
      class: 'Enum',
      of: 'foam.u2.ControllerMode',
      name: 'controllerMode',
      factory: function() {
        return foam.u2.ControllerMode.EDIT;
      }
    }
  ],
  methods: [
    function objView() {
        this.add(this.slot(function(obj, loadError) {
          return loadError ? this.E('span').add('Error loading object.', loadError.message) :
            obj ? this.DetailView.create({ data: obj }) :
          this.E('span').add('Loading...');
        }));
    }
  ],

  actions: [
    {
      name: 'delete',
      isEnabled: function(obj, inProgress) { return ( !! obj ) && ( ! inProgress ); },
      confirmationRequired: true,
      code: function() {
        var self = this;
        this.inProgress = true;
        this.dao.remove(this.obj).then(function() {
          this.inProgress = false;
          this.windows.close(this);
        }.bind(this), function(e) {
          this.error = e;
        });
      }
    }
  ]
});
