/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: "foam.apploader",
  name: "ClassLoaderContext",
  requires: [
    "foam.apploader.ClassLoader",
    "foam.apploader.WebModelFileDAO"
  ],
  exports: [
    'classloader'
  ],
  properties: [
    {
      name: "classloader",
      factory: function() {
        return this.ClassLoader.create();
      }
    }
  ]
});
(function() {
  foam.__context__ = foam.apploader.ClassLoaderContext.create().__subContext__;
  foam.__context__.classloader.addClassPath(global.FOAM_ROOT);

  var CLASS = foam.CLASS;
  foam.CLASS = function(m) {
    foam.__context__.classloader.latch(m);
    CLASS(m);
  };
})();
