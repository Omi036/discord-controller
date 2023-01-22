// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
const DiscordConfig = { socketServer: undefined };

exports.logout = () => {}
exports.isOnline = () => { return false }
exports.DiscordConfig = DiscordConfig;
exports.login = ({token, intents}) => {

    // We clean the intents list
    var new_intents = [];
    intents = Object.keys(intents).filter(key => { return intents[key] !== false });
    intents.forEach(key => new_intents.push(GatewayIntentBits[key]))

    // We create a client with the defined intents
    const client = new Client({ intents: new_intents });

    // When the client is ready, notify it
    client.once(Events.ClientReady, (c) => {
        console.log(`Ready! Logged in as ${c.user.tag}`);

        // Sends to the web that the login was successfull
        DiscordConfig.socketServer.clients.forEach((sclient) => {
            sclient.send(
                JSON.stringify({
                    header: "confirm_auth",
                    content: true,
                })
            );
        });

        // Sends to the web basic information
        DiscordConfig.socketServer.clients.forEach((sclient) => {
            sclient.send(
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


    // We'll try to connect with the provide token
    // If ERR, we will notify the web
    client.login(token).catch(err => {
        DiscordConfig.socketServer.clients.forEach((sclient) => {
            sclient.send(
                JSON.stringify({
                    header: "deny_auth",
                    content: {}
                })
            );
        });
        return
    })


    exports.isOnline = () => {
        // If the client is already ON, it will notify to the dashboard
        if(client.isReady()){
    
            // Will get rid off the login modal
            DiscordConfig.socketServer.clients.forEach((sclient) => {
                sclient.send(
                    JSON.stringify({
                        header: "already_login",
                        content: {}
                    })
                );
            });
    
            // Will send basic information
            DiscordConfig.socketServer.clients.forEach((sclient) => {
                sclient.send(
                    JSON.stringify({
                        header: "basic_profile",
                        content: {
                            avatar: client.user.avatarURL(),
                            username: client.user.tag
                        }
                    })
                );
            });
        }
    }

    exports.logout = () => { 
        exports.isOnline = () => {return false}
        client.destroy() 
    }
};