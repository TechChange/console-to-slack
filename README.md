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
const tcSlackWebhooks = require('@techchange/slack-webhooks')(settings);
```

#### Settings
For slack webhooks to work, settings must include:

- **settings.slackWebhookUrl**: The url of the slack thread to send messages to.
- **settings.name**: The name of the service. This is necessary to distinguish the location of the Slack message.

#### Usage
You can utilize the following methods:

- **tcSlackWebhooks.overrideConsoleError**: Overrides console.error to send error messages to Slack via webhooks.

#### Important Notes

1. You will still see the normal console.error behavior, in addition to the slack error messages via webhooks.

## Changelog
- **0.0.2**:
	- ADDED: Support for console.log and console.warn.
	- ADDED: Greater customization options to specify channel names and urls.
- **0.0.1**: Initial commit
