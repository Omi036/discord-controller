exports.sendClientPageData = (client, DiscordConfig) => {
    client.application.fetch().then((app) => {
        DiscordConfig.socketServer.clients.forEach(async (sclient) => {

            //! Note, this line slows down the app, consider replacing with the next line
            const commands = await app.commands.fetch()
            // const commands = app.commands.cache.size

            sclient.send(
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
                            verified: client.user.verified,
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
                            description: app.description || "None",
                            owner: (app.owner ? app.owner.tag : app.owner.name) || "Unknown",
                            id: app.id,
                            tags: app.tags,
                            iconURL: `https://cdn.discordapp.com/app-icons/${app.id}/${app.icon}.png?size=600`,
                            commands: commands.size,
                            createdAt: app.createdAt
                        }
                    }
                })
            )

            const presence = client.user.presence
            var type;
            var name;

            if(presence.activities.length > 0){
                type = presence.activities[0].type
                name = presence.activities[0].name
            } else {
                type = '-1'
                name = "Sample Text"
            }

            sclient.send(
                JSON.stringify({
                    header: "presence_data",
                    content: {
                        status: presence.status,
                        type: type,
                        device: presence.clientStatus || "web",
                        name: name,
                    }
                })
            )
        })

    })
}