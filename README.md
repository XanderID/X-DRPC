# X-Discord Rich Presence

A customizable **Discord self-bot** that sets your [Rich Presence](https://discord.com/developers/docs/rich-presence/how-to) with support for external assets, buttons, timestamps, and more.

> [!CAUTION]
>
> **When using these projects, you accept the risk of exposing your Discord Token.**
>
> This project runs a self-bot — which is against [Discord’s Terms of Service](https://discord.com/terms). While it may work fine for personal use, you can be banned at any time.
>
> **I am not responsible** if your account is disabled, banned, or restricted.
>
> That said, I've used this personally without issue — **use at your own risk**.

## Features

- Rich Presence powered by [`discord.js-selfbot-v13`](https://github.com/aiko-chan-ai/discord.js-selfbot-v13)
- Supports:
  - External image URLs (auto-converted to `external_asset_path`)
  - Timestamps (start & end)
  - Buttons, party, secrets
- Lightweight keep-alive server
- Realtime update by editing config or presence files
- Colorful logging
- Supports multiple presence profiles
- Support Presence Validator
- Realtime changing presence
- Online 24/7

## Installation

![Terminal](https://raw.githubusercontent.com/XanderID/X-DRPC/main/.assets/terminal.png)

```bash
git clone https://github.com/xanderid/X-DRPC
cd X-DRPC
npm install
```

Then start the bot with your selected presence profile:

```bash
npm start
```

- The bot loads a presence configuration file based on the `presence` ID set in `config.js`.
- For example, if your config has `presence: "game"`, it will look for a file in the `presence/` folder (like `game.js`) whose `id` matches `"game"` and use that file to set your Discord Rich Presence.

## Configuration

Edit the `config.js` file in the root directory:

```js
export const config = {
  keep_alive: {
    // Enable or disable the keep-alive server (useful for hosting platforms)
    enable: true,
    // Port number on which the keep-alive server listens
    port: 3000,
  },
  // Discord token for user login (keep it secret!)
  discord_token: "",
  // Discord Application ID for Rich Presence integration
  application_id: "",
  // Presence ID to load from presence collection
  // You can change this when X-DRPC is running.
  presence: "game",
  // Enable automatic Rich Presence update when saving changes to the configuration in the Presence folder
  update_save: false,
};
```

## Realtime Update Support

This project supports realtime Rich Presence updates only if you enable `update_save: true` in your `config.js`.

Any change saved to your `config.js` or `presence/name.js` will automatically update your presence on Discord.

No restarts needed. Just save the file!

## Example Presence

![Game Presence](https://raw.githubusercontent.com/XanderID/X-DRPC/main/.assets/game.png)

You can create presence files inside a `presence/` folder.
Example `presence/game.js`:

```js
import { ActivityTypes, PlatformType } from "../client/type.js";

export const presence = {
  id: 'game',
  name: "Example Game",
  type: ActivityTypes.PLAYING,
  details: "Exploring the world",
  state: "Level 5 | Forest Zone",
  buttons: [
    { label: "View Website", url: "https://examplegame.com" },
    { label: "Join Community", url: "https://discord.gg/example" }
  ],
  platform: PlatformType.DESKTOP
};

```

For a complete example setup, [Visit](https://github.com/XanderID/X-DRPC/blob/main/src/presence)

## Contributing

Contributions are welcome! Please open issues and pull requests on GitHub.

## License

Distributed under the Apache 2.0 License.
