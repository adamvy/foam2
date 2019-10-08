foam.CLASS({
        class: "foam.core.Model",
        package: "foam.script",
        name: "ParserRecognizer",
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
                                                name: "whitespaceCharacter,"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "comment,"
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
                                                name: "whitespaceCharacter,"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "comment,"
                                        }
                                },
                                arg2: {
                                        class: "foam.script.parse.Symbol",
                                        name: "optionalWhitespace,"
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
                                                                name: "character,"
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
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "identifier,"
                                },
                                arg2: {
                                        class: "foam.script.parse.Repeat",
                                        arg: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "."
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "identifier,"
                                                }
                                        }
                                }
                        },
                        name: "grammarId"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "optionalWhitespace,"
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
                                                        name: "whitespace,"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Sequence",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "grammarId,"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Sequence",
                                                                arg1: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "optionalWhitespace,"
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
                                                                                        name: "optionalWhitespace,"
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
                                                                                                        class: "foam.script.parse.Repeat",
                                                                                                        arg: {
                                                                                                                class: "foam.script.parse.Sequence",
                                                                                                                arg1: {
                                                                                                                        class: "foam.script.parse.Symbol",
                                                                                                                        name: "optionalWhitespace,"
                                                                                                                },
                                                                                                                arg2: {
                                                                                                                        class: "foam.script.parse.Symbol",
                                                                                                                        name: "production,"
                                                                                                                }
                                                                                                        }
                                                                                                },
                                                                                                arg2: {
                                                                                                        class: "foam.script.parse.Sequence",
                                                                                                        arg1: {
                                                                                                                class: "foam.script.parse.Symbol",
                                                                                                                name: "optionalWhitespace,"
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
                        },
                        name: "grammar"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "identifier,"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace,"
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
                                                                name: "optionalWhitespace,"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Sequence",
                                                                arg1: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "compoundRule,"
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Sequence",
                                                                        arg1: {
                                                                                class: "foam.script.parse.Optional",
                                                                                arg: {
                                                                                        class: "foam.script.parse.Symbol",
                                                                                        name: "semanticAction,"
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
                        },
                        name: "production"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "optionalWhitespace,"
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
                                                        name: "optionalWhitespace,"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "action,"
                                                }
                                        }
                                }
                        },
                        name: "semanticAction"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: "{{"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Repeat",
                                                arg: {
                                                        class: "foam.script.parse.Except",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "character,"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Literal",
                                                                string: "}}"
                                                        }
                                                }
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Literal",
                                                string: "}}"
                                        }
                                }
                        },
                        name: "action"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Alternate",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "parenthesisedRule,"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Alternate",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "optionalRule,"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Alternate",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "starRule,"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Alternate",
                                                                arg1: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "literalRule,"
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "symbolRule,"
                                                                }
                                                        }
                                                }
                                        }
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Optional",
                                                arg: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "namedMatch,"
                                                }
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Optional",
                                                arg: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "subtractionRule,"
                                                }
                                        }
                                }
                        },
                        name: "ruleComponent"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: ":"
                                },
                                arg2: {
                                        class: "foam.script.parse.Symbol",
                                        name: "identifier,"
                                }
                        },
                        name: "namedMatch"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "optionalWhitespace,"
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
                                                        name: "optionalWhitespace,"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "ruleComponent,"
                                                }
                                        }
                                }
                        },
                        name: "subtractionRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "ruleComponent,"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace,"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Optional",
                                                arg: {
                                                        class: "foam.script.parse.Alternate",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "sequenceRule,"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "alternateRule,"
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
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: ","
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace,"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "compoundRule,"
                                        }
                                }
                        },
                        name: "sequenceRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: "|"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace,"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "compoundRule,"
                                        }
                                }
                        },
                        name: "alternateRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "letter,"
                                },
                                arg2: {
                                        class: "foam.script.parse.Repeat",
                                        arg: {
                                                class: "foam.script.parse.Symbol",
                                                name: "letter,"
                                        }
                                }
                        },
                        name: "identifier"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Symbol",
                                name: "identifier,"
                        },
                        name: "symbolRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "optionalWhitespace,"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "compoundRule,"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace,"
                                        }
                                }
                        },
                        name: "nestedRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: "("
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "nestedRule,"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Literal",
                                                string: ")"
                                        }
                                }
                        },
                        name: "parenthesisedRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: "{"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "nestedRule,"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Literal",
                                                string: "}"
                                        }
                                }
                        },
                        name: "starRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: "["
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "nestedRule,:,rule"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Literal",
                                                string: "]"
                                        }
                                }
                        },
                        name: "optionalRule"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: "'"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Except",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "character,"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "'"
                                                }
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Repeat",
                                                        arg: {
                                                                class: "foam.script.parse.Except",
                                                                arg1: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "character,"
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Literal",
                                                                        string: "'"
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
                        name: "singleQuoteLiteral"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: "\""
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Except",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "character,"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "\""
                                                }
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Repeat",
                                                        arg: {
                                                                class: "foam.script.parse.Except",
                                                                arg1: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "character,"
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Literal",
                                                                        string: "\""
                                                                }
                                                        }
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "\""
                                                }
                                        }
                                }
                        },
                        name: "doubleQuoteLiteral"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Alternate",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "singleQuoteLiteral,"
                                },
                                arg2: {
                                        class: "foam.script.parse.Symbol",
                                        name: "doubleQuoteLiteral,"
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
        javaName: "foam.script.ParserRecognizer"
});
