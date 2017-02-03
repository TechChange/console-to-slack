module.exports = {
	"rules": {
		// Require return with callback when multiple callbacks included in a function
		"callback-return": 2,
		// Require require() statements to be at the top-level of module scope
		"global-require": 1,
		// Require error handling in callbacks using the "err or error" argument
		"handle-callback-err": [2, "^(err|error)$"],
		// Warn if require() variables are declared with other non-require() variables
		"no-mixed-requires": 1,
		// Disallow using the new keyword with require() function
		"no-new-require": 2,
		// Disallow string concatenation using __dirname or __filename as using path.join() and path.resolve() are safer across systems
		"no-path-concat": 2,
		// Disallow the use of process.exit() as throw new Error("Message") allows other parts of the application to handle the error
		"no-process-exit": 2,
		// Warn when using synchronous versions of modules where an asynchronous version exists
		"no-sync": 1
	}
}
