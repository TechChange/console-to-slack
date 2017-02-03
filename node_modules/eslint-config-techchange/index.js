module.exports = {
	"parser-options": {
		"ecmaVersion": 6,
	},
	"env": {
		"node": true,
		"mocha": true,
		"browser": true,
		"es6": true
	},
	"extends": [
		"eslint-config-techchange/rules/possible-errors",
		"eslint-config-techchange/rules/best-practices",
		"eslint-config-techchange/rules/variables",
		"eslint-config-techchange/rules/node",
		"eslint-config-techchange/rules/es6",
		"eslint-config-techchange/rules/strict",
		"eslint-config-techchange/rules/style"
	]
};
