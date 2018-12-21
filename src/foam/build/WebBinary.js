// Output a JS blob that boots FOAM to the point that it has a modelDAO

// Milestone 1: - Boot all of files.js, classload nanos - DONE

// Milestone 2: - Add embedded model dao with some nanos classes

/*
  anatomy of a web binary

- Web Bootloader
-- plain JS bootstrap to foam.CLASS
-- Classloader/Artifact DAO

*/


foam.CLASS({
  package: 'foam.build',
  name: 'WebBinary',
  requires: [
    'foam.boot.Web',
    'foam.build.ScrapedArtifactDAO'
  ],
  properties: [
    {
      class: 'String',
      name: 'controller'
    }
  ],
  methods: [
    {
      name: 'build',
      code: function(X, dst) {
        var outstream = require('fs').createWriteStream(dst);

        function out(s) {
          outstream.write(s);
        }
        
        // Output bootloader
        this.Web.create().build(X, out).then(function() {
          outstream.end();
        });

        
      }
    }
  ]
});
