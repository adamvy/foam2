foam.CLASS({
  package: 'foam.comics2',
  name: 'DAOUpdateController',

  properties: [
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
      hidden: true,
      name: 'key'
    },
    {
      name: 'originalObj',
      hidden: true
    },
    {
      name: 'obj',
      postSet: function(_, o) {
        this.originalObj = o.clone();
      },
      view: 'foam.u2.DetailView',
    },
    {
      class: 'String',
      name: 'writeError'
    },
    {
      class: 'String',
      name: 'loadError'
    },
    {
      class: 'Boolean',
      name: 'inProgress',
      value: false
    },
    {
      class: 'Boolean',
      name: 'loading',
      value: false
    },
    {
      class: 'foam.dao.DAOProperty',
      name: 'dao',
      hidden: true
    },
    {
      class: 'Enum',
      of: 'foam.u2.ControllerMode',
      name: 'controllerMode',
      hidden: true,
      factory: function() {
        return foam.u2.ControllerMode.EDIT;
      }
    }
  ],

  reactions: [
    [ '', 'propertyChange.key', 'load' ]
  ],

  topics: [
    'finished'
  ],

  listeners: [
    function load() {
      if ( this.loading ) this.__context__.warn("Already loading.");

      this.loading = true;
      this.obj = undefined;
      this.dao.find(this.key).then(function(o) {
        this.loading = false;
        if ( o == null ) this.loadError = 'No object found.';
        else this.obj = o.clone();
      }.bind(this), function(e) {
        this.loading = false;
        this.loadError = e.mesage;
      }.bind(this));
    }
  ],

  actions: [
    {
      name: 'cancel',
      code: function() { }
    },
    {
      name: 'save',
      isEnabled: function(obj$, originalObj$, inProgress) {
        return ( !! obj$ ) &&  ( ! inProgress ) && ( obj$.compareTo(originalObj$) != 0 );
      },
      code: function() {
        var self = this;
        this.inProgress = true;
        this.writeError = "";
        this.dao.put(this.obj.clone()).then(function(obj) {
          this.inProgress = false;
          this.obj = obj.clone();
          this.finished.pub();
        }.bind(this), function(e) {
          this.inProgress = false;
          this.writeError = "Error saving record: " + e.message;
        }.bind(this));
      }
    },
    {
      name: 'delete',
      isEnabled: function(obj, inProgress) {
        return ( !! obj ) && ( ! inProgress );
      },
      confirmationRequired: true,
      code: function() {
        var self = this;
        this.inProgress = true;
        this.dao.remove(this.obj).then(function() {
          this.inProgress = false;
          this.finished.pub();
        }.bind(this), function(e) {
          this.inProgress = false;
          this.writeError = 'Error deleting record: ' + e.message;
        });
      }
    }
  ]
});
