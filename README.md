console-to-slack
==========================

NPM module for integrating with Slack webhooks. Currently supports overriding console.log, console.warn, and console.error to send messages to Slack.

## Installation

```
npm install console-to-slack
```

Ensure that Slack incoming webhooks are setup for your team and channel, which you can find more information about here: https://api.slack.com/incoming-webhooks

## Usage

Include this module:
```javascript
var consoleToSlack = require('console-to-slack');
```

You can use the following methods:

- **consoleToSlack.init( defaultUrl, consoleLevel, options )**
	- **defaultUrl (required)**: The url of the default slack thread to send messages to.
	- **consoleLevel (required)**: The console level (1 - 4) which specifies which console usage to override. Default is to not override anything.
		- 1 = console.log
		- 2 = console.warn
		- 3 = console.error
		- 4 = all
	- **options (optional)**: An object to pass in optional parameters, as described below.

```javascript
var slackUrl = 'https://hooks.slack.com/services/AAAAAAAAA/BBBBBBBBB/CCCCCCCCCCCCCCCCCCCCCCCC';

consoleToSlack.init(slackUrl, 3);
```

#### Options

The following fields are available to be passed in via options:

- **options.name**: The name of the service. This is necessary to help distinguish the location of the Slack message.
- **options.channels**: Can customize channels for log, warn, and error via slack channel name and/or url. If name and url is not specified for log, warn, or error, the messages will be sent to the default url.

Example:

```javascript
var options = {
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

1. You will still see the normal console.log, console.warn, and console.error behavior, in addition to the slack messages.

## Changelog
- **0.2.0**
	- ADDED: Support for ignoring slack messages for individual uses of `console.log()`, `console.warn()`, and `console.error()`.
	- FIXED: Switch from the DEPRECATED `request` library to the `axios` library for API requests.
- **0.1.2**:
	- FIXED: Explicit check for the error being an object before referencing its properties.
- **0.1.1**:
	- ADDED: Support for finding strack trace in errors recursively.
- **0.1.0**:
	- ADDED: Support for console.log and console.warn.
	- ADDED: Greater customization options to specify channel names and urls.
- **0.0.1**: Initial commit
