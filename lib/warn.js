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
 * @param {string} defaultUrl      The default url to send slack messages to.
 * @param {Object} defaultOptions  The default initialization options.
 */
const overrideWarn = (defaultUrl, defaultOptions) => {

	let slackWebhookUrl = defaultUrl;

	let name;
	let channels;

	// Setup the passed-in options for the slack server name
	if (defaultOptions && defaultOptions.name) {
		name = defaultOptions.name;
	}

	// Setup the passed-in options for the slack channels
	if (defaultOptions && defaultOptions.channels) {
		channels = defaultOptions.channels;
	}

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

};

module.exports = overrideWarn;
