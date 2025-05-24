import { ActivityTypes, PlatformType } from "../client/type.js";

export const presence = {
  id: "freefire",
  name: "Free Fire",
  type: ActivityTypes.PLAYING,
  details: "Battle Royale - Survive to Win",
  state: "In a Squad Match | Bermuda",
  assets: {
    large_image:
      "https://play-lh.googleusercontent.com/sKh_B4ZLfu0jzqx9z98b2APe2rxDb8dIW-QqFHyS3cpzDK2Qq8tAbRAz3rXzOFtdAw=w240-h480-rw",
    large_text: "Free Fire",
  },
  buttons: [{ label: "Play Free Fire", url: "https://ff.garena.com" }],
  platform: PlatformType.ANDROID,
};
