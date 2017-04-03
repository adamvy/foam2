 foam.CLASS({
  package: 'foam.u2.view',
  name: 'ScrollTableView',
  extends: 'foam.u2.Element',

  requires: [
    'foam.u2.view.TableView',
    'foam.graphics.ScrollCView',
    'foam.dao.FnSink',
    'foam.mlang.sink.Count',
    'foam.input.Scroll',
  ],

  properties: [
    {
      class: 'foam.dao.DAOProperty',
      name: 'data'
    },
    {
      class: 'Int',
      name: 'limit',
      value: 30,
      // TODO make this a funciton of the height.
    },
    {
      class: 'Int',
      name: 'skip',
    },
    {
      class: 'foam.dao.DAOProperty',
      name: 'scrolledDao',
      expression: function(data, limit, skip) {
        return data.limit(limit).skip(skip);
      },
    },
    {
      name: 'scrollView',
      factory: function() {
        var self = this;
        return this.ScrollCView.create({
          value$: this.skip$,
          extent$: this.limit$,
          height: 600, // TODO use window height.
          width: 40,
          handleSize: 40,
          // TODO wire up mouse wheel
          // TODO clicking away from scroller should deselect it.
        });
      },
    },
    {
      name: 'tableView',
      factory: function() {
        return this.TableView.create({data$: this.scrolledDao$});
      },
    },
    {
      name: 'scroll',
      factory: function() { return this.Scroll.create({element: this}) },
    },
  ],

  listeners: [
    {
      // TODO Avoid onDaoUpdate approaches.
      name: 'onDaoUpdate',
      isFramed: true,
      code: function() {
        var self = this;
        this.data$proxy.select(this.Count.create()).then(function(s) {
          self.scrollView.size = s.value;
        })
      },
    },
    {
      name: 'onScroll',
      code: function(_, _, touch) {
        // This magic 50 just slows down the scrolling.
        this.skip += (Math.round(touch.deltaY/50) || (touch.deltaY > 0 ? 1 : -1));
        touch.claimed = true;
      }
    }
  ],

  methods: [
    function init() {
      this.onDetach(this.scroll.scroll.sub(this.onScroll));
      this.onDetach(this.data$proxy.pipe(this.FnSink.create({fn:this.onDaoUpdate})));
    },
    function initE() {
      // TODO probably shouldn't be using a table.
      this.start('table').style({'width':'100%'}).
        start('tr').
          start('td').style({'width':'100%'}).add(this.tableView).end().
          start('td').add(this.scrollView).end().
        end().
      end();
    }
  ]
});
