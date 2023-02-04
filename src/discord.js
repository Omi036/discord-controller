// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, PermissionFlagsBits, ChannelType } = require("discord.js");
const DiscordConfig = { socketServer: undefined };


exports.isOnline = () => false
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

        exports.genInvite = (connection, data) => {
            console.log(data)
            const permissions = []
            data.forEach(perm => permissions.push(PermissionFlagsBits[perm]))
            console.log(permissions)
            const invite = client.generateInvite({scopes:["bot"],permissions:permissions})
            connection.send(JSON.stringify({
                header:"reply_invite",
                content: invite
            }))
        }

        exports.sendServers = (connection) => {
            const guilds = []

            client.guilds.cache.forEach(sv => {
                guilds.push({name:sv.name, id:sv.id, avatar:sv.iconURL()})
            })

            connection.send(JSON.stringify({
                header:"servers_info",
                content: guilds
            }))
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
                                    createdAt: client.user.createdAt,
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

        //! Trust me, you can't make an idea about how hard was it to realize how does the channels position work.
        exports.sendChannels = (connection, id) => {
            const sv = client.guilds.cache.find(server => server.id === id)


            sv.channels.fetch().then(items => {
                // Here we will save all the channels, including categories
                const channels = []

                items.forEach(channel => {
                    if(channel.type === ChannelType.GuildCategory || channel.parent) return

                    channels.push({name: channel.name, id: channel.id, type: ChannelType[channel.type], position: channel.position})
                })

                // We get all the categories and sort them by their position
                const categories = items.filter(channel => channel.type === ChannelType.GuildCategory).sort((a,b) => {return a.position - b.position})

                // Then, we sort all the channels inside of the category by their position
                categories.forEach(category => {
                    // We get and sort all the channels of the category
                    var category_channels = category.children.cache.sort((a,b) => {return a.position - b.position})

                    // We push the category channel before pushing its children
                    channels.push({name: category.name, id: category.id, type: "GuildCategory", position: category.position})

                    // Finally, for each channel, we push them in the correct order
                    category_channels.forEach(channel => {
                        channels.push({name: channel.name, id: channel.id, type: ChannelType[channel.type], position: channel.position})
                    })
                })

                // Finally, we send them to the dashboard
                connection.send(JSON.stringify({
                    header:"channels",
                    content: channels
                }))
            })
        }

        exports.sendChannelData = async (connection, svId, id) => {
            const sv = client.guilds.cache.find(server => server.id === svId)
            const channel = sv.channels.cache.find(channel => channel.id === id)

            var messages;
            var members;

            try { 
                messages = await channel.messages.fetch()
                messages = messages.size
                if(messages === 50) messages = "+50"
            } catch (e) {}

            try { members = channel.members.size
            } catch (e) {}

            connection.send(JSON.stringify({
                header:"channel_data",
                content:{
                    id:id,
                    name:channel.name,
                    type:ChannelType[channel.type],
                    url: channel.url,
                    viewable: channel.viewable,
                    manageable: channel.manageable,
                    createdAt: channel.createdAt,
                    deletable: channel.deletable,
                    messages: messages,
                    nsfw: channel.nsfw,
                    rateLimit: channel.rateLimitPerUser,
                    topic: channel.topic || "None",
                    bitrate: channel.bitrate,
                    isFull: channel.full,
                    joinable: channel.joinable,
                    rtcRegion: channel.rtcRegion || "Automatic",
                    speakable: channel.speakable,
                    userLimit: channel.userLimit,
                    members: members,
                    avaiableTags: channel.availableTags,
                    defaultDuration: channel.defaultAutoArchiveDuration
                }
            }))
        }

        exports.sendServerData = async (connection, id) => {
            const sv = client.guilds.cache.find(server => server.id === id)
            const users = sv.memberCount
            const channels = sv.channels.cache.size
            const roles = sv.roles.cache.size
            const bans = await sv.bans.fetch() // This line downs a lot of performance
            const emojis = sv.emojis.cache.size
            const stickers = sv.stickers.cache.size
            var owner;

            await sv.fetchOwner().then(member => owner = member.user.tag).finally(() => {
                connection.send(JSON.stringify({
                    header: "server_data",
                    content:{
                        users: users,
                        channels: channels,
                        roles: roles -1,
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
                }))
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
