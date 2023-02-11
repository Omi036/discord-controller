exports.sendServerData = async (client, connection, id) => {
    const sv = client.guilds.cache.find(server => server.id === id)
    const users = sv.memberCount
    const channels = sv.channels.cache.size
    const roles = sv.roles.cache.size
    const bans = await sv.bans.fetch() //! This line Slows down a lot of the performance
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
    })}