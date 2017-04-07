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
      name: 'height',
      value: 200,
    },
    {
      class: 'Int',
      name: 'headerHeight',
      value: 28,
    },
    {
      class: 'Int',
      name: 'rowHeight',
      value: 28,
    },
    {
      class: 'Int',
      name: 'limit',
      expression: function(height, rowHeight, headerHeight) {
        return (height - headerHeight) / rowHeight;
      },
    },
    {
      class: 'Int',
      name: 'skip',
    },
    {
      class: 'foam.dao.DAOProperty',
      name: 'scrolledDao',
      expression: function(data, limit, skip) {
        return data ? data.limit(limit).skip(skip) : foam.dao.NullDAO.create();
      },
    },
    {
      name: 'scrollView',
      factory: function() {
        var s = this.ScrollCView.create({
          value$: this.skip$,
          height$: this.height$,
          width: 40,
          handleSize: 40,
        });
        s.extent$.follow(this.limit$);
        return s;
      },
    },
    {
      name: 'tableView',
      factory: function() {
        var v = this.TableView.create({data$: this.scrolledDao$});
        v.attrs({border: 1});
        return v;
      },
    },
    {
      name: 'scroll',
      factory: function() { return this.Scroll.create({element: this.tableView}) },
    },
  ],

  listeners: [
    {
      name: 'onDaoUpdate',
      isFramed: true,
      code: function() {
        var self = this;
        this.data$proxy.select(this.Count.create()).then(function(s) {
          var isAtBottom = self.scrollView.size >= self.skip + self.limit;
          self.scrollView.size = s.value;
          self.skip = isAtBottom ?
            s.value - self.limit :
            Math.min(self.skip, s.value - self.limit);
        })
      },
    },
    {
      name: 'onScroll',
      code: function(_, _, touch) {
        this.skip += (Math.round(touch.deltaY) || (touch.deltaY > 0 ? 1 : -1));
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
  ],

  actions: [
    function scrollToBottom() {
      var self = this;
      this.data$proxy.select(this.Count.create()).then(function(s) {
        self.skip = s.value - self.limit;
      })
    },
  ],
});
