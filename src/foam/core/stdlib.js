/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

foam.__types__ = [];

foam.DEFTYPE = function(obj) {
  var id = obj.id;

  for ( var i = 0 ; i < foam.__types__.length ; i++ ) {
    var existing = foam.__types__[i];
    if ( existing.id == id ) return foam.__types__[i] = obj;
  }

  foam.__types__.push(obj);
  return obj;
};

// This must be declared as the first foam.LIB() using { name: ..., code: ... }
// method syntax because foam.LIB() may invoke foam.Function.getName() on
// methods declared using function methodName(...) { ... }.
foam.LIB({
  name: 'foam.Function',

  methods: [
    {
      name: 'getName',
      code: (function named() {}).name === 'named' ?
          function(method) { return method.name; } :
          function(method) {
            if (typeof method !== 'function') return method.name;

            // IE11 does not support named functions. Extract name with
            // f.toString().
            var match = method.toString().
                match(/^function\s+([A-Za-z_$][0-9A-Za-z_$]*)\s*\(/);
            foam.assert(match, 'Unable to deduce method name from function');
            return match[1];
          }
    }
  ]
});
foam.DEFTYPE(foam.Function);

/**
  Rather than extending built-in prototypes, we create flyweight versions.

  This has a number of advantages:
  1. It avoids conflicts with other libraries which might also extend built-in
     types with methods with the same names but different semantics.
  2. It is >10X faster (in V8) to call a flyweight method than a Method added
     to the prototypes of String or Number. This is because calling an added
     method on those types promotes the object from a primitive string or number
     to a String or Number object.  Creating the object takes time and creates a
     new object that will need to be GC'ed.
  3. It lets us effectively add methods to built-in special values like
     true, false, null, and undefined. This avoids the need for null-pointer
     checks.
  4. It avoids the proliferation of large ===/typeof/isInstance/instanceof blocks
     throughout the rest of the code.
  5. It provides a consistent method for checking an object's type, since each
     type flyweight has an .isInstance() method which abstracts the underlying detection
     mechanism.
  6. It makes the future implementation of multi-methods much easier.
*/

/**
 * Each of these flyweight types follows a standard interface.
 *
 * <pre>
 * interface Type {
 *   // Returns true if the given object is of this type.
 *   // example: foam.String.isInstance('hello') -> true
 *   isInstance(o) -> Boolean
 *
 *   // Returns a deep clone of o, if the type supports it.
 *   clone(o);
 *
 *   // Returns true if a and b are equivalent.
 *   equals(a, b) -> Boolean
 *
 *   // Returns -1, 0 or 1 as a comparsion of the two types.
 *   // -1 means that 'a' is considered smaller that 'b'
 *   // 0 means that and 'a' and 'b' are considered equivalent
 *   // 1 means that 'a' is considered larger than 'b'
 *   compare(a, b) -> Int
 *
 *   // Returns a hash of 'a' useful for hash tables
 *   hashCode(a) -> Int
 *
 *   // Returns true if the two values are the same instance
 *   // or the same value for primitive types.
 *   is(a, b) -> Boolean
 * }
 */

foam.LIB({
  name: 'foam.Undefined',
  methods: [
    function isInstance(o) { return o === undefined; },
    function is(a, b) { return b === undefined; },
    function isSubType(t) { return t === foam.Undefined; },
    function clone(o) { return o; },
    function equals(_, b) { return b === undefined; },
    function compare(_, b) { return b === undefined ? 0 : 1; },
    function hashCode() { return -2; }
  ]
});
foam.DEFTYPE(foam.Undefined);

foam.LIB({
  name: 'foam.Null',
  methods: [
    function isInstance(o) { return o === null; },
    function is(a, b) { return b === null; },
    function isSubType(t) { return t === foam.Null; },
    function clone(o) { return o; },
    function equals(_, b) { return b === null; },
    function compare(_, b) { return b === null ? 0 : 1; },
    function hashCode() { return -3; }
  ]
});
foam.DEFTYPE(foam.Null);

foam.LIB({
  name: 'foam.Boolean',
  methods: [
    function isInstance(o) { return typeof o === 'boolean'; },
    function is(a, b) { return a === b; },
    function isSubType(t) { return false },
    function clone(o) { return o; },
    function equals(a, b) { return a === b; },
    function compare(a, b) {
      if ( ! foam.Boolean.isInstance(b) ) return 1;
      return a ? (b ? 0 : 1) : (b ? -1 : 0);
    },
    function hashCode(o) { return o ? 1 : -1; }
  ]
});
foam.DEFTYPE(foam.Boolean);

foam.LIB({
  name: 'foam.Function',
  methods: [
    function isInstance(o) { return typeof o === 'function'; },
    function is(a, b) { return a === b },
    function isSubType(t) { return t === foam.Function; },
    function clone(o) { return o; },
    function equals(a, b) { return b ? a.toString() === b.toString() : false; },
    function compare(a, b) {
      if ( ! foam.Function.isInstance(b) ) return 1;
      return b ? foam.String.compare(a.toString(), b.toString()) :  1;
    },
    function hashCode(o) { return foam.String.hashCode(o.toString()); },

    /* istanbul ignore next */
    function bind(f, that, a1, a2, a3, a4) {
      foam.assert(arguments.length <= 6,
                  "foam.Function.bind doesn't support more than 4 values at the moment.");

      /**
       * Faster than Function.prototype.bind
       */
      switch ( arguments.length ) {
        case 1:
          return f;
        case 2: return function() { return f.apply(that, arguments); };
        case 3: return function(b1, b2, b3, b4) {
          switch ( arguments.length ) {
            case 0: return f.call(that, a1);
            case 1: return f.call(that, a1, b1);
            case 2: return f.call(that, a1, b1, b2);
            case 3: return f.call(that, a1, b1, b2, b3);
            case 4: return f.call(that, a1, b1, b2, b3, b4);
          }
        };
        case 4: return function(b1, b2, b3, b4) {
          switch ( arguments.length ) {
            case 0: return f.call(that, a1, a2);
            case 1: return f.call(that, a1, a2, b1);
            case 2: return f.call(that, a1, a2, b1, b2);
            case 3: return f.call(that, a1, a2, b1, b2, b3);
            case 4: return f.call(that, a1, a2, b1, b2, b3, b4);
          }
        };
        case 5: return function(b1, b2, b3, b4) {
          switch ( arguments.length ) {
            case 0: return f.call(that, a1, a2, a3);
            case 1: return f.call(that, a1, a2, a3, b1);
            case 2: return f.call(that, a1, a2, a3, b1, b2);
            case 3: return f.call(that, a1, a2, a3, b1, b2, b3);
            case 4: return f.call(that, a1, a2, a3, b1, b2, b3, b4);
          }
        };
        case 6: return function(b1, b2, b3, b4) {
          switch ( arguments.length ) {
            case 0: return f.call(that, a1, a2, a3, a4);
            case 1: return f.call(that, a1, a2, a3, a4, b1);
            case 2: return f.call(that, a1, a2, a3, a4, b1, b2);
            case 3: return f.call(that, a1, a2, a3, a4, b1, b2, b3);
            case 4: return f.call(that, a1, a2, a3, a4, b1, b2, b3, b4);
          }
        };
      }
    },

    /**
     * Decorates the function 'f' to cache the return value of 'f' when
     * called in the future. Also known as a 'thunk'.
     */
    function memoize0(/* Function */ f) {
      var set = false, cache, inProgress;
      var ret = foam.Function.setName(
          function() {
            if ( ! set ) {
              foam.assert( ! inProgress,
                           "memoize0 re-entrant call to", foam.Function.getName(f));
              set = true;

              inProgress = true;
              cache = f();
              inProgress = false;
            }
            return cache;
          },
          'memoize0(' + f.name + ')');
      ret.toString = function() { return 'foam.Function.memoize0(' + f.toString() + ')'; };
      return ret;
    },

    /**
     * Decorates the function 'f' to cache the return value of 'f' when called
     * with a particular value for its first argument.
     */
    function memoize1(/* Function */ f) {
      var cache = {}, nullCache, undefinedCache;
      var ret = foam.Function.setName(
          function(key) {
            foam.assert(
                arguments.length === 1,
                'Memoize1\'ed functions must take exactly one argument.');

            var mKey =
                key === null      ? '___null___'      :
                key === undefined ? '___undefined___' :
                key ;

            if ( ! cache.hasOwnProperty(mKey) ) cache[mKey] = f.call(this, key);

            return cache[mKey];
          },
          'memoize1(' + f.name + ')');
        ret.toString = function() { return 'foam.Function.memoize1(' + f.toString() + ')'; };
        return ret;
    },

    /**
     * Set a function's name for improved debugging and profiling
     *
     * Returns the given function.
     */
    function setName(f, name) {
      Object.defineProperty(f, 'name', { value: name, configurable: true });
      return f;
    },

    function withArgs(fn, source, opt_self) {
      var argNames = foam.Function.argNames(fn);
      var args = [];
      for ( var i = 0 ; i < argNames.length ; i++ ) {
        var a = source[argNames[i]];
        if ( typeof a === 'function' ) a = a.bind(source);
        args.push(a);
      }
      return fn.apply(opt_self || source, args);
    },

    /**
     * Return a function's arguments as an array.
     * Ex. argNames(function(a,b) {...}) === ['a', 'b']
     **/
    function argNames(f) {
      var str = f.toString();
      str = str.substring(str.indexOf('(') + 1, str.indexOf(')'));

      var ws = "\\s*";
      var ident = "([^,\\s\\)]+)";
      var comma = ",?";
      var comment = "/\\*(?:[^*]|[*][^/])*\\*/"
      var skip = "(?:" + ws + "|" + comment + ")*";
      var pattern = new RegExp(skip + ident + skip + comma, "mg");

      var ret = [];
      var match;
      while ( match = pattern.exec(str) ) {
        ret.push(match[1]);
      }

      return ret;
    }
  ]
});

(function() {
  // Disable setName if not supported on this platform.
  try {
    foam.Function.setName(function() {}, '');
  } catch (x) {
    console.warn('foam.Function.setName is not supported on your platform. ' +
                 'Stack traces will be harder to decipher, but no ' +
                 'functionality will be lost');
    foam.LIB({
      name: 'foam.Function',
      methods: [
        function setName(f) { return f; }
      ]
    });
  }
})();


foam.LIB({
  name: 'foam.Number',
  methods: [
    function isInstance(o) { return typeof o === 'number'; },
    function is(a, b) { return foam.Number.compare(a, b) == 0; },
    function clone(o) { return o; },
    function isSubType(t) { return t === foam.Number; },
    function equals(a, b) { return foam.Number.compare(a, b) == 0; },
    function compare(a, b) {
      if ( ! foam.Number.isInstance(b) || ( isNaN(a) && ! isNaN(b)) ) return 1;
      if ( ! isNaN(a) && isNaN(b) ) return -1;
      return a < b ? -1 : a > b ? 1 : 0;
    },
    (function() {
      var bufForHash = new ArrayBuffer(8);
      var floatArrayForHash = new Float64Array(bufForHash);
      var intArrayForHash = new Int32Array(bufForHash);

      return function hashCode(n) {
        if (Number.isInteger(n)) return n & n; // Truncate to 32 bits.

        floatArrayForHash[0] = n;
        var hash = ((intArrayForHash[0] << 5) - intArrayForHash[0]) +
            intArrayForHash[1];
        return hash & hash; // Truncate to 32 bits.
      };
    })()
  ]
});
foam.DEFTYPE(foam.Number);

foam.LIB({
  name: 'foam.String',
  methods: [
    function isInstance(o) { return typeof o === 'string'; },
    function is(a, b) { return a === b; },
    function clone(o) { return o; },
    function isSubType(t) { return t === foam.String; },
    function equals(a, b) { return a === b; },
    function compare(a, b) {
      if ( ! foam.String.isInstance(b) ) return 1;
      return b != null ? a.localeCompare(b) : 1 ;
    },
    function hashCode(s) {
      var hash = -4;

      for ( var i = 0 ; i < s.length ; i++ ) {
        var code = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + code;
        hash &= hash; // Truncate to 32 bits.
      }

      return hash;
    },
    {
      name: 'constantize',
      code: foam.Function.memoize1(function(/* String */ str) {
        // switches from from camelCase to CAMEL_CASE
        return str.replace(/([a-z])([^0-9a-z_])/g, '$1_$2').toUpperCase();
      })
    },
    {
      name: 'labelize',
      code: foam.Function.memoize1(function(/* String= */ str) {
        if ( str === '' || str === null || foam.Undefined.isInstance(str) ) return '';

        return this.capitalize(str.replace(/[a-z][A-Z]/g, function(a) {
          return a.charAt(0) + ' ' + a.charAt(1);
        }));
      })
    },
    {
      name: 'capitalize',
      code: foam.Function.memoize1(function(str) {
        foam.assert(typeof str === 'string',
            'Cannot capitalize non-string values.');
        // switchFromProperyName to //SwitchFromPropertyName
        return str[0].toUpperCase() + str.substring(1);
      })
    },
    {
      /**
       * Takes a key and creates a slot name for it.  Generally key -> key + '$'.
       *
       * For example, if an object has a property called myProperty, the slot
       * name for that will be myProperty$.
       */
      name: 'toSlotName',
      code: foam.Function.memoize1(function toSlotName(key) {
        foam.assert(
            typeof key === 'string',
            'Cannot toSlotName non-string values.  Attempted: ', key);

        return key + '$';
      })
    },
    {
      name: 'toUpperCase',
      code: foam.Function.memoize1(function(str) {
        foam.assert(
            typeof str === 'string',
            'Cannot toUpperCase non-string values.');

        return str.toUpperCase();
      })
    },
    {
      name: 'cssClassize',
      code: foam.Function.memoize1(function(str) {
        foam.assert(typeof str === 'string',
            'Cannot cssClassize non-string values.');
        // Turns foam.u2.Foo into foam-u2-Foo
        return str.replace(/\./g, '-');
      })
    },
    function pad(obj, size) {
      // Right pads to size if size > 0, Left pads to -size if size < 0
      return size < 0 ?
        (new Array(-size).join(' ') + obj).slice(size)       :
        (obj + new Array(size).join(' ')).substring(0, size) ;
    },
    function multiline(f) {
      // Function for returning multi-line strings from commented functions.
      // Ex. var str = multiline(function() { /* multi-line string here */ });
      if ( typeof f === 'string' ) return f;
      var s     = f.toString();
      var start = s.indexOf('/*');
      var end   = s.lastIndexOf('*/');
      return ( start >= 0 && end >= 0 ) ? s.substring(start + 2, end) : '';
    },
    function startsWithIC(a, b) {
      foam.assert(typeof a === 'string' && typeof b === 'string',
          'Cannot startsWithIC non-string values.');

      return a.toUpperCase().startsWith(b.toUpperCase());
    },
    function intern(val) {
      var map = intern._map_ = intern._map_ || {};
      return map[val] || (map[val] = val);
    },
  ]
});
foam.DEFTYPE(foam.String);

foam.LIB({
  name: 'foam.Array',
  methods: [
    function isInstance(o) { return Array.isArray(o); },
    function is(a, b) { return a === b; },
    function isSubType(t) { return t === foam.Array; },
    function clone(o) {
      /** Returns a deep copy of this array and its contents. */
      var ret = new Array(o.length);
      for ( var i = 0 ; i < o.length ; i++ ) {
        ret[i] = foam.util.clone(o[i]);
      }
      return ret;
    },
    function diff(a, b) {
      /** Finds elements added (found in other, not in this) and removed
          (found in this, not in other). Repeated values are treated
          as separate elements, but ordering changes are ignored. */
      var added = b.slice(0);
      var removed = [];
      for ( var i = 0 ; i < a.length ; i++ ) {
        for ( var j = 0 ; j < added.length ; j++ ) {
          if ( foam.util.equals(a[i], added[j]) ) {
            added.splice(j, 1);
            j--;
            break;
          }
        }
        if ( j === added.length ) removed.push(a[i]);
      }
      return { added: added, removed: removed };
    },
    function equals(a, b) {
      if ( ! b || ! Array.isArray(b) || a.length !== b.length ) return false;
      for ( var i = 0 ; i < a.length ; i++ ) {
        if ( ! foam.util.equals(a[i], b[i]) ) return false;
      }
      return true;
    },
    function compare(a, b) {
      if ( ! b || ! Array.isArray(b) ) return 1;
      var l = Math.min(a.length, b.length);
      for ( var i = 0 ; i < l ; i++ ) {
        var c = foam.util.compare(a[i], b[i]);
        if ( c ) return c;
      }
      return a.length === b.length ? 0 : a.length < b.length ? -1 : 1;
    },
    function hashCode(a) {
      var hash = -5;

      for ( var i = 0 ; i < a.length ; i++ ) {
        hash = ((hash << 5) - hash) + foam.util.hashCode(a[i]);
      }

      return hash;
    },
    function remove(a, o) {
      for ( var i = 0 ; i < a.length ; i++ ) {
        if ( o === a[i] ) {
          a.splice(i, 1);
        }
      }
    },
    function find(a, p) {
      for ( var i = 0 ; i < a.length ; i++ ) {
        if ( p(a[i]) ) return a[i];
      }
    }
  ]
});
foam.DEFTYPE(foam.Array);

foam.LIB({
  name: 'foam.Date',
  methods: [
    function isInstance(o) { return o instanceof Date; },
    function is(a, b) { return a === b; },
    function isSubType(t) { return t === foam.Date; },
    function clone(o) { return new Date(o); },
    function getTime(d) { return ! d ? 0 : d.getTime ? d.getTime() : d ; },
    function equals(a, b) { return this.getTime(a) === this.getTime(b); },
    function compare(a, b) {
      if ( ! foam.Date.isInstance(b) ) return 1;
      return foam.Number.compare(this.getTime(a), this.getTime(b));
    },
    // Hash n & n: Truncate to 32 bits.
    function hashCode(d) { var n = d.getTime(); return n & n; },
  ]
});
foam.DEFTYPE(foam.Date);

// An Object is a Javascript Object which is neither an FObject nor an Array.
foam.LIB({
  name: 'foam.Object',
  methods: [
    function forEach(obj, f) {
      for ( var key in obj ) {
        if ( obj.hasOwnProperty(key) ) f(obj[key], key);
      }
    },
    function is(a, b) { return a === b; },
    function isSubType(t) { return t === foam.Object; },
    function isInstance(o) {
      return typeof o === 'object' &&
        ! Array.isArray(o) &&
        ! foam.core.FObject.isInstance(o);
    },
    function clone(o) { return o; },
    function equals(a, b) { return a === b; },
    function compare(a, b) {
      return foam.Number.compare(a.$UID, b.$UID);
    },
    function hashCode(o) {
      var hash = 19;
      for ( var key in o ) {
        if ( ! o.hasOwnProperty(key) ) continue;
        hash = ((hash << 5) - hash) + foam.util.hashCode(o[key]);
      }
      return hash;
    },
    function freeze(o) {
      // Force $UID creation before freezing because it can't
      // be added to the object after it's frozen.
      o.$UID__ = foam.next$UID();
      Object.freeze(o);
    }
  ]
});
foam.DEFTYPE(foam.Object);

foam.typeOf = function(o) {
  // Classes are types
  if ( o && o.cls_ ) return o.cls_;

  for ( var i = 0 ; i < foam.__types__.length ; i++ ) {
    if ( foam.__types__[i].isInstance(o) ) return foam.__types__[i];
  }

  throw new Error('No known type for object ' + o + '.  This is a bug, contact the developers.');
};

foam.LIB({
  name: 'foam',

  methods: [
    function mmethod(map, opt_defaultMethod) {
      var uid = '__mmethod__' + foam.next$UID() + '__';

      var first = true;
      return function(arg1) {
        if ( first ) {
          for ( var key in map ) {
            var type = key === 'FObject' ?
                foam.core.FObject :
                foam[key] || foam.lookup(key);

            type[uid] = map[key];
          }
          first = false;
        }

        var type = arg1 && arg1.cls_ && arg1.cls_[uid] ?
            arg1.cls_ :
            foam.typeOf(arg1) ;

        if ( ! opt_defaultMethod ) {
          foam.assert(type, 'Unknown type: ', arg1,
              'and no default method provided');
          foam.assert(
              type[uid],
              'Missing multi-method for type ', arg1, ' map: ', map,
              'and no deafult method provided');
        }
        return ( type[uid] || opt_defaultMethod ).apply(this, arguments);
      };
    }
  ]
});


(function() {
  var typeOf = foam.typeOf;

  foam.LIB({
    name: 'foam.util',

    methods: [
      function clone(o)      { return typeOf(o).clone(o); },
      function equals(a, b)  {
        var aType = typeOf(a);
        var bType = typeOf(b);
        return bType.isSubType(aType) && aType.equals(a, b);
      },
      function is(a, b) {
        var aType = typeOf(a);
        var bType = typeOf(b);
        return bType.isSubType(aType) && aType.is(a, b);
      },
      function compare(a, b) {
        var aType = typeOf(a);
        var bType = typeOf(b);
        return bType.isSubType(aType) ?
          aType.compare(a, b) :
          aType.id.localeCompare(bType.id, "en");
      },
      function hashCode(o)   { return typeOf(o).hashCode(o); },
      function diff(a, b)    {
        var aType = typeOf(a);
        var bType = typeOf(b);
        return ! bType.isSubType(a) ?
          undefined : t.diff ?
          t.diff(a, b) :
          undefined;
      },
      function flagFilter(flags) {
        return function(a) {
          if ( ! flags ) return true;
          if ( ! a.flags ) return true;
          for ( var i = 0, f; f = flags[i]; i++ ) {
            if ( a.flags.indexOf(f) != -1 ) return true;
          }
          return false;
        }
      },
    ]
  });
})();


foam.LIB({
  name: 'foam.package',
  methods: [
    /**
     * Registers the given class in the global namespace.
     * If the given class has an id of 'some.package.MyClass'
     * then the class object will be made available globally at
     * global.some.package.MyClass.
     */
    function registerClass(cls) {
      foam.assert(typeof cls === 'object',
          'cls must be an object');
      foam.assert(typeof cls.name === 'string' && cls.name !== '',
          'cls must have a non-empty string name');

      var pkg = foam.package.ensurePackage(global, cls.package);
      pkg[cls.name] = cls;

      foam.package.triggerClass_(cls);
    },

    function waitForClass(cb, cls) {
      if ( foam.lookup(cls, true) ) cb(foam.lookup(cls));

      foam.package.__pending = foam.package.__pending || {};
      foam.package.__pending[cls] = foam.package.__pending[cls] || [];
      foam.package.__pending[cls].push(cb);
    },

    function triggerClass_(cls) {
      if ( ! foam.package.__pending || ! foam.package.__pending[cls.id] ) return;

      var pending = foam.package.__pending[cls.id];

      foam.package.__pending[cls.id] = undefined;

      for ( var i = 0 ; i < pending.length ; i++ ) {
        pending[i](cls);
      }
    },

    /**
     * Register a class lazily in the global namespace.
     * The class is not created until accessed the first time.
     * The provided factory function creates the class.
     */
    function registerClassFactory(m, thunk) {
      var pkg = foam.package.ensurePackage(global, m.package);
      var tmp;

      Object.defineProperty(
        pkg,
        m.name, {
          configurable: true,
          get: function() {
            if ( tmp ) return tmp;

            tmp = thunk();

            foam.package.triggerClass_(tmp);

            return tmp;
          }
        }
      );
    },

    /**
     * Walk a dot separated path starting at root, creating empty
     * objects if necessary.
     *
     * ensurePackage(global, 'some.dot.separated.path');
     * will ensure that global.some.dot.separated.path exists with
     * each part being a JS object.
     *
     * Returns root if path is null or undefined.
     */
    function ensurePackage(root, path) {
      if ( path === null ||
           path === undefined ||
           path === '' ) {
        return root;
      }

      foam.assert(typeof path === 'string',
          'Cannot make a package path of a non-string');

      path = path.split('.');
      var node = root;

      for ( var i = 0 ; i < path.length ; i++ ) {
        node = node[path[i]] || ( node[path[i]] = {} );
      }

      return node;
    }
  ]
});


foam.LIB({
  name: 'foam.uuid',
  methods: [
    function randomGUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : ( r & 0x3 | 0x8 );
        return v.toString(16);
      });
    }
  ]
});


foam.LIB({
  name: 'foam.compare',
  methods: [
    function toCompare(c) {
      return foam.Array.isInstance(c)    ? foam.compare.compound(c) :
             foam.Function.isInstance(c) ? { compare: c} :
             c ;
    },

    function compound(args) {
      /* Create a compound comparator from an array of comparators. */
      var cs = args.map(foam.compare.toCompare);
      if ( cs.lengh === 1 ) return cs[0];

      var f = {
        compare: function(o1, o2) {
          for ( var i = 0 ; i < cs.length ; i++ ) {
            var r = cs[i].compare(o1, o2);
            if ( r != 0 ) return r;
          }
          return 0;
        }
      };

      return f;
    }
  ]
});
