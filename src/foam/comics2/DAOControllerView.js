/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.comics2',
  name: 'DAOControllerView',
  extends: 'foam.u2.View',
  requires: [
    'foam.comics2.DAOCreateControllerView',
    'foam.comics2.DAOUpdateControllerView',
    'ca.vany.ui.PagedTableView',
    'foam.parse.QueryParser'
  ],

  imports: [
    'windows'
  ],

  properties: [
    {
      class: 'foam.dao.DAOProperty',
      name: 'data'
    },
    {
      name: 'queryParser',
      expression: function(data$of) {
        return data$of ? this.QueryParser.create({ of: data$of }) : null
      }
    },
    {
      name: 'predicate',
      expression: function(searchString, queryParser) {
        return searchString && queryParser ? queryParser.parseString(searchString) :
          null;
      }
    },
    {
      class: 'foam.dao.DAOProperty',
      name: 'filteredDAO',
      expression: function(data, predicate) {
        return predicate ? data.where(predicate) : data;
      }
    },
    {
      class: 'String',
      name: 'title',
      expression: function(data$of) {
        return 'Browse ' + data$of.name;
      }
    },
    {
      class: 'String',
      name: 'searchString'
    },
    {
      class: 'Enum',
      name: 'daoControllerMode',
      of: 'foam.comics2.DAOControllerMode',
      value: 'EDIT'
    },
    'selection',
    'softSelection'
  ],

  methods: [
    function initE() {
      var self = this;

      this.
        addClass(this.myClass()).
        startContext({ data: this }).
        start('div').
        addClass(this.myClass('actions')).
        addAll(this.cls_.getAxiomsByClass(foam.core.Action)).
        end().
        start('div').
        add('Search:', this.SEARCH_STRING).
        end().
        endContext().
        startContext({
          dblclick: this.onDoubleClickRow,
          editRecord: this.onSingleClickRow
        }).
        start(this.PagedTableView, { data$: this.filteredDAO$ }).end().
        endContext();
    },
    function onEdit(obj) {
      this.windows.push(this.DAOUpdateControllerView.create({
        dao: this.data,
        key: obj.id
      }));
    },
    function onCreate() {
      this.windows.push(this.DAOCreateControllerView.create({
        dao: this.data
      }));
    }
  ],

  listeners: [
    function onDoubleClickRow(obj) {
      if ( this.daoControllerMode == foam.comics2.DAOControllerMode.SELECT ) {
        this.onSelect(obj);
      } else {
        this.onEdit(obj);
      }
    },

    function onSingleClickRow(obj) {
      this.softSelection = obj;
    },

    function onSelect(obj) {
      this.selection = obj;
    }
  ],

  actions: [
    {
      name: 'create',
      isEnabled: function(mode, data) {
        return mode == foam.u2.DisplayMode.RW && !! data;
      },
      code: function() {
        this.onCreate();
      }
    },
    {
      name: 'edit',
      isEnabled: function(mode, softSelection) {
        return mode == foam.u2.DisplayMode.RW && !! softSelection;
      },
      code: function() {
        this.onEdit(this.softSelection);
      }
    },
    {
      name: 'select',
      isAvailable: function(daoControllerMode) {
        return daoControllerMode == foam.comics2.DAOControllerMode.SELECT;
      },
      isEnabled: function(softSelection, selection) {
        return !! softSelection &&
          ( ! selection || ! foam.util.equals(selection.id, softSelection.id) );
      },
      code: function() {
        this.onSelect(this.softSelection);
      }
    }
  ]
});
