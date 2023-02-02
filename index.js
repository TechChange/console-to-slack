const axios = require('axios').default;

const LOG_LEVEL = 1;
const WARN_LEVEL = 2;
const ERROR_LEVEL = 3;
const ALL_LEVEL = 4;

// eslint-disable-next-line max-len
const ERROR_MSG_MISSING_OPTION_URL = 'You must provide a default url for console-to-slack to work correctly.';

// eslint-disable-next-line max-len
const ERROR_MSG_MISSING_OPTION_CONSOLE_LEVEL = 'You must provide a console level for console-to-slack to work correctly (1 = console.log, 2 = console.warn, 3 = console.error, 4 = all).';

const slackWebhooks = () => {

	let defaultUrl;
	let name;
	let channels;

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
	 * @param {Object} options       Options configurable by the user.
	 */
	function init(url, consoleLevel, options) {

		// Setup the default url
		if (!url) {
			throw new Error(ERROR_MSG_MISSING_OPTION_URL);
		}

		defaultUrl = url;

		// Setup the passed-in options
		if (options && options.name) {
			name = options.name;
		}

		if (options && options.channels) {
			channels = options.channels;
		}

		// Setup the overrides depending on the chosen level
		if (consoleLevel === LOG_LEVEL) {

			_overrideLog();

		} else if (consoleLevel === WARN_LEVEL) {

			_overrideWarn();

		} else if (consoleLevel === ERROR_LEVEL) {

			_overrideError();

		} else if (consoleLevel === ALL_LEVEL) {

			_overrideLog();
			_overrideWarn();
			_overrideError();

		} else {

			throw new Error(ERROR_MSG_MISSING_OPTION_CONSOLE_LEVEL);

		}

	}

	/**
	 * Overrides console.log to send the log messages to Slack via webhooks.
	 *
	 * Note: Original console.log behaves as normal
	 *
	 * @function _overrideLog
	 *
	 * @since 0.1.0
	 * @access private
	 * @memberOf console-to-slack
	 */
	function _overrideLog() {

		// Create a copy of the original console.log() method
		const originalConsoleLog = console.log;

		// Override the console.log() method
		console.log = (message, options = {}) => {

			originalConsoleLog(message);

			try {

				if (!options.ignoreSlack) {

					const slackMessageBody = {
						username: 'CONSOLE.LOG',
						mrkdwn: true
					};

					// Allow optional name of service
					if (name) {
						slackMessageBody.text = `*Location*: ${name}\n*Message*: ${message}\n`;
					} else {
						slackMessageBody.text = `*Message*: ${message}\n`;
					}

					// Allow slack channel override
					if (channels && channels.log && channels.log.name) {
						slackMessageBody.channel = channels.log.name;
					}

					let slackWebhookUrl = defaultUrl;

					// Allow slack webhook url override
					if (channels && channels.log && channels.log.url) {
						slackWebhookUrl = channels.log.url;
					}

					// Send the data to slack via an API call
					axios({
						method: 'POST',
						url: slackWebhookUrl,
						data: slackMessageBody,
					}).catch(() => {});

				}

			} catch (error) {
				originalConsoleLog(error);
			}

		};

	}

	/**
	 * Overrides console.warn to send the warn messages to Slack via webhooks.
	 * Note: Original console.warn behaves as normal
	 *
	 * @function _overrideWarn
	 *
	 * @since 0.1.0
	 * @access private
	 * @memberOf console-to-slack
	 */
	function _overrideWarn() {

		// Create a copy of the original console.warn() method
		const originalConsoleWarn = console.warn;

		// Override the console.warn() method
		console.warn = (message, options = {}) => {

			originalConsoleWarn(message);

			try {

				if (!options.ignoreSlack) {

					const slackMessageBody = {
						username: 'CONSOLE.WARN',
						mrkdwn: true
					};

					// Allow optional name of service
					if (name) {
						slackMessageBody.text = `*Location*: ${name}\n*Message*: ${message}\n`;
					} else {
						slackMessageBody.text = `*Message*: ${message}\n`;
					}

					// Allow slack channel override
					if (channels && channels.warn && channels.warn.name) {
						slackMessageBody.channel = channels.warn.name;
					}

					let slackWebhookUrl = defaultUrl;

					// Allow slack webhook url override
					if (channels && channels.warn && channels.warn.url) {
						slackWebhookUrl = channels.warn.url;
					}

					// Send the data to slack via an API call
					axios({
						method: 'POST',
						url: slackWebhookUrl,
						data: slackMessageBody,
					}).catch(() => {});

				}

			} catch (error) {
				originalConsoleWarn(error);
			}

		};

	}

	/**
	 * Overrides console.error to send the error messages to Slack via webhooks.
	 * Note: Original console.error behaves as normal
	 *
	 * @function _overrideError
	 *
	 * @since 0.1.0
	 * @access private
	 * @memberOf console-to-slack
	 */
	function _overrideError() {

		// Create a copy of the original console.error() method
		const originalConsoleError = console.error;

		// Override the console.error() method
		console.error = (err, options = {}) => {

			originalConsoleError(err);

			try {

				if (!options.ignoreSlack) {

					const attachment = {
						fallback: 'Sorry, but I can\'t display the stack trace for you...',
						pretext: '',
						color: '#990000',
						mrkdwn_in: ['pretext', 'text']
					};

					// Allow optional name of service
					if (name) {
						attachment.pretext += `*Location*: ${name}\n`;
					}

					// Check if the error is a string
					if (typeof err === 'string') {

						attachment.pretext += `*CustomError*: ${err}\n`;

					// Check if the error is an object
					} else if (typeof err === 'object') {

						// Check if the error is a NodeJS (express/koa) API response error
						if (err.statusCode) {

							attachment.pretext += `*${err.statusCode}*: ${err.errorMessage}\n`;

							let textBlock;

							if (err.userMessage) {
								textBlock = err.userMessage;
							}

							if (err.errors) {
								textBlock += `\n${err.errors}`;
							}

							if (textBlock) {
								attachment.text = `\`\`\`${textBlock}\`\`\``;
							}

						// Otherwise, assume it is a normal JavaScript error
						} else {

							attachment.pretext += `*${err.name}*: ${err.message}\n`;

							const stackTrace = _findStackTrace(err);

							if (stackTrace) {
								attachment.text = `\`\`\`${stackTrace}\`\`\``;
							}

						}

					}

					const slackMessageBody = {
						attachments: [attachment],
						username: 'CONSOLE.ERROR'
					};

					// Allow slack channel override
					if (channels && channels.error && channels.error.name) {
						slackMessageBody.channel = channels.error.name;
					}

					let slackWebhookUrl = defaultUrl;

					// Allow slack webhook url override
					if (channels && channels.error && channels.error.url) {
						slackWebhookUrl = channels.error.url;
					}

					// Send the data to slack via an API call
					axios({
						method: 'POST',
						url: slackWebhookUrl,
						data: slackMessageBody,
					}).catch(() => {});

				}

			} catch (error) {
				console.error(originalConsoleError);
			}

		};

	}

	/**
	 * Recursively searches an error for the stack trace.
	 *
	 * @function _findStackTrace
	 *
	 * @since 0.1.1
	 * @access private
	 * @memberOf console-to-slack
	 *
	 * @param {object}   error  The error object.
	 * @returns {string} stack  The stack trace from the error.
	 */
	function _findStackTrace(error) {

		let result = null;

		if (error) {

			if (error.stack) {
				return error.stack;
			}

			for (const prop in error) {

				if (error.hasOwnProperty(prop) &&
					typeof error[prop] === 'object') {

					result = _findStackTrace(error[prop]);

					if (result) {
						return result;
					}

				}

			}

		}

		return result;

	}

	return {
		init
	};

};

module.exports = slackWebhooks();
