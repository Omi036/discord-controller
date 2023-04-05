// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, ChannelType, PermissionFlagsBits, ApplicationCommandType, ApplicationCommandOptionType,GuildExplicitContentFilter,GuildVerificationLevel,GuildPremiumTier,GuildNSFWLevel } = require("discord.js");
const DiscordConfig = { socketServer: undefined };

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
                        avatar: `https://cdn.discordapp.com/avatars/${c.user.id}/${c.user.avatar}.png?size=300`,
                        username: c.user.tag
                    }
                })
            );
        });
                    
            
        

        exports.sendChatSettings = async (connection, type, svId, id) => require("./discordCommands/sendChatSettings.js").sendChatSettings(client, connection, type, svId, id)
        exports.postMessage = (connection, type, svId, id, content, attachments) => require("./discordCommands/postMessage.js").postMessage(client, connection, type, svId, id, content, attachments)
        exports.deleteMessage = (connection, svId, chId, id, channelType) => require("./discordCommands/deleteMessage.js").deleteMessage(client, connection, svId, chId, id, channelType)
        exports.genChannelInvite = (connection, svId, id, settings) => require("./discordCommands/genChannelInvite").genChannelInvite(client, connection, svId, id, settings)
        exports.genInvite = (connection, data) => require("./discordCommands/genInvite").genInvite(client, connection, data, PermissionFlagsBits)
        exports.sendServers = (connection) => require("./discordCommands/sendServers").sendServers(client, connection)
        exports.sendMembers = (connection, svId) => require("./discordCommands/sendMembers").sendMembers(client, connection, svId)
        exports.setStatus = (connection, status) => require("./discordCommands/setStatus").setStatus(client, connection, status, exports.sendClientPageData)
        exports.sendMemberData = (connection, svId, memberId) => require("./discordCommands/sendMemberData").sendMemberData(client, connection, svId, memberId, new_intents, GatewayIntentBits)
        exports.sendRoleData = (connection, svId, roleId) => require("./discordCommands/sendRoleData").sendRoleData(client, connection, svId, roleId)
        exports.sendClientPageData = () => require("./discordCommands/sendClientPageData").sendClientPageData(client, DiscordConfig)
        exports.sendRoles = (connection, id) => require("./discordCommands/sendRoles").sendRoles(client, connection, id)
        exports.sendChannels = (connection, id) => require("./discordCommands/sendChannels").sendChannels(client, connection, id, ChannelType)
        exports.sendChannelData = async (connection, svId, id) => require("./discordCommands/sendChannelData").sendChannelData(client, connection, svId, id, ChannelType)
        exports.sendServerData = async (connection, id) => require("./discordCommands/sendServerData").sendServerData(client, connection, id,GuildExplicitContentFilter,GuildVerificationLevel,GuildPremiumTier,GuildNSFWLevel)
        exports.queryUser = async (connection, query) => require("./discordCommands/queryUser").queryUser(client,connection, query)
        exports.sendUserInfo = (connection, id) => require("./discordCommands/sendUserInfo").sendUserInfo(client,connection,id)
        exports.sendCommands = async (connection) => require("./discordCommands/sendCommands").sendCommands(client, connection)
        exports.sendCommandInfo = async (connection, id) => require("./discordCommands/sendCommandInfo").sendCommandInfo(client,connection,id, ApplicationCommandType, ApplicationCommandOptionType)
        exports.deleteChannel = (connection, svId, id, reason) => require("./discordCommands/deleteChannel").deleteChannel(client, connection, svId, id, reason, ChannelType)
        exports.updateChannel = (connection, svId, id, data) => require("./discordCommands/updateChannel").updateChannel(client, connection, svId, id, data)

        exports.sendClientPageData()
    });

    // We'll try to connect with the provide token
    // If ERR, we will notify the web
    client.login(token).catch(err => {
        DiscordConfig.socketServer.clients.forEach((sclient) => {
            sclient.send(
                JSON.stringify({
                    header: "deny_auth",
                    content: {reason: err.name}
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

            exports.sendClientPageData()
        }
    }

    exports.logout = () => { 
        exports.isOnline = () => false
        client.destroy()
    }
};
