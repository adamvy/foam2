foam.CLASS({
        class: "foam.core.Model",
        package: "foam.script",
        name: "SmalltalkRecognizer",
        extends: "foam.script.parse.AbstractGrammar",
        methods: [
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Except",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "character"
                                },
                                arg2: {
                                        class: "foam.script.parse.Literal",
                                        string: "\""
                                }
                        },
                        name: "commentCharacter"
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
                                                class: "foam.script.parse.Repeat",
                                                arg: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "commentCharacter"
                                                }
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Literal",
                                                string: "\""
                                        }
                                }
                        },
                        name: "comment"
                },
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
                                class: "foam.script.parse.Alternate",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "decimalDigit"
                                },
                                arg2: {
                                        class: "foam.script.parse.Symbol",
                                        name: "letter"
                                }
                        },
                        name: "letterOrDigit"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Alternate",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "letter"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Literal",
                                                string: "_"
                                        }
                                },
                                arg2: {
                                        class: "foam.script.parse.Repeat",
                                        arg: {
                                                class: "foam.script.parse.Alternate",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "letterOrDigit"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "_"
                                                }
                                        }
                                }
                        },
                        name: "identifier"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Symbol",
                                name: "identifier"
                        },
                        name: "reference"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Alternate",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: "nil"
                                },
                                arg2: {
                                        class: "foam.script.parse.Alternate",
                                        arg1: {
                                                class: "foam.script.parse.Literal",
                                                string: "false"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Literal",
                                                string: "true"
                                        }
                                }
                        },
                        name: "constantReference"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Alternate",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: "self"
                                },
                                arg2: {
                                        class: "foam.script.parse.Alternate",
                                        arg1: {
                                                class: "foam.script.parse.Literal",
                                                string: "super"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Literal",
                                                string: "thisContext"
                                        }
                                }
                        },
                        name: "pseudoVariableReference"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Alternate",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "pseudoVariableReference"
                                },
                                arg2: {
                                        class: "foam.script.parse.Symbol",
                                        name: "constantReference"
                                }
                        },
                        name: "reservedIdentifier"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Except",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "identifier"
                                },
                                arg2: {
                                        class: "foam.script.parse.Symbol",
                                        name: "reservedIdentifier"
                                }
                        },
                        name: "bindableIdentifier"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Symbol",
                                name: "identifier"
                        },
                        name: "unaryMessageSelector"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "identifier"
                                },
                                arg2: {
                                        class: "foam.script.parse.Literal",
                                        string: ":"
                                }
                        },
                        name: "keyword"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "keyword"
                                },
                                arg2: {
                                        class: "foam.script.parse.Repeat",
                                        arg: {
                                                class: "foam.script.parse.Symbol",
                                                name: "keyword"
                                        }
                                }
                        },
                        name: "keywordMessageSelector"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Alternate",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: "~"
                                },
                                arg2: {
                                        class: "foam.script.parse.Alternate",
                                        arg1: {
                                                class: "foam.script.parse.Literal",
                                                string: "!"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Alternate",
                                                arg1: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "@"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Alternate",
                                                        arg1: {
                                                                class: "foam.script.parse.Literal",
                                                                string: "%"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Alternate",
                                                                arg1: {
                                                                        class: "foam.script.parse.Literal",
                                                                        string: "&"
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Alternate",
                                                                        arg1: {
                                                                                class: "foam.script.parse.Literal",
                                                                                string: "*"
                                                                        },
                                                                        arg2: {
                                                                                class: "foam.script.parse.Alternate",
                                                                                arg1: {
                                                                                        class: "foam.script.parse.Literal",
                                                                                        string: "-"
                                                                                },
                                                                                arg2: {
                                                                                        class: "foam.script.parse.Alternate",
                                                                                        arg1: {
                                                                                                class: "foam.script.parse.Literal",
                                                                                                string: "+"
                                                                                        },
                                                                                        arg2: {
                                                                                                class: "foam.script.parse.Alternate",
                                                                                                arg1: {
                                                                                                        class: "foam.script.parse.Literal",
                                                                                                        string: "="
                                                                                                },
                                                                                                arg2: {
                                                                                                        class: "foam.script.parse.Alternate",
                                                                                                        arg1: {
                                                                                                                class: "foam.script.parse.Literal",
                                                                                                                string: "|"
                                                                                                        },
                                                                                                        arg2: {
                                                                                                                class: "foam.script.parse.Alternate",
                                                                                                                arg1: {
                                                                                                                        class: "foam.script.parse.Literal",
                                                                                                                        string: "\\"
                                                                                                                },
                                                                                                                arg2: {
                                                                                                                        class: "foam.script.parse.Alternate",
                                                                                                                        arg1: {
                                                                                                                                class: "foam.script.parse.Literal",
                                                                                                                                string: "<"
                                                                                                                        },
                                                                                                                        arg2: {
                                                                                                                                class: "foam.script.parse.Alternate",
                                                                                                                                arg1: {
                                                                                                                                        class: "foam.script.parse.Literal",
                                                                                                                                        string: ">"
                                                                                                                                },
                                                                                                                                arg2: {
                                                                                                                                        class: "foam.script.parse.Alternate",
                                                                                                                                        arg1: {
                                                                                                                                                class: "foam.script.parse.Literal",
                                                                                                                                                string: ","
                                                                                                                                        },
                                                                                                                                        arg2: {
                                                                                                                                                class: "foam.script.parse.Alternate",
                                                                                                                                                arg1: {
                                                                                                                                                        class: "foam.script.parse.Literal",
                                                                                                                                                        string: "?"
                                                                                                                                                },
                                                                                                                                                arg2: {
                                                                                                                                                        class: "foam.script.parse.Literal",
                                                                                                                                                        string: "/"
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
                                                }
                                        }
                                }
                        },
                        name: "binarySelectorChar"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "binarySelectorChar"
                                },
                                arg2: {
                                        class: "foam.script.parse.Optional",
                                        arg: {
                                                class: "foam.script.parse.Symbol",
                                                name: "binarySelectorChar"
                                        }
                                }
                        },
                        name: "binaryMessageSelector"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Optional",
                                        arg: {
                                                class: "foam.script.parse.Literal",
                                                string: "-"
                                        }
                                },
                                arg2: {
                                        class: "foam.script.parse.Symbol",
                                        name: "unsignedIntegerLiteral"
                                }
                        },
                        name: "integerLiteral"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Alternate",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "decimalIntegerLiteral"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "radix"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "r"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "baseNIntegerLiteral"
                                                }
                                        }
                                }
                        },
                        name: "unsignedIntegerLiteral"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "decimalDigit"
                                },
                                arg2: {
                                        class: "foam.script.parse.Repeat",
                                        arg: {
                                                class: "foam.script.parse.Symbol",
                                                name: "decimalDigit"
                                        }
                                }
                        },
                        name: "decimalIntegerLiteral"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Symbol",
                                name: "decimalIntegerLiteral"
                        },
                        name: "radix"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "letterOrDigit"
                                },
                                arg2: {
                                        class: "foam.script.parse.Repeat",
                                        arg: {
                                                class: "foam.script.parse.Symbol",
                                                name: "letterOrDigit"
                                        }
                                }
                        },
                        name: "baseNIntegerLiteral"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Optional",
                                        arg: {
                                                class: "foam.script.parse.Literal",
                                                string: "-"
                                        }
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "decimalIntegerLiteral"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Optional",
                                                        arg: {
                                                                class: "foam.script.parse.Sequence",
                                                                arg1: {
                                                                        class: "foam.script.parse.Literal",
                                                                        string: "."
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "decimalIntegerLiteral"
                                                                }
                                                        }
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Sequence",
                                                        arg1: {
                                                                class: "foam.script.parse.Literal",
                                                                string: "s"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Optional",
                                                                arg: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "decimalIntegerLiteral"
                                                                }
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "scaledDecimalLiteral"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Optional",
                                        arg: {
                                                class: "foam.script.parse.Literal",
                                                string: "-"
                                        }
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "decimalIntegerLiteral"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "."
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Sequence",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "decimalIntegerLiteral"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Alternate",
                                                                arg1: {
                                                                        class: "foam.script.parse.Optional",
                                                                        arg: {
                                                                                class: "foam.script.parse.Symbol",
                                                                                name: "exponent"
                                                                        }
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "exponent"
                                                                }
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "floatingPointLiteral"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Alternate",
                                        arg1: {
                                                class: "foam.script.parse.Literal",
                                                string: "e"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Alternate",
                                                arg1: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "d"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Literal",
                                                        string: "q"
                                                }
                                        }
                                },
                                arg2: {
                                        class: "foam.script.parse.Optional",
                                        arg: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Optional",
                                                        arg: {
                                                                class: "foam.script.parse.Literal",
                                                                string: "-"
                                                        }
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "decimalIntegerLiteral"
                                                }
                                        }
                                }
                        },
                        name: "exponent"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: "$"
                                },
                                arg2: {
                                        class: "foam.script.parse.Symbol",
                                        name: "character"
                                }
                        },
                        name: "characterLiteral"
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
                                                class: "foam.script.parse.Repeat",
                                                arg: {
                                                        class: "foam.script.parse.Alternate",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "stringLiteralCharacter"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Literal",
                                                                string: "''"
                                                        }
                                                }
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Literal",
                                                string: "'"
                                        }
                                }
                        },
                        name: "stringLiteral"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Except",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "character"
                                },
                                arg2: {
                                        class: "foam.script.parse.Literal",
                                        string: "'"
                                }
                        },
                        name: "stringLiteralCharacter"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Alternate",
                                arg1: {
                                        class: "foam.script.parse.Except",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "unaryMessageSelector"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "constantReference"
                                        }
                                },
                                arg2: {
                                        class: "foam.script.parse.Alternate",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "keywordMessageSelector"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "binaryMessageSelector"
                                        }
                                }
                        },
                        name: "symbolInArrayLiteral"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: "#"
                                },
                                arg2: {
                                        class: "foam.script.parse.Alternate",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "symbolInArrayLiteral"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Alternate",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "constantReference"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "stringLiteral"
                                                }
                                        }
                                }
                        },
                        name: "symbolLiteral"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Alternate",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "objectArrayLiteral"
                                },
                                arg2: {
                                        class: "foam.script.parse.Symbol",
                                        name: "byteArrayLiteral"
                                }
                        },
                        name: "arrayLiteral"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: "#"
                                },
                                arg2: {
                                        class: "foam.script.parse.Symbol",
                                        name: "nestedObjectArrayLiteral"
                                }
                        },
                        name: "objectArrayLiteral"
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
                                                name: "optionalWhitespace"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Optional",
                                                        arg: {
                                                                class: "foam.script.parse.Sequence",
                                                                arg1: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "literalArrayElement"
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Repeat",
                                                                        arg: {
                                                                                class: "foam.script.parse.Sequence",
                                                                                arg1: {
                                                                                        class: "foam.script.parse.Symbol",
                                                                                        name: "whitespace"
                                                                                },
                                                                                arg2: {
                                                                                        class: "foam.script.parse.Symbol",
                                                                                        name: "literalArrayElement"
                                                                                }
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
                        },
                        name: "nestedObjectArrayLiteral"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Alternate",
                                arg1: {
                                        class: "foam.script.parse.Except",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "literal"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "blockLiteral"
                                        }
                                },
                                arg2: {
                                        class: "foam.script.parse.Alternate",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "nestedObjectArrayLiteral"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Alternate",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "symbolInArrayLiteral"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "constantReference"
                                                }
                                        }
                                }
                        },
                        name: "literalArrayElement"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: "#["
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
                                                        class: "foam.script.parse.Optional",
                                                        arg: {
                                                                class: "foam.script.parse.Sequence",
                                                                arg1: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "unsignedIntegerLiteral"
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Repeat",
                                                                        arg: {
                                                                                class: "foam.script.parse.Sequence",
                                                                                arg1: {
                                                                                        class: "foam.script.parse.Symbol",
                                                                                        name: "whitespace"
                                                                                },
                                                                                arg2: {
                                                                                        class: "foam.script.parse.Symbol",
                                                                                        name: "unsignedIntegerLiteral"
                                                                                }
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
                                                                string: "]"
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "byteArrayLiteral"
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
                                        name: "bindableIdentifier"
                                }
                        },
                        name: "formalBlockArgumentDeclaration"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "formalBlockArgumentDeclaration"
                                },
                                arg2: {
                                        class: "foam.script.parse.Repeat",
                                        arg: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "whitespace"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "formalBlockArgumentDeclaration"
                                                }
                                        }
                                }
                        },
                        name: "formalBlockArgumentDeclarationList"
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
                                                class: "foam.script.parse.Optional",
                                                arg: {
                                                        class: "foam.script.parse.Sequence",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "optionalWhitespace"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Sequence",
                                                                arg1: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "formalBlockArgumentDeclarationList"
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Sequence",
                                                                        arg1: {
                                                                                class: "foam.script.parse.Symbol",
                                                                                name: "optionalWhitespace"
                                                                        },
                                                                        arg2: {
                                                                                class: "foam.script.parse.Literal",
                                                                                string: "|"
                                                                        }
                                                                }
                                                        }
                                                }
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "executableCode"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Sequence",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "optionalWhitespace"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Literal",
                                                                string: "]"
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "blockLiteral"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Alternate",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "constantReference"
                                },
                                arg2: {
                                        class: "foam.script.parse.Alternate",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "integerLiteral"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Alternate",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "scaledDecimalLiteral"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Alternate",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "floatingPointLiteral"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Alternate",
                                                                arg1: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "characterLiteral"
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Alternate",
                                                                        arg1: {
                                                                                class: "foam.script.parse.Symbol",
                                                                                name: "stringLiteral"
                                                                        },
                                                                        arg2: {
                                                                                class: "foam.script.parse.Alternate",
                                                                                arg1: {
                                                                                        class: "foam.script.parse.Symbol",
                                                                                        name: "symbolLiteral"
                                                                                },
                                                                                arg2: {
                                                                                        class: "foam.script.parse.Alternate",
                                                                                        arg1: {
                                                                                                class: "foam.script.parse.Symbol",
                                                                                                name: "arrayLiteral"
                                                                                        },
                                                                                        arg2: {
                                                                                                class: "foam.script.parse.Symbol",
                                                                                                name: "blockLiteral"
                                                                                        }
                                                                                }
                                                                        }
                                                                }
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "literal"
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
                                                name: "statement"
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
                        },
                        name: "nestedExpression"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Alternate",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "literal"
                                },
                                arg2: {
                                        class: "foam.script.parse.Alternate",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "reference"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "nestedExpression"
                                        }
                                }
                        },
                        name: "operand"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Symbol",
                                name: "unaryMessageSelector"
                        },
                        name: "unaryMessage"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Repeat",
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "unaryMessage"
                                        }
                                }
                        },
                        name: "unaryMessageChain"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "operand"
                                },
                                arg2: {
                                        class: "foam.script.parse.Symbol",
                                        name: "unaryMessageChain"
                                }
                        },
                        name: "binaryMessageOperand"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "binaryMessageSelector"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "binaryMessageOperand"
                                        }
                                }
                        },
                        name: "binaryMessage"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Repeat",
                                arg: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "binaryMessage"
                                        }
                                }
                        },
                        name: "binaryMessageChain"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "binaryMessageOperand"
                                },
                                arg2: {
                                        class: "foam.script.parse.Symbol",
                                        name: "binaryMessageChain"
                                }
                        },
                        name: "keywordMessageArgument"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "keyword"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "keywordMessageArgument"
                                        }
                                }
                        },
                        name: "keywordMessageSegment"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "keywordMessageSegment"
                                },
                                arg2: {
                                        class: "foam.script.parse.Repeat",
                                        arg: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "optionalWhitespace"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "keywordMessageSegment"
                                                }
                                        }
                                }
                        },
                        name: "keywordMessage"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "unaryMessage"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "unaryMessageChain"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "binaryMessageChain"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Alternate",
                                                        arg1: {
                                                                class: "foam.script.parse.Optional",
                                                                arg: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "keywordMessage"
                                                                }
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Sequence",
                                                                arg1: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "binaryMessage"
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Sequence",
                                                                        arg1: {
                                                                                class: "foam.script.parse.Symbol",
                                                                                name: "binaryMessageChain"
                                                                        },
                                                                        arg2: {
                                                                                class: "foam.script.parse.Alternate",
                                                                                arg1: {
                                                                                        class: "foam.script.parse.Optional",
                                                                                        arg: {
                                                                                                class: "foam.script.parse.Symbol",
                                                                                                name: "keywordMessage"
                                                                                        }
                                                                                },
                                                                                arg2: {
                                                                                        class: "foam.script.parse.Symbol",
                                                                                        name: "keywordMessage"
                                                                                }
                                                                        }
                                                                }
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "messageChain"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Literal",
                                        string: ";"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "messageChain"
                                        }
                                }
                        },
                        name: "cascadedMessage"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "operand"
                                },
                                arg2: {
                                        class: "foam.script.parse.Optional",
                                        arg: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "optionalWhitespace"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Sequence",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "messageChain"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Repeat",
                                                                arg: {
                                                                        class: "foam.script.parse.Sequence",
                                                                        arg1: {
                                                                                class: "foam.script.parse.Symbol",
                                                                                name: "optionalWhitespace"
                                                                        },
                                                                        arg2: {
                                                                                class: "foam.script.parse.Symbol",
                                                                                name: "cascadedMessage"
                                                                        }
                                                                }
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "expression"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "optionalWhitespace"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "bindableIdentifier"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "optionalWhitespace"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Literal",
                                                        string: ":="
                                                }
                                        }
                                }
                        },
                        name: "assignmentOperation"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Repeat",
                                        arg: {
                                                class: "foam.script.parse.Symbol",
                                                name: "assignmentOperation"
                                        }
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "expression"
                                        }
                                }
                        },
                        name: "statement"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "optionalWhitespace"
                                },
                                arg2: {
                                        class: "foam.script.parse.Literal",
                                        string: "^"
                                }
                        },
                        name: "methodReturnOperator"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Optional",
                                        arg: {
                                                class: "foam.script.parse.Symbol",
                                                name: "methodReturnOperator"
                                        }
                                },
                                arg2: {
                                        class: "foam.script.parse.Symbol",
                                        name: "statement"
                                }
                        },
                        name: "finalStatement"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "optionalWhitespace"
                                },
                                arg2: {
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
                                                        class: "foam.script.parse.Sequence",
                                                        arg1: {
                                                                class: "foam.script.parse.Optional",
                                                                arg: {
                                                                        class: "foam.script.parse.Sequence",
                                                                        arg1: {
                                                                                class: "foam.script.parse.Symbol",
                                                                                name: "bindableIdentifier"
                                                                        },
                                                                        arg2: {
                                                                                class: "foam.script.parse.Repeat",
                                                                                arg: {
                                                                                        class: "foam.script.parse.Sequence",
                                                                                        arg1: {
                                                                                                class: "foam.script.parse.Symbol",
                                                                                                name: "whitespace"
                                                                                        },
                                                                                        arg2: {
                                                                                                class: "foam.script.parse.Symbol",
                                                                                                name: "bindableIdentifier"
                                                                                        }
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
                                                                        string: "|"
                                                                }
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "localVariableDeclarationList"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Optional",
                                        arg: {
                                                class: "foam.script.parse.Symbol",
                                                name: "localVariableDeclarationList"
                                        }
                                },
                                arg2: {
                                        class: "foam.script.parse.Optional",
                                        arg: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Repeat",
                                                        arg: {
                                                                class: "foam.script.parse.Sequence",
                                                                arg1: {
                                                                        class: "foam.script.parse.Symbol",
                                                                        name: "statement"
                                                                },
                                                                arg2: {
                                                                        class: "foam.script.parse.Sequence",
                                                                        arg1: {
                                                                                class: "foam.script.parse.Symbol",
                                                                                name: "optionalWhitespace"
                                                                        },
                                                                        arg2: {
                                                                                class: "foam.script.parse.Literal",
                                                                                string: "."
                                                                        }
                                                                }
                                                        }
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Sequence",
                                                        arg1: {
                                                                class: "foam.script.parse.Symbol",
                                                                name: "finalStatement"
                                                        },
                                                        arg2: {
                                                                class: "foam.script.parse.Optional",
                                                                arg: {
                                                                        class: "foam.script.parse.Literal",
                                                                        string: "."
                                                                }
                                                        }
                                                }
                                        }
                                }
                        },
                        name: "executableCode"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Symbol",
                                name: "unaryMessageSelector"
                        },
                        name: "unaryMethodHeader"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "binaryMessageSelector"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "bindableIdentifier"
                                        }
                                }
                        },
                        name: "binaryMethodHeader"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "keyword"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "optionalWhitespace"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "bindableIdentifier"
                                        }
                                }
                        },
                        name: "keywordMethodHeaderSegment"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "keywordMethodHeaderSegment"
                                },
                                arg2: {
                                        class: "foam.script.parse.Repeat",
                                        arg: {
                                                class: "foam.script.parse.Sequence",
                                                arg1: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "whitespace"
                                                },
                                                arg2: {
                                                        class: "foam.script.parse.Symbol",
                                                        name: "keywordMethodHeaderSegment"
                                                }
                                        }
                                }
                        },
                        name: "keywordMethodHeader"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Alternate",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "unaryMethodHeader"
                                },
                                arg2: {
                                        class: "foam.script.parse.Alternate",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "binaryMethodHeader"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "keywordMethodHeader"
                                        }
                                }
                        },
                        name: "methodHeader"
                },
                {
                        class: "foam.script.CompiledMethod",
                        ast: {
                                class: "foam.script.parse.Sequence",
                                arg1: {
                                        class: "foam.script.parse.Symbol",
                                        name: "optionalWhiteSpace"
                                },
                                arg2: {
                                        class: "foam.script.parse.Sequence",
                                        arg1: {
                                                class: "foam.script.parse.Symbol",
                                                name: "methodHeader"
                                        },
                                        arg2: {
                                                class: "foam.script.parse.Symbol",
                                                name: "executableCode"
                                        }
                                }
                        },
                        name: "methodDeclaration"
                }
        ],
        mixins: [
                {

                        name: "foam.script.parse.CharacterClasses"
                }
        ],
        swiftExtends: "foam_script_parse_AbstractGrammar",
        javaName: "foam.script.SmalltalkRecognizer"
});
