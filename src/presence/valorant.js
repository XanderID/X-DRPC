import { ActivityTypes, PlatformType } from "../client/type.js";

export const presence = {
  id: "valorant",
  name: "VALORANT",
  type: ActivityTypes.PLAYING,
  details: "Competitive Matchmaking",
  state: "Defending | Haven - Round 3",
  assets: {
    large_image:
      "https://static-00.iconduck.com/assets.00/games-valorant-icon-512x512-kqz6q7jw.png",
    large_text: "Valorant",
  },
  buttons: [
    {
      label: "Watch Gameplay",
      url: "https://www.twitch.tv/directory/game/VALORANT",
    },
    { label: "Download VALORANT", url: "https://playvalorant.com" },
  ],
  platform: PlatformType.DESKTOP,
};
