module.exports = {
	"rules": {
		// Disallow deletion of variables as only object properties can be deleted
		"no-delete-var": 2,
		// Disallow overwriting global object properties
		"no-shadow-restricted-names": 2,
		// Disallow a variable from sharing the same name as a variable in its containing scope
		"no-shadow": 2,
		// Disallow explicit variable definition to undefined
		"no-undef-init": 2,
		// Disallow undefined variables unless declared in a global comment
		"no-undef": 2,
		// Disallow declaring variables that are never used
		"no-unused-vars": [2, {
			"varsIgnorePattern": "React"
		}],
		// Disallow variable declaration before use (this will be standard in ES6)
		"no-use-before-define": [2, "nofunc"]
	}
};
