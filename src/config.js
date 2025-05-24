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
  // presence ID to load from presence collection
  // You can change this when X-DRPC is running.
  presence: "game",
  // Enable automatic Rich Presence update when saving changes to the configuration in the Presence folder
  update_save: false,
};
