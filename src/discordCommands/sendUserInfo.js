exports.sendUserInfo = async (client, connection, id) => {
    const user = await client.users.fetch(id)
    if(!user) return // If no user found

    try {
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
    } catch (error) {
        console.error(error)
    }
}