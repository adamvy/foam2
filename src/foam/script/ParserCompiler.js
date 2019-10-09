foam.CLASS({
        class: "foam.core.Model",
        package: "foam.script",
        name: "ParserCompiler",
        extends: "foam.script.parse.AbstractGrammar",
        methods: [
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Repeat",
                                arg: {
                                        class: "foam.script.parse.Alternate",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "whitespaceCharacter"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "comment"
                                        }
                                }
                        },
                        name: "optionalWhitespace"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Alternate",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "whitespaceCharacter"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "comment"
                                        }
                                },
                                arg2: {
                                        class: "foam.script.parse.Symbol",
                                        name: "optionalWhitespace"
                                }
                        },
                        name: "whitespace"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: "(*"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Repeat",
                                                arg: {
                                                        class: "foam.script.parse.Except",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "character"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Literal",
                                                                string: "*)"
                                                        }
                                                }
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Literal",
                                                string: "*)"
                                        }
                                }
                        },
                        name: "comment"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(xs
) {
 var s = xs.map(a => a.join('')).join(''); return s.substring(0, s.length - 1);
},
                                args: [
                                        "xs"
                                ],
                                arg: {
                                        class: "foam.script.parse.Named",
                                        name: "xs",
                                        arg: {
                                                class: "foam.script.parse.Repeat",
                                                arg: {
                                                        class: "foam.script.parse.Sequence",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "identifier"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Literal",
                                                                string: "."
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "package"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(pkg,name,productions
) {

  return foam.core.Model.create({
    package: pkg,
    name: name,
    extends: 'foam.script.parse.AbstractGrammar',
    mixins: [ 'foam.script.parse.CharacterClasses' ],
    methods: productions.map(m => m[1])
  });

},
                                args: [
                                        "pkg",
                                        "name",
                                        "productions"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "grammar"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Sequence",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "whitespace"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Sequence",
                                                                arg1: {
                                                                        class: "foam.script.parse.Named",
                                                                        name: "pkg",
                                                                        arg: {
                                                                                class: "foam.script.parse.Symbol",
                                                                                name: "package"
                                                                        }
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Sequence",
                                                                        arg1: {
                                                                                class: "foam.script.parse.Named",
                                                                                name: "name",
                                                                                arg: {
                                                                                        class: "foam.script.parse.Symbol",
                                                                                        name: "identifier"
                                                                                }
                                                                        },
                                                                        arg2: {
                                                                                class: "foam.script.parse.Sequence",
                                                                                arg1: {
                                                                                        class: "foam.script.parse.Symbol",
                                                                                        name: "optionalWhitespace"
                                                                                },
                                                                                arg2: {
                                                                                        class: "foam.script.parse.Sequence",
                                                                                        arg1: {
                                                                                                class: "foam.script.parse.Literal",
                                                                                                string: "="
                                                                                        },
                                                                                        arg2: {
                                                                                                class: "foam.script.parse.Sequence",
                                                                                                arg1: {
                                                                                                        class: "foam.script.parse.Symbol",
                                                                                                        name: "optionalWhitespace"
                                                                                                },
                                                                                                arg2: {
                                                                                                        class: "foam.script.parse.Sequence",
                                                                                                        arg1: {
                                                                                                                class: "foam.script.parse.Literal",
                                                                                                                string: "("
                                                                                                        },
                                                                                                        arg2: {
                                                                                                                class: "foam.script.parse.Sequence",
                                                                                                                arg1: {
                                                                                                                        class: "foam.script.parse.Named",
                                                                                                                        name: "productions",
                                                                                                                        arg: {
                                                                                                                                class: "foam.script.parse.Repeat",
                                                                                                                                arg: {
                                                                                                                                        class: "foam.script.parse.Sequence",
                                                                                                                                        arg1: {
                                                                                                                                                class: "foam.script.parse.Symbol",
                                                                                                                                                name: "optionalWhitespace"
                                                                                                                                        },
                                                                                                                                        arg2: {
                                                                                                                                                class: "foam.script.parse.Symbol",
                                                                                                                                                name: "production"
                                                                                                                                        }
                                                                                                                                }
                                                                                                                        }
                                                                                                                },
                                                                                                                arg2: {
                                                                                                                        class: "foam.script.parse.Sequence",
                                                                                                                        arg1: {
                                                                                                                                class: "foam.script.parse.Symbol",
                                                                                                                                name: "optionalWhitespace"
                                                                                                                        },
                                                                                                                        arg2: {
                                                                                                                                class: "foam.script.parse.Literal",
                                                                                                                                string: ")"
                                                                                                                        }
                                                                                                                }
                                                                                                        }
                                                                                                }
                                                                                        }
                                                                                }
                                                                        }
                                                                }
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "grammar"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(name,ast,action
) {

  var args = [];
  ast.visit(function(node) {
    if ( foam.script.parse.Named.isInstance(node) )
      args.push(node.name);
  });

  var compiled = Function.apply(null, args.concat(action));

  if ( action ) {
    ast = foam.script.parse.WithAction.create({
      code: compiled,
      args: args,
      arg: ast
    });
  }

  return foam.script.CompiledMethod.create({
    name: name,
    ast: ast
  });

},
                                args: [
                                        "name",
                                        "ast",
                                        "action"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Named",
                                                name: "name",
                                                arg: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "identifier"
                                                }
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "optionalWhitespace"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Sequence",
                                                        arg1: {
                                                                class: "foam.script.parse.Literal",
                                                                string: "="
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Sequence",
                                                                arg1: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "optionalWhitespace"
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Sequence",
                                                                        arg1: {
                                                                                class: "foam.script.parse.Named",
                                                                                name: "ast",
                                                                                arg: {
                                                                                        class: "foam.script.parse.Symbol",
                                                                                        name: "compoundRule"
                                                                                }
                                                                        },
                                                                        arg2: {
                                                                                class: "foam.script.parse.Sequence",
                                                                                arg1: {
                                                                                        class: "foam.script.parse.Named",
                                                                                        name: "action",
                                                                                        arg: {
                                                                                                class: "foam.script.parse.Optional",
                                                                                                arg: {
                                                                                                        class: "foam.script.parse.Symbol",
                                                                                                        name: "semanticAction"
                                                                                                }
                                                                                        }
                                                                                },
                                                                                arg2: {
                                                                                        class: "foam.script.parse.Literal",
                                                                                        string: ";"
                                                                                }
                                                                        }
                                                                }
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "production"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(a
) {
 return a;
},
                                args: [
                                        "a"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "->"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Sequence",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "optionalWhitespace"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Named",
                                                                name: "a",
                                                                arg: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "action"
                                                                }
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "semanticAction"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(xs
) {
 return xs.join('');
},
                                args: [
                                        "xs"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Literal",
                                                string: "{{"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Named",
                                                        name: "xs",
                                                        arg: {
                                                                class: "foam.script.parse.Repeat",
                                                                arg: {
                                                                        class: "foam.script.parse.Except",
                                                                        arg1: {
                                                                                class: "foam.script.parse.Symbol",
                                                                                name: "character"
                                                                        },
                                                                        arg2: {
                                                                                class: "foam.script.parse.Literal",
                                                                                string: "}}"
                                                                        }
                                                                }
                                                        }
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "}}"
                                                }
                                        }
                                }
                        },
                        name: "action"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(primary,name,negated
) {

  var parser = negated ? foam.script.parse.Except.create({
    arg1: primary,
    arg2: negated
  }) : primary;

  return name ? foam.script.parse.Named.create({
    name: name,
    arg: parser
  }) : parser;

},
                                args: [
                                        "primary",
                                        "name",
                                        "negated"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Named",
                                                name: "primary",
                                                arg: {
                                                        class: "foam.script.parse.Alternate",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "parenthesisedRule"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Alternate",
                                                                arg1: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "optionalRule"
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Alternate",
                                                                        arg1: {
                                                                                class: "foam.script.parse.Symbol",
                                                                                name: "starRule"
                                                                        },
                                                                        arg2: {
                                                                                class: "foam.script.parse.Alternate",
                                                                                arg1: {
                                                                                        class: "foam.script.parse.Symbol",
                                                                                        name: "literalRule"
                                                                                },
                                                                                arg2: {
                                                                                        class: "foam.script.parse.Symbol",
                                                                                        name: "symbolRule"
                                                                                }
                                                                        }
                                                                }
                                                        }
                                                }
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Named",
                                                        name: "name",
                                                        arg: {
                                                                class: "foam.script.parse.Optional",
                                                                arg: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "namedMatch"
                                                                }
                                                        }
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Named",
                                                        name: "negated",
                                                        arg: {
                                                                class: "foam.script.parse.Optional",
                                                                arg: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "subtractionRule"
                                                                }
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "ruleComponent"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(id
) {
 return id;
},
                                args: [
                                        "id"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Literal",
                                                string: ":"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Named",
                                                name: "id",
                                                arg: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "identifier"
                                                }
                                        }
                                }
                        },
                        name: "namedMatch"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(rhs
) {
 return rhs;
},
                                args: [
                                        "rhs"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "-"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Sequence",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "optionalWhitespace"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Named",
                                                                name: "rhs",
                                                                arg: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "ruleComponent"
                                                                }
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "subtractionRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(lhs,rhs
) {

  if ( rhs ) return rhs[0].create({
    arg1: lhs,
    arg2: rhs[1]
  });
  return lhs;

},
                                args: [
                                        "lhs",
                                        "rhs"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Named",
                                                name: "lhs",
                                                arg: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "ruleComponent"
                                                }
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "optionalWhitespace"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Named",
                                                        name: "rhs",
                                                        arg: {
                                                                class: "foam.script.parse.Optional",
                                                                arg: {
                                                                        class: "foam.script.parse.Alternate",
                                                                        arg1: {
                                                                                class: "foam.script.parse.Symbol",
                                                                                name: "sequenceRule"
                                                                        },
                                                                        arg2: {
                                                                                class: "foam.script.parse.Symbol",
                                                                                name: "alternateRule"
                                                                        }
                                                                }
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "compoundRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(rhs
) {

  return [ foam.script.parse.Sequence, rhs ];

},
                                args: [
                                        "rhs"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Literal",
                                                string: ","
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "optionalWhitespace"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Named",
                                                        name: "rhs",
                                                        arg: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "compoundRule"
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "sequenceRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(rhs
) {
  return [ foam.script.parse.Alternate, rhs ];
},
                                args: [
                                        "rhs"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Literal",
                                                string: "|"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "optionalWhitespace"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Named",
                                                        name: "rhs",
                                                        arg: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "compoundRule"
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "alternateRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(x,xs
) {
 return x + xs.join('');
},
                                args: [
                                        "x",
                                        "xs"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Named",
                                                name: "x",
                                                arg: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "letter"
                                                }
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Named",
                                                name: "xs",
                                                arg: {
                                                        class: "foam.script.parse.Repeat",
                                                        arg: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "letter"
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "identifier"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(x
) {
 return foam.script.parse.Symbol.create({ name: x });
},
                                args: [
                                        "x"
                                ],
                                arg: {
                                        class: "foam.script.parse.Named",
                                        name: "x",
                                        arg: {
                                                class: "foam.script.parse.Symbol",
                                                name: "identifier"
                                        }
                                }
                        },
                        name: "symbolRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(inner
) {
 return inner;
},
                                args: [
                                        "inner"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Named",
                                                        name: "inner",
                                                        arg: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "compoundRule"
                                                        }
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "optionalWhitespace"
                                                }
                                        }
                                }
                        },
                        name: "nestedRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(inner
) {
 return inner;
},
                                args: [
                                        "inner"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Literal",
                                                string: "("
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Named",
                                                        name: "inner",
                                                        arg: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "nestedRule"
                                                        }
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Literal",
                                                        string: ")"
                                                }
                                        }
                                }
                        },
                        name: "parenthesisedRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(inner
) {
 return foam.script.parse.Repeat.create({ arg: inner });
},
                                args: [
                                        "inner"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Literal",
                                                string: "{"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Named",
                                                        name: "inner",
                                                        arg: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "nestedRule"
                                                        }
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "}"
                                                }
                                        }
                                }
                        },
                        name: "starRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(inner
) {
 return foam.script.parse.Optional.create({ arg: inner });
},
                                args: [
                                        "inner"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Literal",
                                                string: "["
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Named",
                                                        name: "inner",
                                                        arg: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "nestedRule"
                                                        }
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "]"
                                                }
                                        }
                                }
                        },
                        name: "optionalRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(
) {
 return '\'';
},
                                arg: {
                                        class: "foam.script.parse.Literal",
                                        string: "''"
                                }
                        },
                        name: "escapedSingleQuote"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.WithAction",
                                code: function anonymous(xs
) {

  return foam.script.parse.Literal.create({ string: xs.join('') });

},
                                args: [
                                        "xs"
                                ],
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Literal",
                                                string: "'"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Named",
                                                        name: "xs",
                                                        arg: {
                                                                class: "foam.script.parse.Repeat",
                                                                arg: {
                                                                        class: "foam.script.parse.Alternate",
                                                                        arg1: {
                                                                                class: "foam.script.parse.Symbol",
                                                                                name: "escapedSingleQuote"
                                                                        },
                                                                        arg2: {
                                                                                class: "foam.script.parse.Except",
                                                                                arg1: {
                                                                                        class: "foam.script.parse.Symbol",
                                                                                        name: "character"
                                                                                },
                                                                                arg2: {
                                                                                        class: "foam.script.parse.Literal",
                                                                                        string: "'"
                                                                                }
                                                                        }
                                                                }
                                                        }
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "'"
                                                }
                                        }
                                }
                        },
                        name: "literalRule"
                }
        ],
        mixins: [
                {

                        name: "foam.script.parse.CharacterClasses"
                }
        ],
        swiftExtends: "foam_script_parse_AbstractGrammar",
        javaName: "foam.script.ParserCompiler"
});
