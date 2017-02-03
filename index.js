const request = require('request');

const slackWebhooks = (settings) => {

	const slackWebhookUrl = settings.slackWebhookUrl;
	const name = settings.name;

	/**
	 * Overrides console.error to send error messages to Slack via webhooks.
	 *
	 * @function publicOverrideConsoleError
	 *
	 * @since 0.0.1
	 * @access public
	 * @memberOf slack-webhook
	 */
	function publicOverrideConsoleError() {

		const originalConsoleError = console.error;

		// Override node's global console.error() function to send error messages to Slack
		console.error = (err) => {

			const attachment = {
				fallback: 'Sorry, but I can\'t display the stack trace for you...',
				color: '#990000',
				mrkdwn_in: ['pretext', 'text']
			};

			if (typeof err === 'string') {
				attachment.pretext = `*Location*: ${name}\n*CustomError*: ${err}\n`;
			} else {
				attachment.pretext = `*Location*: ${name}\n*${err.name}*: ${err.message}\n`;
				attachment.text = `\`\`\`${err.stack}\`\`\``;
			}

			const requestBody = {
				url: slackWebhookUrl,
				method: 'POST',
				body: { attachments: [attachment] },
				json: true
			};

			request(requestBody, () => {});

			originalConsoleError(err);

		};

	}

	return {
		overrideConsoleError: publicOverrideConsoleError
	};

};

module.exports = slackWebhooks;
