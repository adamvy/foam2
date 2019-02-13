/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
  var isWorker = typeof importScripts !== 'undefined';
  var isServer = ( ! isWorker ) && typeof window === 'undefined';

  var scope = isServer ? global : window;

  var foam = scope.foam = scope.foam || {};

  scope.foam.FLAGS = scope.FOAM_FLAGS ||
    {
      web: ! isServer,
      node: isServer,
      debug: true,
      java: true,
      swift: true,
      js: true
    };

  function loadBrowser(path) {
    document.writeln(
      '<script type="text/javascript" src="' + path + '"></script>\n');
  }

  function loadServer(path) {
    this.require = require;
    require('vm').
      runInThisContext(
        require('fs').
          readFileSync(path, { encoding: 'utf8' }),
        { filename: path,
          displayErrors: true });
  }

  function loadWorker(path) {
    importScripts(path);
  }

  function getLoader() {
    return isServer ? loadServer :
      isWorker ? loadWorker :
      loadBrowser;
  }

  foam.LOAD_FILES = function(path) {
    var root = path.substring(0, path.lastIndexOf('/') + 1);
    var loader = getLoader();

    foam.FILES = function(files) {
      files.forEach(function(f) {
        loader(root + f + '.js');
      });
    };
    loader(path);
  };


  var root;
  if ( ! isServer && ! isWorker ) {
    var foamscript = Array.from(document.getElementsByTagName('script')).find(function(s) {
      return s.src.match(/\/foam.js$/);
    }).src;
    root = foamscript.substring(0, foamscript.lastIndexOf('/') + 1);
  } else if ( isServer ) {
    root = __dirname + '/';
  } else if ( scope.FOAM_ROOT ) {
    root = scope.FOAM_ROOT;
    if ( root[root.length - 1] != '/' ) root += '/';
  } else {
    throw new Error("Unable to determine foam root directory, try setting FOAM_ROOT globally.");
  }

  foam.LOAD_FILES(root + 'FILES.js');
})();
