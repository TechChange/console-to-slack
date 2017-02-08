var request = require('request');

var slackWebhooks = function() {

	var LOG_LEVEL = 1;
	var WARN_LEVEL = 2;
	var ERROR_LEVEL = 3;
	var ALL_LEVEL = 4;

	var defaultUrl;
	var name;
	var channels;

	/**
	 * Initializes console-to-slack to send messages to Slack on console usage.
	 *
	 * @function init
	 *
	 * @since 0.0.2
	 * @access public
	 * @memberOf console-to-slack
	 * @param {string} url           The default url to send slack messages to.
	 * @param {number} consoleLevel  Level which indicates which console usage to override.
	 * @param {Object} options       Options configurable by the user.
	 */
	function init(url, consoleLevel, options) {

		// Setup the default url
		if (!url) {
			throw new Error('You must provide a default url for console-to-slack to work correctly.');
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
			throw new Error('You must provide a console level for console-to-slack to work correctly (1 = console.log, 2 = console.warn, 3 = console.error, 4 = all).');
		}

	}

	/**
	 * Overrides console.log to send the log messages to Slack via webhooks.
	 * Note: Original console.log behaves as normal
	 *
	 * @function _overrideLog
	 *
	 * @since 0.0.2
	 * @access public
	 * @memberOf console-to-slack
	 */
	function _overrideLog() {

		var originalConsoleLog = console.log;

		console.log = function(message) {

			var slackMessageBody = {
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

			var slackWebhookUrl = defaultUrl;

			// Allow slack webhook url override
			if (channels && channels.log && channels.log.url) {
				slackWebhookUrl = channels.log.url;
			}

			var requestBody = {
				url: slackWebhookUrl,
				method: 'POST',
				body: slackMessageBody,
				json: true
			};

			request(requestBody, function() {});

			originalConsoleLog(message);

		};

	}

	/**
	 * Overrides console.warn to send the warn messages to Slack via webhooks.
	 * Note: Original console.warn behaves as normal
	 *
	 * @function _overrideWarn
	 *
	 * @since 0.0.2
	 * @access public
	 * @memberOf console-to-slack
	 */
	function _overrideWarn() {

		var originalConsoleWarn = console.warn;

		console.warn = function(message) {

			var slackMessageBody = {
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

			var slackWebhookUrl = defaultUrl;

			// Allow slack webhook url override
			if (channels && channels.warn && channels.warn.url) {
				slackWebhookUrl = channels.warn.url;
			}

			var requestBody = {
				url: slackWebhookUrl,
				method: 'POST',
				body: slackMessageBody,
				json: true
			};

			request(requestBody, function() {});

			originalConsoleWarn(message);

		};

	}

	/**
	 * Overrides console.error to send the error messages to Slack via webhooks.
	 * Note: Original console.error behaves as normal
	 *
	 * @function _overrideError
	 *
	 * @since 0.0.1
	 * @access public
	 * @memberOf console-to-slack
	 */
	function _overrideError() {

		var originalConsoleError = console.error;

		console.error = function(err) {

			var attachment = {
				fallback: 'Sorry, but I can\'t display the stack trace for you...',
				pretext: '',
				color: '#990000',
				mrkdwn_in: ['pretext', 'text']
			};

			// Allow optional name of service
			if (name) {
				attachment.pretext += `*Location*: ${name}\n`;
			}

			// Have support for errors that are both strings and objects
			if (typeof err === 'string') {
				attachment.pretext += `*CustomError*: ${err}\n`;
			} else {
				attachment.pretext += `*${err.name}*: ${err.message}\n`;
				attachment.text = `\`\`\`${err.stack}\`\`\``;
			}

			var slackMessageBody = {
				attachments: [attachment],
				username: 'CONSOLE.ERROR'
			};

			// Allow slack channel override
			if (channels && channels.error && channels.error.name) {
				slackMessageBody.channel = channels.error.name;
			}

			var slackWebhookUrl = defaultUrl;

			// Allow slack webhook url override
			if (channels && channels.error && channels.error.url) {
				slackWebhookUrl = channels.error.url;
			}

			var requestBody = {
				url: slackWebhookUrl,
				method: 'POST',
				body: slackMessageBody,
				json: true
			};

			request(requestBody, function() {});

			originalConsoleError(err);

		};

	}

	return {
		init
	};

};

module.exports = slackWebhooks();
