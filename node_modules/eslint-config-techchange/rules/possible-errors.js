module.exports = {
	"rules": {
		// Disallow variable assignment in conditionals
		"no-cond-assign": 2,
		// Disallow use of constant expressions in conditionals
		"no-constant-condition": 2,
		// Disallow control characters in regexs
		"no-control-regex": 2,
		// Disallow debugger
		"no-debugger": 2,
		// Disallow duplicate params in function declarations
		"no-dupe-args": 2,
		// Disallow duplicate keys in object literals
		"no-dupe-keys": 2,
		// Disallow duplicate case labels in switch statements
		"no-duplicate-case": 2,
		// Disallow empty character class in regex
		"no-empty-character-class": 2,
		// Disallow empty block statements
		"no-empty": 2,
		// Disallow assignment of the exception parameter
		"no-ex-assign": 2,
		// Disallow extra boolean casts in conditionals (e.g. if (!!bar) {)
		"no-extra-boolean-cast": 2,
		// Disallow extra semi-colons
		"no-extra-semi": 2,
		// Disallow reassignment of function declaration
		"no-func-assign": 2,
		// Disallow invalid regex
		"no-invalid-regexp": 2,
		// Disallow non-space/tab whitespace
		"no-irregular-whitespace": 2,
		// Disallow negated left operand of in operator
		"no-negated-in-lhs": 2,
		// Disallow global object function calls (e.g. JSON() or Math())
		"no-obj-calls": 2,
		// Disallow multiple plain spaces in regexes
		"no-regex-spaces": 2,
		// Disallow empty slots in arrays (e.g. [1,,2])
		"no-sparse-arrays": 2,
		// Disallow code that has no ability to be executed
		"no-unreachable": 2,
		// Disallow comparison against NaN without isNan()
		"use-isnan": 2,
		// Ensure JSDoc comments are syntactically correct
		"valid-jsdoc": [2, {
			// Prefer @returns to @return
			"prefer": {
				"return": "returns",
			},
			// Do not require a description for @returns
			"requireReturn": false
		}],
		// Validates string comparison of typeof for errors
		"valid-typeof": 2,
		// Disallow multi-line expressions without semi-colons
		"no-unexpected-multiline": 2
	}
};
