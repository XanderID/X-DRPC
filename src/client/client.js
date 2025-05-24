import { Client, RichPresence } from "discord.js-selfbot-v13";
import { config } from "../config.js";
import { isURL } from "../libs/function.js";

let isReady = false;
const client = new Client();

/**
 * Check whether the Discord client is fully initialized and ready.
 *
 * @returns {boolean} True if the client is ready; otherwise, false.
 */
export function isClientReady() {
  return isReady;
}

/**
 * Initialize and start the Discord self-bot client.
 *
 * @returns {Promise<Client>} A promise that resolves with the ready Discord client instance.
 */
export async function startClient() {
  return new Promise((resolve, reject) => {
    client.on("ready", async () => {
      isReady = true;
      resolve(client);
    });

    client.on("disconnect", () => {
      isReady = false;
    });

    client.login(config.discord_token).catch(reject);
  });
}

/**
 * Set the rich presence (activity) for the Discord self-bot client.
 *
 * @param {RichPresence} presence - A configured RichPresence instance to set.
 */
export async function setPresence(presence) {
  client.user.setPresence({ activities: [presence] });
}

/**
 * Parse a raw presence input object into a RichPresence instance.
 * Automatically resolves image URLs via Discord's external asset system if needed.
 *
 * @param {object} raw - Raw presence data input.
 * @returns {Promise<RichPresence>} A fully configured RichPresence instance.
 */
export async function parsePresence(raw) {
  const applicationId = raw.application_id || config.application_id;
  const presence = new RichPresence(client)
    .setApplicationId(applicationId)
    .setName(raw.name)
    .setType(raw.type)
    .setPlatform(raw.platform || PlatformType.DESKTOP)
    .setDetails(raw.details);

  if (raw.url) {
    presence.setURL(raw.url);
  }

  if (raw.state) {
    presence.setState(raw.state);
  }

  if (raw.assets) {
    if (raw.assets.large_image && isURL(raw.assets.large_image)) {
      try {
        const getExtendURL = await RichPresence.getExternal(
          client,
          applicationId,
          raw.assets.large_image,
        );
        if (
          Array.isArray(getExtendURL) &&
          getExtendURL[0]?.external_asset_path
        ) {
          presence.setAssetsLargeImage(getExtendURL[0].external_asset_path);
        } else {
          presence.setAssetsLargeImage(raw.assets.large_image);
        }
      } catch {
        presence.setAssetsLargeImage(raw.assets.large_image);
      }
    } else if (raw.assets.large_image) {
      presence.setAssetsLargeImage(raw.assets.large_image);
    }

    if (raw.assets.small_image && isURL(raw.assets.small_image)) {
      try {
        const getExtendURL = await RichPresence.getExternal(
          client,
          applicationId,
          raw.assets.small_image,
        );
        if (
          Array.isArray(getExtendURL) &&
          getExtendURL[0]?.external_asset_path
        ) {
          presence.setAssetsSmallImage(getExtendURL[0].external_asset_path);
        } else {
          presence.setAssetsSmallImage(raw.assets.small_image);
        }
      } catch {
        presence.setAssetsSmallImage(raw.assets.small_image);
      }
    } else if (raw.assets.small_image) {
      presence.setAssetsSmallImage(raw.assets.small_image);
    }

    if (raw.assets.large_text)
      presence.setAssetsLargeText(raw.assets.large_text);
    if (raw.assets.small_text)
      presence.setAssetsSmallText(raw.assets.small_text);
  }

  if (raw.party) {
    presence.setParty({
      id: raw.party.id,
      max: raw.party.max,
      current: raw.party.current,
    });
  }

  if (raw.timestamps) {
    if (raw.timestamps.start) presence.setStartTimestamp(raw.timestamps.start);
    if (raw.timestamps.end) presence.setEndTimestamp(raw.timestamps.end);
  }

  if (Array.isArray(raw.buttons)) {
    raw.buttons.forEach((button) => {
      presence.addButton(button.label, button.url);
    });
  }

  if (raw.secrets?.join) {
    presence.setJoinSecret(raw.secrets.join);
  }

  return presence;
}
