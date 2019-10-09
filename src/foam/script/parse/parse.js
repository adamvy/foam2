// if all parser extend this then it enables some level of "executable
// grammars" as described by Gilad Bracha in some of his newspeak
// talks.
foam.CLASS({
  package: 'foam.script.parse',
  name: 'AbstractParser',
  abstract: true,
  methods: [
    function and(b) {
      return foam.script.parse.Sequence.create({
        arg1: this,
        arg2: b
      });
    },
    function or(b) {
      return foam.script.parse.Alternate.create({
        arg1: this,
        arg2: b
      });
    },
    function star() {
      return foam.script.parse.Repeat.create({
        arg: this
      });
    },
    function plus() {
      return foam.script.parse.Repeat.create({
        arg: this,
        minimum: 1
      });
    },
    function maybe() {
      return foam.script.parse.Optional.create({
        arg: this
      });
    },
    function not() {
      return foam.script.parse.Not.create({
        arg: this
      });
    },
    function except(p) {
      return foam.script.parse.Except.create({
        arg1: this,
        arg2: p
      });
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'Literal',
  implements: [ 'foam.script.Compilable' ],
  mixins: [ 'foam.script.parse.Terminal' ],
  extends: 'foam.script.parse.AbstractParser',
  documentation: 'Matches a literal with the parse stream (case sensitive)',

  properties: [
    {
      class: 'String',
      name: 'string'
    },
    {
      class: 'Object',
      name: 'value'
    }
  ],

  methods: [
    function compile() {
      var string = this.string;
      var value = this.value;

      return function(x, ps) {
        for ( var i = 0 ; i < string.length ; i++, ps = ps.tail ) {
          if ( string.charAt(i) !== ps.head ) {
            return undefined;
          }
        }

        return ps.setValue(value !== undefined ? value : string);
      };
    }
  ]
});


foam.CLASS({
  package: 'foam.script.parse',
  name: 'LiteralIC',
  implements: [ 'foam.script.Compilable' ],
  mixins: [ 'foam.script.parse.Terminal' ],
  extends: 'foam.script.parse.AbstractParser',
  documentation: 'Matches a literal with the parse stream (case insensitive)',

  properties: [
    {
      class: 'String',
      name: 'string'
    },
    {
      class: 'Object',
      name: 'value'
    }
  ],

  methods: [
    function compile() {
      var string = this.string;
      var lower = this.string.toLowerCase();
      var value = this.value;

      return function(x, ps) {
        for ( var i = 0 ; i < string.length ; i++, ps = ps.tail ) {
          if ( ! ps.head || lower.charAt(i) !== ps.head.toLowerCase() )
            return undefined;
        }
        return ps.setValue(value !== undefined ? value : string);
      };
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'Binary',
  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.script.Compilable',
      name: 'arg1'
    },
    {
      class: 'FObjectProperty',
      of: 'foam.script.Compilable',
      name: 'arg2'
    }
  ],
  methods: [
    function visit(f) {
      this.arg1.visit(f);
      this.arg2.visit(f);
      f(this);
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'Unary',
  implements: [ 'foam.script.Node' ],
  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.script.Compilable',
      name: 'arg'
    }
  ],
  methods: [
    function visit(f) {
      this.arg.visit(f);
      f(this);
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'Terminal',
  implements: [ 'foam.script.Node' ],
  methods: [
    {
      name: 'visit',
      code: function(f) {
        f(this);
      }
    }
  ]
});


foam.CLASS({
  package: 'foam.script.parse',
  name: 'EOF',
  implements: [
    'foam.script.Compilable'
  ],
  mixins: [ 'foam.script.parse.Terminal' ],
  extends: 'foam.script.parse.AbstractParser',

  documentation: 'Matches the literal EOF of the input stream, useful if you want to force your grammar to only succeed if it consumes the entire input.',

  methods: [
    function compile() {
      return function(x, ps) {
        return ps.valid ? undefined : ps;
      };
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'Alternate',
  implements: [ 'foam.script.Compilable' ],
  extends: 'foam.script.parse.AbstractParser',
  mixins: [ 'foam.script.parse.Binary' ],
  methods: [
    function compile() {
      var f1 = this.arg1.compile();
      var f2 = this.arg2.compile();

      return function(x, ps) {
        return f1.call(this, x, ps) || f2.call(this, x, ps);
      };
    }
  ]
});


foam.CLASS({
  package: 'foam.script.parse',
  name: 'Sequence',
  implements: [ 'foam.script.Compilable' ],
  extends: 'foam.script.parse.AbstractParser',
  mixins: [ 'foam.script.parse.Binary' ],
  documentation: 'Parses the parser properties sequentially.',
  methods: [
    function compile() {
      var f1 = this.arg1.compile();
      var f2 = this.arg2.compile();
      return function(x, ps) {
        var ps1 = f1.call(this, x, ps);
        if ( ! ps1 ) return undefined;

        var ps2 = f2.call(this, x, ps1);
        if ( ! ps2 ) return undefined;

        return ps2.setValue([ps1.value, ps2.value]);
      };
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'Substring',
  implements: [ 'foam.script.Compilable' ],
  extends: 'foam.script.parse.AbstractParser',
  mixins: [ 'foam.script.parse.Unary' ],
  methods: [
    function compile() {
      var f = this.arg.compile();

      return function(x, ps) {
        var start = ps;
        var end = f.call(this, x, ps);
        return end ? end.setValue(start.substring(end)) : undefined;
      };
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'Optional',
  implements: [ 'foam.script.Compilable' ],
  extends: 'foam.script.parse.AbstractParser',
  mixins: [ 'foam.script.parse.Unary' ],
  methods: [
    function compile() {
      var f = this.arg.compile();
      return function(x, ps) {
        return f.call(this, x, ps) || ps.setValue(null);
      };
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'AnyChar',
  mixins: [ 'foam.script.parse.Terminal' ],
  implements: [ 'foam.script.Compilable' ],
  extends: 'foam.script.parse.AbstractParser',

  documentation: `Matches any char within the parse stream.
    Often used under the else clause of the 'not' parser
    property. Ex. \`not(',', anyChar())\``,

  axioms: [ foam.pattern.Singleton.create() ],

  methods: [
    function compile() {
      // TODO: Singleton the compiled form.
      return function(x, ps) {
        return ps.valid ? ps.tail : undefined;
      };
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'NotChars',
  mixins: [ 'foam.script.parse.Terminal' ],
  implements: [ 'foam.script.Compilable' ],
  extends: 'foam.script.parse.AbstractParser',
  documentation: `Matches against all but the chars specified
    in the argument string.`,

  properties: [
    {
      class: 'String',
      name: 'string'
    }
  ],

  methods: [
    function compile() {
      var string = this.string;

      return function(x, ps) {
        return ps.head && this.string.indexOf(ps.head) === -1 ?
          ps.tail : undefined;
      };
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  mixins: [ 'foam.script.parse.Terminal' ],
  name: 'Chars',
  implements: [ 'foam.script.Compilable' ],
  extends: 'foam.script.parse.AbstractParser',
  documentation: `Matches against any of the chars specified
    in the argument string.`,

  properties: [
    {
      class: 'String',
      name: 'string'
    }
  ],

  methods: [
    function compile() {
      var string = this.string;

      return function(x, ps) {
        return ps.valid && string.indexOf(ps.head) !== -1 ?
          ps.tail : undefined;
      };
    }
  ]
});


foam.CLASS({
  package: 'foam.script.parse',
  name: 'Range',
  mixins: [ 'foam.script.parse.Terminal' ],
  implements: ['foam.script.Compilable' ],
  extends: 'foam.script.parse.AbstractParser',
  properties: [
    {
      // TOOD: Should add a Char type
      class: 'String',
      name: 'from'
    },
    {
      class: 'String',
      name: 'to'
    }
  ],

  methods: [
    function compile() {
      var from = this.from;
      var to = this.to;

      return function (x, ps) {
        if ( ! ps.head ) return undefined;
        return ( from <= ps.head && ps.head <= to ) ?
          ps.tail.setValue(ps.head) :
          undefined;
      };
    }
  ]
});


foam.CLASS({
  package: 'foam.script.parse',
  name: 'Repeat',
  implements: ['foam.script.Compilable'],
  extends: 'foam.script.parse.AbstractParser',
  mixins: [ 'foam.script.parse.Unary' ],
  documentation: `Repeats matching to the parser property specified
    with an optional delimiter, and min number of matches.`,

  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.script.Compilable',
      name: 'delimiter',
    },
    {
      class: 'Int',
      name: 'minimum'
    }
  ],

  methods: [
    function compile() {
      var f = this.arg.compile();
      var delim = this.delimiter && this.delimiter.compile();
      var minimum = this.minimum;

      return function(x, ps) {
        var ret = [];

        while ( ps.valid ) {
          var res;

          if ( delim && ret.length != 0 ) {
            if ( ! ( res = delim.call(this, x, ps) ) ) break;
            ps = res;
          }

          if ( ! ( res = f.call(this, x, ps) ) ) break;
          ret.push(res.value);
          ps = res;
        }

        if ( minimum > 0 && ret.length < minimum ) return undefined;

        return ps.setValue(ret);
      };
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'Not',
  implements: [ 'foam.script.Compilable' ],
  extends: 'foam.script.parse.AbstractParser',
  mixins: [ 'foam.script.parse.Unary' ],
  methods: [
    function compile() {
      var f = this.arg.compile();
      return function(x, ps) {
        return f.call(this, x, ps) ? undefined : ps;
      }
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'Except',
  implements: [ 'foam.script.Compilable' ],
  extends: 'foam.script.parse.AbstractParser',
  mixins: [ 'foam.script.parse.Binary' ],
  methods: [
    function compile() {
      var arg1 = this.arg1.compile();
      var arg2 = this.arg2.compile();

      return function(x, ps) {
        return arg2.call(this, x, ps) ?  undefined : arg1.call(this, x, ps);
      };
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'Symbol',
  mixins: [ 'foam.script.parse.Terminal' ],
  implements: [
    'foam.script.Compilable'
  ],
  extends: 'foam.script.parse.AbstractParser',
  properties: [
    {
      class: 'String',
      name: 'name'
    }
  ],
  methods: [
    {
      name: 'compile',
      code: function() {
        var name = this.name;
        return function(x, ps) {
          return this[name](ps);
        };
      }
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'AbstractGrammar',
  abstract: true,
  methods: [
    {
      name: 'parseString',
      code: function(str, sym) {
        var ps = foam.parse.StringPStream.create();
        ps.setString(str);
        return this[sym](ps);
      }
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'Parsers',
  methods: [
    {
      name: 'named',
      code: function(name, d) {
        return foam.script.parse.Named.create({
          name: name,
          arg: d
        });
      }
    },
    {
      name: 'literal',
      code: function(string) {
        return foam.script.parse.Literal.create({
          string: string
        });
      }
    },
    {
      name: 'literalIC',
      code: function(string) {
        return foam.script.parse.LiteralIC.create({
          string: string
        });
      }
    },
    {
      name: 'eof',
      code: function() {
        return foam.script.parse.EOF.create({
        });
      }
    },
    {
      name: 'or',
      code: function(a, b) {
        return foam.script.parse.Alternate.create({
          arg1: a,
          arg2: b
        });
      }
    },
    {
      name: 'and',
      code: function(a, b) {
        return foam.script.parse.Sequence.create({
          arg1: a,
          arg2: b
        });
      }
    },
    {
      name: 'substring',
      code: function(p) {
        return foam.script.parse.Substring.create({
          arg: p
        });
      }
    },
    {
      name: 'optional',
      code: function(p) {
        return foam.script.parse.Optional.create({
          arg: p
        });
      }
    },
    {
      name: 'anyChar',
      code: function() {
        return foam.script.parse.AnyChar.create({
        });
      }
    },
    {
      name: 'notChars',
      code: function(chars) {
        return foam.script.parse.NotChars.create({
          string: chars
        });
      }
    },
    {
      name: 'chars',
      code: function(chars) {
        return foam.script.parse.Chars.create({
          string: chars
        });
      }
    },
    {
      name: 'range',
      code: function(a, b) {
        return foam.script.parse.Range.create({
          from: a,
          to: b
        });
      }
    },
    {
      name: 'star',
      code: function(p) {
        return foam.script.parse.Repeat.create({
          arg: p
        });
      }
    },
    {
      name: 'plus',
      code: function(p) {
        return foam.script.parse.Repeat.create({
          arg: p,
          minimum: 1
        });
      }
    },
    {
      name: 'not',
      code: function(p) {
        return foam.script.parse.Not.create({
          arg: p
        });
      }
    },
    {
      name: 'except',
      code: function(a, b) {
        return foam.script.parse.Except.create({
          arg1: a,
          arg2: b
        });
      }
    },
    {
      name: 'sym',
      code: function(name) {
        return foam.script.parse.Symbol.create({
          name: name
        });
      }
    },
    {
      name: 'withAction',
      code: function(parser, action) {
        var args = foam.Function.argNames(action);
        return foam.script.parse.WithAction.create({
          code: action,
          args: args,
          arg: parser
        });
      }
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'MatchSet',
  methods: [
    function get(key) {
      return null;
    },
    function add(key, value) {
      return foam.script.parse.ValueSet.create({
        parent: this,
        key: key,
        value: value
      });
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'ValueSet',
  extends: 'foam.script.parse.NullValueSet',
  properties: [
    {
      name: 'parent'
    },
    {
      name: 'key'
    },
    {
      name: 'value'
    }
  ],
  methods: [
    function get(key) {
      if ( foam.util.equals(key, this.key) ) return this.value;
      return this.parent.get(key);
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'NamedMatch',
  properties: [
    {
      name: 'name'
    },
    {
      name: 'value'
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'AnonymousMatch',
  properties: [
    'value'
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'Named',
  implements: [ 'foam.script.Compilable' ],
  mixins: [ 'foam.script.parse.Unary' ],
  requires: [
    'foam.script.parse.NamedMatch'
  ],
  properties: [
    {
      name: 'name'
    }
  ],
  methods: [
    function compile() {
      var name = this.name;
      var arg = this.arg.compile();

      return function(x, ps) {
        ps = arg.call(this, x, ps);
        if ( ! ps ) return ps;
        x.locals[name] = ps.value;
        return ps;
      };
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'NewScope',
  implements: [ 'foam.script.Compilable' ],
  mixins: [ 'foam.script.parse.Unary' ],
  methods: [
    function compile() {
      var arg = this.arg.compile();
      return function(x, ps) {
        x = Object.create(x);
        x.locals = {};
        return arg.call(this, x, ps);
      };
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'WithAction',
  implements: [ 'foam.script.Compilable' ],
  mixins: [ 'foam.script.parse.Unary' ],
  properties: [
    {
      name: 'code'
    },
    {
      name: 'args'
    }
  ],
  methods: [
    {
      name: 'compile',
      code: function() {
        var code = this.code;
        var args = this.args;
        var f = this.arg.compile();

        return function(x, ps) {
          ps = f.call(this, x, ps);
          if ( ! ps ) return ps;

          return ps.setValue(code.apply(this, args.map(name => x.locals[name])));
        };
      }
    }
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'CharacterClasses',
  documentation: 'A base parser class that defines some useful symbols for common character classes.',
  methods: [
    {
      class: 'foam.script.CompiledMethod',
      name: 'character',
      ast: { class: 'foam.script.parse.AnyChar' }
    },
    {
      class: 'foam.script.CompiledMethod',
      name: 'whitespaceCharacter',
      ast: { class: 'foam.script.parse.Chars', string: ' \r\n\t' }
    },
    {
      class: 'foam.script.CompiledMethod',
      name: 'decimalDigit',
      ast: { class: 'foam.script.parse.Chars', string: '0123456789' }
    },
    {
      class: 'foam.script.CompiledMethod',
      name: 'letter',
      ast: { class: 'foam.script.parse.Chars', string: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' }
    },
  ]
});

foam.CLASS({
  package: 'foam.script.parse',
  name: 'Super',
  implements: [ 'foam.script.Compilable' ],
  methods: [
    function compile() {
      return function(x, ps) {
        return this.__proto__.__proto__[x._methodName].call(this, ps);
      }
    }
  ]
});
