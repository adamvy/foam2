foam.CLASS({
  package: 'foam.comics2',
  name: 'DAOCreateControllerView',
  extends: 'foam.u2.Controller',

  requires: [
    'foam.u2.DetailView'
  ],

  imports: [
    'windows',
  ],

  exports: [
    'controllerMode'
  ],

  properties: [
    {
      name: 'obj',
      factory: function() {
        return this.dao.of.create(null, this);
      }
    },
    'error',
    {
      class: 'Boolean',
      name: 'inProgress',
      value: false
    },
    {
      class: 'Boolean',
      name: 'initialLoad',
      value: true
    },
    {
      class: 'foam.dao.DAOProperty',
      name: 'dao'
    },
    {
      class: 'String',
      name: 'title',
      expression: function(dao$of, obj) {
        return 'Create ' + dao$of.name;
      }
    },
    {
      class: 'Enum',
      of: 'foam.u2.ControllerMode',
      name: 'controllerMode',
      factory: function() {
        return foam.u2.ControllerMode.CREATE;
      }
    }
  ],
  methods: [
    function initE() {
      this.
        addAll(this.cls_.getAxiomsByClass(foam.core.Action)).
        add(this.slot(function(error) {
          return error ?
            this.E('span').
            addClass(this.myClass('error')).
            add("Error saving record", error.message) :
            this.E('span');
        })).
        call(this.objView).
        addAll(this.cls_.getAxiomsByClass(foam.core.Action));
    },
    function objView() {
      this.start(this.DetailView, { data: this.obj }).end();
    }
  ],

  actions: [
    {
      name: 'cancel',
      code: function() {
        // TODO: Confirmation if data has changed.
        this.windows.close(this);
      }
    },
    {
      name: 'save',
      isEnabled: function(obj, inProgress) { return ( !! obj ) &&  ( ! inProgress ); },
      code: function() {
        var self = this;
        this.inProgress = true;
        this.error = "";
        this.dao.put(this.obj.clone()).then(function() {
          this.inProgress = false;
          this.windows.close(this);
        }.bind(this), function(e) {
          this.inProgress = false;
          this.error = "Error saving record: " + e.message;
        }.bind(this));
      }
    }
  ]
});
