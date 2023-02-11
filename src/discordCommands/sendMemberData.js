exports.sendMemberData = (client, connection, svId, memberId, intents, GatewayIntentBits) => {
    const sv = client.guilds.cache.find(server => server.id === svId)
    sv.members.fetch(memberId).then(member => {
        member.user.fetch().then(user => {
            var status = "offline";
            var statusDevice;

            if(intents.includes(GatewayIntentBits.GuildPresences) && member.presence ) {
                status = member.presence.status
                statusDevice = Object.keys(member.presence.clientStatus).join(" ")
            }

            var filtered_roles = {}
            var roles = member.roles.cache
            roles.sort((a, b) => {return b.position - a.position})
            for(const role of roles) {
                if(role[1].name === "@everyone") continue
                filtered_roles[role[1].name] = {color:role[1].hexColor,id:role[1].id
            }


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
                    nickname: member.nickname || member.displayName,
                    id: user.id,
                    avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=600`,
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
        }})
    })
}