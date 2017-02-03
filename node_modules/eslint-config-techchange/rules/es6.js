module.exports = {
	"rules": {
		// DISABLED UNTIL MORE FLEXIBLE:
		// Require braces around arrow body when required
		"arrow-body-style": [0, "as-needed"],
		// Require parens around arrow-functions
		"arrow-parens": [2, "always"],
		// Require spaces before and after arrow-function declarations
		"arrow-spacing": 2,
		// Require super when necessary, warn when it is used inproperly
		"constructor-super": 2,
		// Enforce space before generator *, no space after (e.g. function *generator() {})
		"generator-star-spacing": 2,
		// Disallow arrow functions where the could be confused with comparison
		"no-confusing-arrow": 2,
		// Disallow modifying variables named as class declarations
		"no-class-assign": 2,
		// Disallow modifying variables declared as constants
		"no-const-assign": 2,
		// Disallow duplicate named class members
		"no-dupe-class-members": 2,
		// Disallow referencing this or super before super() call
		"no-this-before-super": 2,
		// Disallow use of var in favor of let and const. Need to discuss with team.
		"no-var": 1,
		// Require object literal shorthand definition. Need to discuss with team.
		"object-shorthand": 1,
		// Require use of arrow function notation in callbacks where appropriate. Need to discuss with team. Probably a good idea, but only in ES6 environments.
		"prefer-arrow-callback": 1,
		// Require use of const when let or var assigned and never modified. Need to discuss with team. Probably a good idea, but only in ES6 environments.
		"prefer-const": 1,
		// Require use of Reflect API where it can be used to replace older object methods. Needs configuration and need to discuss with team. Only applicable in ES6 environments
		"prefer-reflect": 1,
		// Require the use of the spread operator instead of using Function.prototype.apply() function. Need to discuss with team. Probably a good idea, but only in ES6 environments.
		"prefer-spread": 1,
		// Require use of template literals over string concatenation (e.g. var str = `Hello ${world}!`; rather than var str = "Hello " + world;). Need to discuss with team. Probably a good idea, but only in ES6 environments.
		"prefer-template": 1,
		// Require the use of yield expression in generator functions (without yield there is no reason to use a generator). Need to discuss with team. Probably a good idea, but only in ES6 environments
		"require-yield": 1
	}
};
