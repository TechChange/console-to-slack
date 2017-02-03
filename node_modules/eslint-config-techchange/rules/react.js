module.exports = {
	"rules": {
		// Don't allow displayName parameters, but require the component to be named by reference.
		"react/display-name": [2, {
			"acceptTranspilerName": true
		}],
		// Allow all prop types at this time.
		"react/forbid-prop-types": 0,
		// Enforce boolean attributes notation No need for <Component variable={true} />.
		// Just do <Component variable />.
		"react/jsx-boolean-value": [2, "never"],
		// Require closing brackets to be located immediately following the last prop.
		"react/jsx-closing-bracket-location": [2, "after-props"],
		// Don't allow spaces between curly braces in JSX attributes.
		"react/jsx-curly-spacing": [2, "never"],
		// Ensure correct prefixing of event handlers in JSX.
		"react/jsx-handler-names": [1, {
			"eventHandlerPrefix": "handle",
			"eventHandlerPropPrefix": "on"
		}],
		// Require a tab indentation in props.
		"react/jsx-indent-props": [2, "tab"],
		// Require tab indentations in all JSX components
		"react/jsx-indent": [2, "tab"],
		// Require key props to be used.
		"react/jsx-key": 2,
		// Limit number of props on a single line in JSX to 1
		"react/jsx-max-props-per-line":[2, {
			"maximum": 1
		}],
		// Allow arrow functions and binding because "premature optimization is the root of all evil"
		// or at least because it messes with HMR. (h/t Donald Knuth via Gabe Isman)
		"react/jsx-no-bind": 0,
		// Don't allow duplicate props in the same component
		"react/jsx-no-duplicate-props": 2,
		// Don't allow unwrapped strings
		"react/jsx-no-literals": 2,
		// Don't allow undeclared variables in JSX
		"react/jsx-no-undef": 2,
		// PascalCase for all components
		"react/jsx-pascal-case": 2,
		// Don't require prop types to be sorted in any particular order
		"react/jsx-sort-prop-types": 0,
		// Don't require props to be sorted in any particular order.
		"react/jsx-sort-props": 0,
		// Allow react to be called and not cause errors.
		"react/jsx-uses-react": 2,
		// Allow JSX variables to be marked as used
		"react/jsx-uses-vars": 2,
		// Don't allow problematic JSX properties
		// More here https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
		"react/no-danger": 0,
		// Don't allow deprecated React practices
		"react/no-deprecated": [2, {
			"react": "0.14.0"
		}],
		// Prevent setState in componentDidMount
		"react/no-did-mount-set-state": [2, "allow-in-func"],
		// Prevent setState in componentDidUpdate
		"react/no-did-update-set-state": [2, "allow-in-func"],
		// Don't allow the state to be mutated. Ever.
		"react/no-direct-mutation-state": 2,
		// Don't allow "isMounted()" calls.
		"react/no-is-mounted": 2,
		// DISABLING, THERE ARE TIMES WHEN THIS SHOULD BE ALLOWED
		// Only allow one component to be defined per file.
		"react/no-multi-comp": 0,
		// Allow local state to be changed, even though we're using Redux.
		"react/no-set-state": 0,
		// Don't allow string references.
		"react/no-string-refs": 2,
		// Don't allow unknown properties.
		"react/no-unknown-property": 2,
		// Only allow ES6 classes.
		"react/prefer-es6-class": [2, "always"],
		// Require prop types to be defined.
		"react/prop-types": 2,
		// Prevent React not being defined when using JSX
		"react/react-in-jsx-scope": 2,
		// Only allows .js extensions
		"react/require-extension": [2, {
			"extensions": [".js"]
		}],
		// Don't allow extra closing tags for components without children.
		"react/self-closing-comp": 2,
		// Require a certain organization of methods. Sure! Why not?!
		// Borrowed from AirBNB. https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react.js#L121
		"react/sort-comp": [1, {
			"order": [
				"lifecycle",
				"/^on.+$/",
				"/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/",
				"everything-else",
				"/^render.+$/",
				"render"
			]
		}],
		// Require multiline JSX to be wrapped in parathenticals.
		"react/wrap-multilines": 2
	}
};
