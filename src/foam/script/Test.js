foam.CLASS({
  package: 'foam.script',
  name: 'Test',
  requires: [
    'foam.script.BootstrapParserRecognizer',
    'foam.script.BootstrapParserParser',
  ],
  properties: [
    {
      class: 'String',
      name: 'input',
      view: { class: 'foam.u2.tag.TextArea', rows: 30 },
      value: `grammar foam.script.ParserRecognizer = (

optionalWhitespace = {whitespaceCharacter | comment};
whitespace = ( whitespaceCharacter | comment ), optionalWhitespace;
comment = "(*", {character - "*)"}, "*)";

grammarId = identifier, {'.', identifier};

grammar = optionalWhitespace, "grammar", whitespace, grammarId, optionalWhitespace,
  "=", optionalWhitespace,
  "(", {optionalWhitespace, production}, optionalWhitespace, ")";

production = identifier, optionalWhitespace, "=", optionalWhitespace, compoundRule, ";";

ruleComponent = ( parenthesisedRule
                  | optionalRule
                  | starRule
                  | literalRule
                  | symbolRule ), [ subtractionRule ];

(* Subtraction can only take a ruleComponent on the right side.
  This ensures that a pattern of "foo - bar, baz" is interpreted as
  ( foo - bar ), baz; rather than foo - ( bar, baz ). *)

subtractionRule = optionalWhitespace, "-", optionalWhitespace, ruleComponent;

compoundRule = ruleComponent, optionalWhitespace, [ sequenceRule
                                                    | alternateRule ];

(* Right recursive on compoundRule *)

sequenceRule = ",", optionalWhitespace, compoundRule;
alternateRule = "|", optionalWhitespace, compoundRule;

identifier = letter, {letter};

symbolRule = identifier;

nestedRule = optionalWhitespace, compoundRule, optionalWhitespace;

parenthesisedRule = "(", nestedRule, ")";
starRule = "{", nestedRule, "}";
optionalRule = "[", nestedRule, "]";

singleQuoteLiteral = "'", character - "'", {character - "'"}, "'";
doubleQuoteLiteral = '"', character - '"', {character - '"'}, '"';

literalRule = singleQuoteLiteral
  | doubleQuoteLiteral;

)
`
    },
    {
      name: 'existing',
      view: { class: 'foam.u2.tag.TextArea', rows: 30 },
      visibility: 'RO'
    },
    {
      name: 'parsed',
      view: { class: 'foam.u2.tag.TextArea', rows: 30 },
      visibility: 'RO'
    },
    {
      name: 'output',
      view: { class: 'foam.u2.tag.TextArea', rows: 30 },
      visibility: 'RO'
    }
  ],
  actions: [
    {
      name: 'bootstrap',
      code: function() {
        var bootstrapParser = this.BootstrapParserParser.create();
        //        var parsedRecognizer = bootstrapParser.parseString(this.input, 'grammar').value;
        var res = bootstrapParser.parseString(this.input, 'grammar');

        if ( res ) {
          var parsedRecognizer = res.value;
          this.parsed = parsedRecognizer.stringify();
        } else {
          this.parsed = 'null';
        }

        this.existing = foam.script.BootstrapParserRecognizer.model_.stringify();

        foam.__context__.register(parsedRecognizer.buildClass());

        var parserModel = foam.core.Model.create({
          package: 'foam.script',
          name: 'ParserParser',
          extends: 'foam.script.ParserRecognizer',
          requires:  [
            'foam.script.parse.Sequence',
            'foam.script.parse.Alternate',
            'foam.script.parse.Literal',
            'foam.script.parse.Symbol',
            'foam.script.parse.Except',
            'foam.script.parse.Optional',
            'foam.script.parse.Repeat'
          ],
          methods: bootstrapParser.model_.methods
        });

        foam.__context__.register(parserModel.buildClass());

        var test = foam.script.ParserParser.create().parseString(this.input, 'grammar');
        this.output = foam.json.Pretty.stringify(test.value);
      }
    }
  ]
});
