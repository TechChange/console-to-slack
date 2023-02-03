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
 * @param {string} defaultUrl      The default url to send slack messages to.
 * @param {Object} defaultOptions  The default initialization options.
 */
const overrideLog = (defaultUrl, defaultOptions) => {

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

};

module.exports = overrideLog;
