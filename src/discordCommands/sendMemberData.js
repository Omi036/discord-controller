exports.sendMemberData = async (client, connection, svId, memberId, intents, GatewayIntentBits) => {
    const sv = await client.guilds.cache.find(server => server.id === svId)
    if(!sv) return // If server does not exist

    const member = await sv.members.fetch(memberId)
    if(!member) return // If no member found

    const user = await member.user.fetch()
    if(!user) return // If no user found

    var status = "offline";
    var statusDevice;
    var filtered_roles = {}

    if(intents.includes(GatewayIntentBits.GuildPresences) && member.presence ) {
        status = member.presence.status
        statusDevice = Object.keys(member.presence.clientStatus).join(" ")
    }

    var roles = member.roles.cache
    roles.sort((a, b) => {return b.position - a.position})
    
    if(roles.size > 1) {
        for(const role of roles) {
            if(role[1].name === "@everyone") continue                    
            filtered_roles[role[1].name] = {color:role[1].hexColor,id:role[1].id}
        }
    }

    try {
        connection.send(JSON.stringify({
            header:"member_data",
            content:{
                bannable: member.bannable,
                kickable: member.kickable,
                manageable: member.manageable,
                moderatable: member.moderatable,
                isSystem: user.system,
                isBot: user.bot,
                tag: user.tag,
                avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=600`,
                nickname: member.nickname || member.displayName,
                id: user.id,
                banner: user.banner ? `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=600` : "None",
                accentColor: user.hexAccentColor ? user.hexAccentColor : "Default",
                createdAt: user.createdAt,
                joinedAt: member.joinedAt,
                status: status,
                statusDevice: statusDevice,
                roles: filtered_roles ?? [],
                badges: user.flags.toArray() ?? "None",
                permissions: member.permissions.toArray()
            }
        }))
    } catch (error) {
        console.error(error)
    }
}