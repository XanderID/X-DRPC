import { ActivityTypes, PlatformType } from "../client/type.js";

export const presence = {
  // Unique identifier for this presence configuration.
  id: "example",

  // (Optional) Application ID associated with this presence.
  // If specified, it overrides the default application ID from your config.
  application_id: "123456789012345678",

  // The name of the activity to display (e.g., the game's name).
  name: "Game",

  // Type of activity to display.
  // PlatformType options include: DESKTOP, SAMSUNG, XBOX, IOS, ANDROID, EMBEDDED, PS4, PS5.
  type: ActivityTypes.PLAYING,

  // Platform on which the activity is occurring.
  // Valid options: 'desktop', 'samsung', 'xbox', 'ios', 'android', 'embedded', 'ps4', 'ps5'.
  platform: "desktop",

  // (Optional) URL associated with the activity.
  // If provided, the activity type will automatically switch to STREAMING.
  url: "https://example.com",

  // (Optional) Additional details about the activity.
  // For example, the specific game mode or context.
  details: "Valorant",

  // (Optional) Current state or status within the activity.
  // For example, the current level or map.
  state: "In Map Ascent",

  // (Optional) Timestamps for the activity's start and end times.
  // Useful for displaying elapsed time or countdowns.
  timestamps: {
    start: Date.now(), // Activity start time in milliseconds.
    end: Date.now() + 3600000, // Activity end time (1 hour later).
  },

  // (Optional) Interactive buttons displayed on the profile.
  // Maximum of 2 buttons allowed.
  buttons: [
    { label: "Join Now", url: "https://join.example.com" },
    { label: "More Info", url: "https://info.example.com" },
  ],

  // (Optional) Images and tooltips associated with the activity.
  assets: {
    // For 'large_image' and 'small_image', you can use either:
    // - The key of an image asset uploaded in your Discord application's Rich Presence settings.
    // - A direct URL to a publicly accessible image (e.g., from Imgur or your own server).
    // Ensure that the URLs are valid and accessible to display the images correctly.
    large_image: "https://example.com/path-to-large-image.png", // or "image_large_key"
    large_text: "Large image tooltip",
    small_image: "https://example.com/path-to-small-image.png", // or "image_small_key"
    small_text: "Small image tooltip",
  },

  // (Optional) Information about the party or group associated with the activity.
  party: {
    // Unique identifier for the party.
    id: "party123",
    // Maximum number of participants allowed in the party.
    max: 5,
    // Current number of participants in the party.
    current: 3,
  },

  // (Optional) Secrets used for enabling join or spectate features in Rich Presence.
  secrets: {
    // Secret code used to allow others to join your activity.
    join: "join-secret-code",
  },
};
