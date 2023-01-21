// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
const DiscordConfig = {
    socketServer: undefined,
};

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);

    // Sends to the web that the login was successfull
    DiscordConfig.socketServer.clients.forEach((client) => {
        client.send(
            JSON.stringify({
                header: "confirm_auth",
                content: true,
            })
        );
    });

    // Sends to the web basic information
    DiscordConfig.socketServer.clients.forEach((client) => {
        client.send(
            JSON.stringify({
                header: "basic_profile",
                content: {
                    avatar: c.user.avatarURL(),
                    username: c.user.tag
                }
            })
        );
    });
});

exports.DiscordConfig = DiscordConfig;
exports.login = (token) => client.login(token);