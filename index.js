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
	 * @function publicInit
	 *
	 * @since 0.0.2
	 * @access public
	 * @memberOf console-to-slack
	 * @param {string} url           The default url to send slack messages to.
	 * @param {number} consoleLevel  Level which indicates which console usage to override.
	 * @param {Object} options       Options configurable by the user.
	 */
	function publicInit(url, consoleLevel, options) {

		// Setup the default url
		if (!url) {
			console.warn('A url is required for console-to-slack to work correctly.');
			return;
		}

		defaultUrl = url;

		// Setup the passed-in options
		if (options && options.name) {
			name = options.name;
		}

		if (options && options.channels) {
			channels = options.channels;
		}

		console.log(consoleLevel);

		// Setup the overrides depending on the chosen level
		if (consoleLevel === LOG_LEVEL) {
			privateOverrideLog();
		} else if (consoleLevel === WARN_LEVEL) {
			privateOverrideWarn();
		} else if (consoleLevel === ERROR_LEVEL) {
			privateOverrideError();
		} else if (consoleLevel === ALL_LEVEL) {
			privateOverrideLog();
			privateOverrideWarn();
			privateOverrideError();
		// Default is to do nothing
		} else {
			console.warn('By default no console usage will be sent to Slack. Please provide a desired console level.');
		}

	}

	/**
	 * Overrides console.log to send the log messages to Slack via webhooks.
	 * Note: Original console.log behaves as normal
	 *
	 * @function privateOverrideLog
	 *
	 * @since 0.0.2
	 * @access public
	 * @memberOf console-to-slack
	 */
	function privateOverrideLog() {

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
	 * @function publicOverrideWarn
	 *
	 * @since 0.0.2
	 * @access public
	 * @memberOf console-to-slack
	 */
	function privateOverrideWarn() {

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
	 * @function publicOverrideError
	 *
	 * @since 0.0.1
	 * @access public
	 * @memberOf console-to-slack
	 */
	function privateOverrideError() {

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
		init: publicInit
	};

};

module.exports = slackWebhooks();
