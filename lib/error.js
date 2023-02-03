const axios = require('axios').default;

/**
 * Recursively searches an error for the stack trace.
 *
 * @function _findStackTrace
 *
 * @since 0.1.1
 * @access private
 * @memberOf console-to-slack
 *
 * @param {object} error  The error object.
 *
 * @returns {string} stack  The stack trace from the error.
 */
const _findStackTrace = (error) => {

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

};

/**
 * Parses an error to build appropriate response text for both
 * NodeJS (express/koa) API response errors and normal JavaScript errors.
 *
 * @function _parseErrorObject
 *
 * @since 1.1.0
 * @access private
 * @memberOf console-to-slack
 *
 * @param {object} error  The error object.
 *
 * @returns {string} stack  The stack trace from the error.
 *
 * @returns {object} result          The result.
 * @returns {string} result.pretext  The pretext message to send to Slack.
 * @returns {string} result.text     The text message to send to Slack.
 */
const _parseErrorObject = (error) => {

	let pretext = '', text = '';

	// Check if the error is a NodeJS (express/koa) API response error
	if (error.statusCode) {

		pretext += `*StatusCode*: ${error.statusCode}\n`;

		if (error.errorMessage) {
			pretext += `*ErrorMessage*: ${error.errorMessage}\n`;
		}

		if (error.userMessage) {
			pretext += `*UserMessage*: ${error.userMessage}\n`;
		}

		// Attempt to parse the error data array
		if (error.errors) {
			text += `${JSON.stringify(error.errors)}\n`;
		}

		// Attempt to parse the error stack trace
		const stackTrace = _findStackTrace(error);

		if (stackTrace) {
			text += `${stackTrace}\n`;
		}

	// Otherwise, assume it is a normal JavaScript error
	} else {

		pretext += `*${error.name}*: ${error.message}\n`;

		// Attempt to parse the error stack trace
		const stackTrace = _findStackTrace(error);

		if (stackTrace) {
			text = stackTrace;
		}

	}

	return {
		pretext,
		text,
	};

};

/**
 * Overrides console.error to send the error messages to Slack via webhooks.
 *
 * Note: Original console.error behaves as normal
 *
 * @function overrideError
 *
 * @since 0.1.0
 * @access private
 * @memberOf console-to-slack
 *
 * @param {string} defaultUrl   The default webhook url to send slack messages to.
 * @param {string} defaultName  The default service name.
 *
 * @param {object} channels             The override options.
 * @param {object} channels.error       The override options for "console.error" (if any).
 * @param {string} channels.error.name  The override service name for "console.error" (if any).
 * @param {string} channels.error.url   The override webhook url for "console.error" (if any).
 */
const overrideError = (defaultUrl, defaultName, channels = {}) => {

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
				if (defaultName) {
					attachment.pretext += `*Location*: ${defaultName}\n`;
				}

				// Check if the error is a string
				if (typeof err === 'string') {

					attachment.pretext += `*CustomError*: ${err}\n`;

				// Check if the error is an object
				} else if (typeof err === 'object') {

					const {
						pretext,
						text,
					} = _parseErrorObject(err);

					if (pretext) {
						attachment.pretext += pretext;
					}

					if (text) {
						attachment.text = `\`\`\`${text}\`\`\``;
					}

				}

				let slackWebhookUrl = defaultUrl;

				const slackMessageBody = {
					attachments: [attachment],
					username: 'CONSOLE.ERROR'
				};

				// Allow slack channel override
				if (channels.error && channels.error.name) {
					slackMessageBody.channel = channels.error.name;
				}

				// Allow slack webhook url override
				if (channels.error && channels.error.url) {
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

};

module.exports = overrideError;
