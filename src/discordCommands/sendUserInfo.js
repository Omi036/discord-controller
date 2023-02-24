exports.sendUserInfo = (client, connection, id) => {
    client.users.fetch(id).then(user => {
        connection.send(JSON.stringify({
            header:"user_info",
            content: {
                isSystem: user.system,
                isBot: user.bot,
                tag: user.tag,
                id: user.id,
                createdAt: user.createdAt,
                accentColor: user.hexAccentColor ? user.hexAccentColor : "Default",
                avatarUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=600`,
                banner: user.banner,
                flags: user.flags && user.flags.toArray(),
            }
        }))
    })
}