import { ActivityTypes, PlatformType } from "../client/type.js";

export const presence = {
  id: "game",
  name: "Example Game",
  type: ActivityTypes.PLAYING,
  details: "Exploring the world",
  state: "Level 5 | Forest Zone",
  buttons: [
    { label: "View Website", url: "https://examplegame.com" },
    { label: "Join Community", url: "https://discord.gg/example" },
  ],
  platform: PlatformType.DESKTOP,
};
