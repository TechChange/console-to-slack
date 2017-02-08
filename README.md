console-to-slack
==========================

NPM module for integrating with Slack webhooks. Currently supports overriding console.log, console.warn, and console.error to send messages to Slack.

## Installation
```
npm install console-to-slack
```

## Usage
Include this module:
```javascript
const consoleToSlack = require('console-to-slack')(options);
```

You can use the following methods:

- **consoleToSlack.overrideAll**: Overrides console.log, console.warn, and console.error to send messages to Slack via webhooks.
- **consoleToSlack.overrideConsoleLog**: Overrides console.log to send error messages to Slack via webhooks.
- **consoleToSlack.overrideConsoleWarn**: Overrides console.warn to send error messages to Slack via webhooks.
- **consoleToSlack.overrideConsoleError**: Overrides console.error to send error messages to Slack via webhooks.

Ensure that Slack incoming webhooks are setup for your team and channel, which you can find more information about here: https://api.slack.com/incoming-webhooks

#### Options
For console-to-slack to work correctly, the following fields are available to be passed in via options:

- **options.defaultUrl (required)**: The url of the default slack thread to send messages to.
- **options.name (optional)**: The name of the service. This is necessary to help distinguish the location of the Slack message.
- **options.channels (optional)**: Can customize channels for log, warn, and error via slack channel name and/or url. If name and url is not specified for log, warn, or error, the messages will be sent to the default url.

Example:

```javascript
const options = {
	defaultUrl: 'https://hooks.slack.com/services/AAAAAAAAA/BBBBBBBBB/CCCCCCCCCCCCCCCCCCCCCCCC',
	name: 'My Example Service',
	channels: {
		log: {
			name: '#console_log',
			url: 'https://hooks.slack.com/services/AAAAAAAAA/BBBBBBBBB/CCCCCCCCCCCCCCCCCCCCCCCC'
		},
		warn: {
			name: '#console_warn',
			url: 'https://hooks.slack.com/services/AAAAAAAAA/BBBBBBBBB/CCCCCCCCCCCCCCCCCCCCCCCC'
		},
		error: {
			name: '#console_error',
			url: 'https://hooks.slack.com/services/AAAAAAAAA/BBBBBBBBB/CCCCCCCCCCCCCCCCCCCCCCCC'
		}
	}
}
```

#### Important Notes

1. You will still see the normal console.log, console.warn, and console.error behavior, in addition to the slack error messages via webhooks.

## Changelog
- **0.0.2**:
	- ADDED: Support for console.log and console.warn.
	- ADDED: Greater customization options to specify channel names and urls.
- **0.0.1**: Initial commit
