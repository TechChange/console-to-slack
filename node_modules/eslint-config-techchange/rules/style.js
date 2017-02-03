module.exports = {
	"rules": {
		// Enforce no spaces at bookends of array/object definitions (e.g. [2, 3] is valid, [ 2, 3 ] is invalid)
		"array-bracket-spacing": [2, "never"],		
		// Enforce spaces in single line blocks (e.g. function() { return true; } is valid, function() {return true;} is invalid)
		"block-spacing": 2,
		// Enforce consistent brace style
		"brace-style": [2, "1tbs", {
			"allowSingleLine": true
		}],
		// Enforce camelcase in all variable and function declarations (does not include leading or trailing _ or CAMEL_CASE)
		"camelcase": [2, { "properties": "never" }],
		// Enforce spaces after commas
		"comma-spacing": [2, {
			"before": false,
			"after": true
		}],
		// Enforce commas at the end of a line
		"comma-style": [2, "last"],
		// Disallow spaces inside of computed properties
		"computed-property-spacing": [2, "never"],
		// Enforce capturing the current execution context using the that variable (e.g var that = this;) - consider changing to self
		"consistent-this": [2, "that"],
		// Enforce trailing space at the end of every non-empty file
		"eol-last": 2,
		// Enforce naming of optionally named functions (that could remain anonymous). This helps with debugging, but open to turning this off
		"func-names": 2,
		// Enforce a mininmum id length of 2 characters, except i for iterating over loops
		"id-length": [2, {
			"exceptions": ["i", "_"]
		}],
		// Enforce tabs equivalent to two spaces
		"indent": [2, "tab"],
		// Enforce double quotes for JSX attribute values unless a set of single quotes contains a double quote
		"jsx-quotes": [2, "prefer-double"],
		// Enforce one space after key in object
		"key-spacing": [2, {
			"beforeColon": false,
			"afterColon": true
		}],
		// Enforce spacing before and after keywords
		"keyword-spacing": [2,{
			"before": true,
			"after": true
		}],
		// Enforce unix-style line endings
		"linebreak-style": [2, "unix"],
		// Enforce spaces before comment blocks and allow comments at the beginning of array and object declarations
		"lines-around-comment": [2, {
			"beforeBlockComment": true,
			"allowObjectStart": true,
			"allowArrayStart": true
		}],
		// Enforces maximum nesting level, need to check with team if we want to enforce this
		"max-depth": [1, 5],
		// Enforce a maximum line length of 100 characters, while treating tabs as 2 characters
		"max-len": [1, 100, 2],
		// Enforce a maximum of 10 levels of nested callbacks
		"max-nested-callbacks": 2,
		// Enforce a maximum of 5 arguments a function can accept
		"max-params": [2, 5],
		// Require a capital letter to instantiate a constructor
		"new-cap": 2,
		// Require parentheses when instantiating a constructor
		"new-parens": 2,
		// Require a blank line after variable definitions
		"newline-after-var": 2,
		// Disallow using the Array constructor to create arrays
		"no-array-constructor": 2,
		// Disallow bitwise opearators (e.g. var x = y & z)
		"no-bitwise": 2,
		// Disallow the use of continue statements
		"no-continue": 2,
		// Disallow a singular if statement inside of an else block in favor of using an else if statement
		"no-lonely-if": 2,
		// Disallow mixing of tabs and spaces, except for the purpose of alignment
		"no-mixed-spaces-and-tabs": [2, "smart-tabs"],
		// Disallow more than three blank lines in a row, and only allow 1 at the end of a file
		"no-multiple-empty-lines": [2, {
			// Disallow mixing of tabs and spaces, except for the purpose of alignment
			"max": 3,
			"maxEOF": 1
		}],
		// Disallow using negated conditions when the else branch is not empty
		"no-negated-condition": 2,
		// Disallow nested ternary expressions
		"no-nested-ternary": 2,
		// Disallow using the new Object constructor in favor of the object literal syntax var myObject = {};
		"no-new-object": 2,
		// Disallow the use of unary operators, ++ and -- unless they are used as iterators for a for loop
		"no-plusplus": [2, {
			"allowForLoopAfterthoughts": true
		}],
		// Disallow spaces between function name and parentheses (e.g function ())
		"no-spaced-func": 2,
		// Disallow trailing whitespace on lines
		"no-trailing-spaces": 2,
		// Disallow use of ternary assignment for variables
		"no-unneeded-ternary": [2, {
			"defaultAssignment": false
		}],
		// Require extra spaces inside objects
		"object-curly-spacing": [2, "always"],
		// Require quoting of object keys when necessary (e.g. var object = { "foo-bar": 5, bar: 2, foo: function() {}})
		"quote-props": [2, "as-needed"],
		// Require use of double quotes for string literals, unless they would require escaping (e.g. var string = 'The woman said "Hi!"';)
		"quotes": [2, "single", "avoid-escape"],
		// Require JSDoc comments for all functions
		"require-jsdoc": [2, {
			"require": {
				"FunctionDeclaration": true,
				"MethodDefinition": false,
				"ClassDeclaration": false
			}
		}],
		// Require space after semicolon, prevent space before semicolon
		"semi-spacing": 2,
		// Require semicolons after each new line
		"semi": [2, "always"],
		// Require space before blocks (e.g. if (a) {})
		"space-before-blocks": 2,
		// Disallow space before opening paren in function definitions
		"space-before-function-paren": [2, "never"],
		// Disallow spaces in parens
		"space-in-parens": 2,
		// Require space around infix operators (e.g. var foo = 1 + 2, not var foo = 1+2)
		"space-infix-ops": 2,
		// Require spaces around unary words like void, new, delete, disallow around nonwords like ++, --, !
		"space-unary-ops": 2,
		// Require spaces in comments (e.g. // This is a comment, not //This is a comment)
		"spaced-comment": [2, "always"],
		// Wrap regex in parens to make it clearer
		"wrap-regex": 2
	}
};
