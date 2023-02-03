// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, PermissionFlagsBits } = require("discord.js");
const DiscordConfig = { socketServer: undefined };

exports.sendServerData = () => {}
exports.sendServers = () => {}
exports.genInvite = () => {}
exports.sendClientPageData = () => {}
exports.setStatus = () => {}
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
                        avatar: `https://cdn.discordapp.com/avatars/${c.user.id}/${c.user.avatar}.png?size=300`,
                        username: c.user.tag
                    }
                })
            );
        });

        exports.genInvite = (data) => {
            console.log(data)
            const permissions = []
            data.forEach(perm => permissions.push(PermissionFlagsBits[perm]))
            console.log(permissions)
            const invite = client.generateInvite({scopes:["bot"],permissions:permissions})
            DiscordConfig.socketServer.clients.forEach((sclient) => {
                sclient.send(JSON.stringify({
                    header:"reply_invite",
                    content: invite
                })
                )
            })
        }

        exports.sendServers = () => {
            const guilds = []
            client.guilds.cache.forEach(sv => {
                guilds.push({name:sv.name, id:sv.id, avatar:sv.iconURL()})
            })
            DiscordConfig.socketServer.clients.forEach((sclient) => {
                sclient.send(
                    JSON.stringify({
                        header:"servers_info",
                        content: guilds
                    })
                    )
                }
            )
        }

        
        exports.setStatus = (status) => {
            client.user.setStatus(status);
            exports.sendClientPageData()
        }

        exports.sendClientPageData = () => {
            client.application.fetch().then((app) => {
                DiscordConfig.socketServer.clients.forEach(async (sclient) => {

                    const commands = await app.commands.fetch()

                    await sclient.send(
                        JSON.stringify({
                            header: "fill_client_info",
                            content: {
                                client: {
                                    guilds: client.guilds.cache.size,
                                    channels: client.channels.cache.size,
                                    token: client.token,
                                    initializedAt: client.readyAt
                                },
                                user: {
                                    verified: client.user.flags.has(65536),
                                    status: client.user.presence.status,
                                    tag: client.user.tag,
                                    id: client.user.id,
                                    avatarURL:`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=600`,
                                    createdAt: client.user.createdAt
                                },
                                app: {
                                    public: app.botPublic,
                                    codeGrant: app.botRequireCodeGrant,
                                    name: app.name,
                                    description: app.description,
                                    owner: app.owner ? app.owner.tag : app.owner.name,
                                    id: app.id,
                                    tags: app.tags,
                                    iconURL: `https://cdn.discordapp.com/app-icons/${app.id}/${app.icon}.png?size=600`,
                                    commands: commands.size,
                                    createdAt: app.createdAt
                                }
                            }
                        })
                    )
                })
    
            })
        }

        exports.sendServerData = async (id) => {
            const sv = client.guilds.cache.find(server => server.id === id)
            const users = sv.memberCount
            const channels = sv.channels.cache.size
            const roles = sv.roles.cache.size
            const bans = await sv.bans.fetch() // This line downs a lot of performance
            const emojis = sv.emojis.cache.size
            const stickers = sv.stickers.cache.size
            var owner;

            await sv.fetchOwner().then(member => owner = member.user.tag).finally(() => {
                DiscordConfig.socketServer.clients.forEach((sclient) => {
                    sclient.send(
                        JSON.stringify({
                            header: "server_data",
                            content:{
                                users: users,
                                channels: channels,
                                roles: roles,
                                bans: bans.size,
                                emojis: emojis,
                                stickers: stickers,
                                isVerified: sv.verified,
                                isPartenered: sv.partnered,
                                name: sv.name,
                                description: sv.description ? sv.description : "None",
                                id: sv.id,
                                owner: owner,
                                iconUrl: `https://cdn.discordapp.com/icons/${sv.id}/${sv.icon}.png?size=600`,
                                language: sv.preferredLocale,
                                createdAt: sv.createdAt,
                                joinedAt: sv.joinedAt,
                                verificationLevel: sv.verificationLevel,
                                boostTier: sv.premiumTier,
                                explicitFilter: sv.explicitContentFilter,
                                nsfwLevel: sv.nsfwLevel,
                            }
                        })
                    )
                })
            })
            

        }
        exports.sendClientPageData()
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

            exports.sendClientPageData()
        }
    }

    exports.logout = () => { 
        exports.isOnline = () => {return false}
        client.destroy() 
    }
};
