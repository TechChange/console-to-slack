module.exports = {
	"rules": {
		// Enforce corresponding getters and setters in objects
		"accessor-pairs": 2,
		// Disallow var reference outside of scope
		"block-scoped-var": 2,
		// Limit the paths through a function to five at max
		"complexity": [1, 5],
		// Ensure that the type of returns is consistent (i.e. boolean, object, etc)
		"consistent-return": 2,
		// Always require curly braces
		"curly": 2,
		// Require default case in switch statements
		"default-case": 2,
		// Require dot notation to access properties where appropriate
		"dot-notation": [2, {
			// Allow underscores when interacting with external API
			"allowPattern": "^[a-z]+(_[a-z]+)+$"
		}],
		// Enforce safe comparisons with === and !==
		"eqeqeq": 2,
		// Require for in on non-prototype inherited properties
		"guard-for-in": 2,
		// Disallow alert(), confirm(), prompt()
		"no-alert": 2,
		// Disallow arguments.caller and arguments.callee as they have been depreciated
		"no-caller": 2,
		// Disallow regexes that look like division
		"no-div-regex": 2,
		// Disallow else statements with return if not needed
		"no-else-return": 2,
		// Disallow unsafe comparison with null (e.g. if (foo == null) )
		"no-eq-null": 2,
		// Disallow the use of eval()
		"no-eval": 2,
		// Disallow extending native objects
		"no-extend-native": 2,
		// Warn when .bind() used and this not referenced or not needed
		"no-extra-bind": 2,
		// Enforce commenting of switch case fallthroughs
		"no-fallthrough": 2,
		// Warn when decimals are unbalanced (e.g. 2. or .8 should be 2.0 or 0.8)
		"no-floating-decimal": 2,
		// Warn for fancy coercions that can be hard to read
		"no-implicit-coercion": 2,
		// Disallow passing strings to setInterval and setTimeout
		"no-implied-eval": 2,
		// Disallow using this outside of context
		"no-invalid-this": 2,
		// Disallow obsolete use of __iterator__
		"no-iterator": 2,
		// Disallow using labels in switch statements
		"no-labels": 2,
		// Disallow function declarations in loops
		"no-loop-func": 2,
		// Disallow multiple unnecessary spaces
		"no-multi-spaces": 2,
		// Disallow reassignment of native objects
		"no-native-reassign": 2,
		// Disallow Function declaration using new
		"no-new-func": 2,
		// Disallow new with String, Number, Boolean
		"no-new-wrappers": 2,
		// Disallow using new without assignment
		"no-new": 2,
		// Octal escape characters have been depreciated in favor of their unicode counterparts
		"no-octal-escape": 2,
		// Disallow octal literals
		"no-octal": 2,
		// Disallow reassignment of function parameters
		"no-param-reassign": 2,
		// Disallow using process.env in node environments in favor of using config files
		"no-process-env": 1,
		// Disallow use of depreciated __proto__
		"no-proto": 2,
		// Disallow redeclaration of existing variables and global variables
		"no-redeclare": [2, {
			"builtinGlobals": true
		}],
		// Disallow the use of assignments in return statements
		"no-return-assign": 2,
		// Disallow the use of javascript: in URLs (considered by some to be a form of eval)
		"no-script-url": 2,
		// Disallow comparisons with self, if (x === x)
		"no-self-compare": 2,
		// Disallow including multiple expressions using a comma when only one is expected
		"no-sequences": 2,
		// Disallow throwing of anything other than Error objects (for the most part)
		"no-throw-literal": 2,
		// Disallow expressions without assignment or execution, but allow in certain cases
		"no-unused-expressions": [2, {
			"allowShortCircuit": true,
			"allowTernary": true
		}],
		// Disallow calling call() and apply() when normal invocation will suffice
		"no-useless-call": 2,
		// Disallow concatenation of two strings when not needed (var foo = "a" + "b")
		"no-useless-concat": 2,
		// Disallow the use of void operator as it can lead to confusion
		"no-void": 2,
		// Disallow with statements, which are not allowed in strict mode
		"no-with": 2,
		// Force parseInt() functions to include the second argument (radix) to prevent incorrect interpretation
		"radix": 2,
		// Require parentheses for all immediately invoked function expressions (This may be up for debate)
		"wrap-iife": [2, "inside"],
		// Disallow Yoda conditions where the literal is on the left side of an expression (e.g. if ("red" === color))
		"yoda": 2
	}
};
