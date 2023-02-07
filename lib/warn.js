const axios = require('axios').default;

/**
 * Overrides console.warn to send the warn messages to Slack via webhooks.
 *
 * Note: Original console.warn behaves as normal
 *
 * @function overrideWarn
 *
 * @since 0.1.0
 * @access private
 * @memberOf console-to-slack
 *
 * @param {string} defaultUrl   The default webhook url to send slack messages to.
 * @param {string} defaultName  The default service name.
 *
 * @param {object} channels            The override options.
 * @param {object} channels.warn       The override options for "console.warn" (if any).
 * @param {string} channels.warn.name  The override service name for "console.warn" (if any).
 * @param {string} channels.warn.url   The override webhook url for "console.warn" (if any).
 */
const overrideWarn = (defaultUrl, defaultName, channels = {}) => {

	// Create a copy of the original console.warn() method
	const originalConsoleWarn = console.warn;

	// Override the console.warn() method
	console.warn = (message, options = {}) => {

		originalConsoleWarn(message);

		try {

			if (!options.ignoreSlack) {

				let slackWebhookUrl = defaultUrl;

				const slackMessageBody = {
					username: 'CONSOLE.WARN',
					mrkdwn: true
				};

				// Allow optional name of service
				if (defaultName) {
					slackMessageBody.text = `*Location*: ${defaultName}\n`;
				}

				slackMessageBody.text += `*Message*: ${message}\n`;

				// Allow slack channel override
				if (channels.warn && channels.warn.name) {
					slackMessageBody.channel = channels.warn.name;
				}

				// Allow slack webhook url override
				if (channels.warn && channels.warn.url) {
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

};

module.exports = overrideWarn;
