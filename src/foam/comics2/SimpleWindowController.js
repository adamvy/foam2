foam.CLASS({
  package: 'foam.comics2',
  name: 'SimpleWindowController',
  extends: 'foam.u2.Controller',
  requires: [
    'foam.comics2.Window'
  ],
  properties: [
    {
      class: 'Array',
      name: 'windows',
      preSet: function(_, w) {
        return w.length ? w :
          [this.baseWindow];
      },
      factory: function() {
        return [this.baseWindow];
      }
    },
    {
      name: 'baseWindow'
    },
    {
      class: 'Int',
      name: 'active',
      value: 0
    }
  ],
  css: `
^-tab {
  margin: 0px, 8px;
}

^-tab-selected {
  font-weight: bold;
}
`,

  methods: [
    function push(e) {
      this.windows = this.windows.concat(e);
      this.active = this.windows.length - 1;
    },
    function close(e) {
      this.windows = this.windows.filter(function(o) { return o != e; });
      if ( this.active > this.windows.length - 1 ) this.active = this.windows.length - 1;
    },
    function initE() {
      var view = this;

      this.
        add(this.slot(function(windows) {
          return this.E('span').
            forEach(windows, function(w, i) {
              this.start('label').
                start('input').
                attrs({
                  type: 'radio',
                  name: view.id,
                  value: i,
                  checked: view.slot(function(active) { return active == i; })
                }).
                on('change', function(e) { e.stopPropagation(); view.active = i; }).
                end('input').
                addClass(this.myClass('tab')).
                enableClass(this.myClass('selected'), view.slot(function(active, windows) { return windows[active] == w; })).
                add(w.title$).
                //                on('click', function(e) { e.stopPropagation(); view.active = i; }).
                end('label').
                start('button').
                add('X').
                on('click', function(e) { e.stopPropagation(); view.close(w); }).
                end();
            });
        })).
        start('div').
        add(this.slot(function(active, windows) {
          return windows[active];
        })).
        end();


      // If windows was a DAO then this view would look something like
      // this.  Complications with this approach is using a DAO
      // implies that the Window's are serializable, but that's not
      // necessarily true, we don't the inner views to lose their
      // context, as they may have interesting imports.  Perhaps we
      // could store the context they came from.  Or we could remote
      // the context, if the window is pushed to a new machine, that
      // could be interesting.


      // this.
      //   select(this.windowDAO$Proxy, function(w) {
      //     return this.E('span').
      //       startContext({ data: w }).
      //       on('click', function(e) {
      //         if ( w.active ) return;

      //         view.windowDAO$Proxy.where(E.EQ(view.Window.ACTIVE, true)).select().then(function(a) {
      //           return a.array;
      //         }).then(function(array) {
      //           if ( array.length ) {
      //             var obj = array.unshift();
      //             obj.clone(obj);
      //             obj.active = false;
      //             return view.windowDAO$Proxy.put(obj);
      //           }
      //           return;
      //         }).then(function() {
      //           var obj = w.clone();
      //           w.active = true;
      //           return view.windowDAO$Proxy.put(obj);
      //         });
      //       }).
      //       add(w.title).
      //       add(w.CLOSE).
      //       endContext();
      //   }).
      //   end().
      //   start('div', null, this.containerE$).
      //   select(this.windowDAO$Proxy.
      //          where(E.EQ(this.Window.ACTIVE, true)).
      //          limit(1), function(w) {
      //            return w.render();
      //          })
      //   end();
    }
  ]
});
