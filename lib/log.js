const axios = require('axios').default;

/**
 * Overrides console.log to send the log messages to Slack via webhooks.
 *
 * Note: Original console.log behaves as normal
 *
 * @function overrideLog
 *
 * @since 0.1.0
 * @access private
 * @memberOf console-to-slack
 *
 * @param {string} defaultUrl   The default webhook url to send slack messages to.
 * @param {string} defaultName  The default service name.
 *
 * @param {object} channels           The override options.
 * @param {object} channels.log       The override options for "console.log" (if any).
 * @param {string} channels.log.name  The override service name for "console.log" (if any).
 * @param {string} channels.log.url   The override webhook url for "console.log" (if any).
 */
const overrideLog = (defaultUrl, defaultName, channels = {}) => {

	// Create a copy of the original console.log() method
	const originalConsoleLog = console.log;

	// Override the console.log() method
	console.log = (message, options = {}) => {

		originalConsoleLog(message);

		try {

			if (!options.ignoreSlack) {

				let slackWebhookUrl = defaultUrl;

				const slackMessageBody = {
					username: 'CONSOLE.LOG',
					mrkdwn: true
				};

				// Allow optional name of service
				if (defaultName) {
					slackMessageBody.text += `*Location*: ${defaultName}\n`;
				}

				slackMessageBody.text += `*Message*: ${message}\n`;

				// Allow slack channel override
				if (channels.log && channels.log.name) {
					slackMessageBody.channel = channels.log.name;
				}

				// Allow slack webhook url override
				if (channels.log && channels.log.url) {
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

};

module.exports = overrideLog;
