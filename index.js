const overrideLog = require('./lib/log');
const overrideWarn = require('./lib/warn');
const overrideError = require('./lib/error');

const LOG_LEVEL = 1;
const WARN_LEVEL = 2;
const ERROR_LEVEL = 3;
const ALL_LEVEL = 4;

// eslint-disable-next-line max-len
const ERROR_MSG_MISSING_OPTION_URL = 'You must provide a default url for console-to-slack to work correctly.';

// eslint-disable-next-line max-len
const ERROR_MSG_MISSING_OPTION_CONSOLE_LEVEL = 'You must provide a console level for console-to-slack to work correctly (1 = console.log, 2 = console.warn, 3 = console.error, 4 = all).';

const slackWebhooks = () => {

	/**
	 * Initializes console-to-slack to send messages to Slack on console usage.
	 *
	 * @function init
	 *
	 * @since 0.1.0
	 * @access public
	 * @memberOf console-to-slack
	 *
	 * @param {string} url           The default url to send slack messages to.
	 * @param {number} consoleLevel  Level which indicates which console usage to override.
	 * @param {Object} options       The default initialization options.
	 */
	function init(url, consoleLevel, options = {}) {

		// Setup the default url
		if (!url) {
			throw new Error(ERROR_MSG_MISSING_OPTION_URL);
		}

		// Setup the overrides depending on the chosen level
		if (consoleLevel === LOG_LEVEL) {

			overrideLog(url, options);

		} else if (consoleLevel === WARN_LEVEL) {

			overrideWarn(url, options);

		} else if (consoleLevel === ERROR_LEVEL) {

			overrideError(url, options);

		} else if (consoleLevel === ALL_LEVEL) {

			overrideLog(url, options);
			overrideWarn(url, options);
			overrideError(url, options);

		} else {

			throw new Error(ERROR_MSG_MISSING_OPTION_CONSOLE_LEVEL);

		}

	}

	return {
		init
	};

};

module.exports = slackWebhooks();
