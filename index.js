const request = require('request');

const slackWebhooks = (options) => {

	const defaultUrl = options.defaultUrl;
	const name = options.name;
	const channels = options.channels;

	/**
	 * Overrides console.log to send the log messages to Slack via webhooks.
	 * Note: Original console.log behaves as normal
	 *
	 * @function publicOverrideConsoleLog
	 *
	 * @since 0.0.2
	 * @access public
	 * @memberOf console-to-slack
	 */
	function publicOverrideConsoleLog() {

		const originalConsoleLog = console.log;

		console.log = (message) => {

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

			const requestBody = {
				url: slackWebhookUrl,
				method: 'POST',
				body: slackMessageBody,
				json: true
			};

			request(requestBody, () => {});

			originalConsoleLog(message);

		};

	}

	/**
	 * Overrides console.warn to send the warn messages to Slack via webhooks.
	 * Note: Original console.warn behaves as normal
	 *
	 * @function publicOverrideConsoleWarn
	 *
	 * @since 0.0.2
	 * @access public
	 * @memberOf console-to-slack
	 */
	function publicOverrideConsoleWarn() {

		const originalConsoleWarn = console.warn;

		console.warn = (message) => {

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

			const requestBody = {
				url: slackWebhookUrl,
				method: 'POST',
				body: slackMessageBody,
				json: true
			};

			request(requestBody, () => {});

			originalConsoleWarn(message);

		};

	}

	/**
	 * Overrides console.error to send the error messages to Slack via webhooks.
	 * Note: Original console.error behaves as normal
	 *
	 * @function publicOverrideConsoleError
	 *
	 * @since 0.0.1
	 * @access public
	 * @memberOf console-to-slack
	 */
	function publicOverrideConsoleError() {

		const originalConsoleError = console.error;

		console.error = (err) => {

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

			// Have support for errors that are both strings and objects
			if (typeof err === 'string') {
				attachment.pretext += `*CustomError*: ${err}\n`;
			} else {
				attachment.pretext += `*${err.name}*: ${err.message}\n`;
				attachment.text = `\`\`\`${err.stack}\`\`\``;
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

			const requestBody = {
				url: slackWebhookUrl,
				method: 'POST',
				body: slackMessageBody,
				json: true
			};

			request(requestBody, () => {});

			originalConsoleError(err);

		};

	}

	/**
	 * Overrides console.log, console.warn, and console.error to send messages to Slack via webhooks.
	 * Note: Original console.log, console.warn, and console.error behave as normal
	 *
	 * @function publicOverrideAll
	 *
	 * @since 0.0.2
	 * @access public
	 * @memberOf console-to-slack
	 */
	function publicOverrideAll() {
		publicOverrideConsoleLog();
		publicOverrideConsoleWarn();
		publicOverrideConsoleError();
	}

	return {
		overrideAll: publicOverrideAll,
		overrideConsoleLog: publicOverrideConsoleLog,
		overrideConsoleWarn: publicOverrideConsoleWarn,
		overrideConsoleError: publicOverrideConsoleError
	};

};

module.exports = slackWebhooks;
