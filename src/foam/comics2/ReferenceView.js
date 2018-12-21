foam.CLASS({
  package: 'foam.comics2',
  name: 'ReferenceView',
  extends: 'foam.u2.View',
  requires: [
    'foam.mlang.ExpressionsSingleton',
    'foam.comics2.DAOControllerView',
    'foam.dao.ArraySink'
  ],
  properties: [
    {
      class: 'String',
      name: 'targetDAOKey',
    },
    {
      name: 'targetProperty'
    },
    {
      class: 'Class',
      name: 'of'
    },
    {
      class: 'foam.dao.DAOProperty',
      name: 'targetDAO',
      expression: function(targetDAOKey) {
        var dao = this.__context__[targetDAOKey];
        foam.assert(dao, 'No dao found for', targetDAOKey);
        return dao;
      }
    },
    {
      name: 'mapExpression',
      expression: function(targetDAO) {
        var axioms = targetDAO.of.getAxiomsByClass(foam.core.String).filter(function(a) {
          return ! a.hidden;
        });
        if ( axioms.length ) return axioms[0];

        axioms = targetDAO.of.getAximos().filter(function(a) {
          return ! a.hidden;
        });

        if ( axioms.length ) return axioms[0];

        return targetDAO.of.ID;
      }
    }
  ],
  methods: [
    function detach() {
      debugger;
      this.SUPER();
    },

    function fromProperty(prop) {
      this.of = prop.of;
      this.targetDAOKey = prop.targetDAOKey;
      this.targetProperty = prop.targetProperty;
    },
    function initE() {
      var E = this.ExpressionsSingleton.create();

      var view = this;

      this.
        add(this.slot(function asdfasdf(data, targetProperty, targetDAO, mapExpression) {
          return ( foam.Undefined.isInstance(data) || foam.Null.isInstance(data) ) ? this.E('span').add('<unset>') :
            this.E('span').
            add(this.daoSlot(
              targetDAO.where(E.EQ(targetProperty, data)).limit(1),
              E.MAP(mapExpression, view.ArraySink.create())).map(function(a) {
                return a.delegate.array.length ? a.delegate.array[0] : ''; }));
        })).
        add(this.slot(function(mode) {
          if ( mode != foam.u2.DisplayMode.RW ) return;

          var v = view.DAOControllerView.create({
            daoControllerMode: foam.comics2.DAOControllerMode.SELECT,
            data: view.__context__[foam.String.daoize(view.of.name)]
          });

          this.whileLoaded(function() {
            return view.data$.relateTo(v.selection$, function(data) {
              var o = view.of.create(null, view);
              o.id = data;
              return o;
            }, function(selection) {
              return selection && view.targetProperty.f(selection);
            });
          });

          return v;
        }));
    }
  ]
});
