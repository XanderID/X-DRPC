import { ActivityTypes, PlatformType } from "../client/type.js";

export const presence = {
  id: "youtube",
  name: "YouTube",
  type: ActivityTypes.WATCHING,
  details: "Watching a video",
  state: "Exploring new content",
  assets: {
    large_image:
      "https://static-00.iconduck.com/assets.00/youtube-icon-512x360-3cmbxj37.png",
    large_text: "YouTube",
  },
  buttons: [
    { label: "Open YouTube", url: "https://www.youtube.com" },
    { label: "Subscribe Now", url: "https://www.youtube.com/@XanderDevID" },
  ],
  platform: PlatformType.DESKTOP,
};
