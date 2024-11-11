exports.sendMembers = async (client, connection, svId) => {
    const sv = await client.guilds.cache.find(server => server.id === svId)
    if(!sv) return // If no server found

    if(sv.large) {
        connection.send(JSON.stringify({
            header:"members",
            content:{isLarge: true, members:[]}
        }))
        
    } else {
        var members = await sv.members.fetch()
        var membersData = []
            
        members = members.sort((a,b) => b.user.bot - a.user.bot)
        membersData = members.map((member) => { 
            return {
                tag: member.user.tag, 
                id: member.user.id, 
                isBot:member.user.bot, 
                isOwner:member.user.id === sv.ownerId, 
                avatarUrl: member.user.avatarURL()
            }})

        try {
            connection.send(JSON.stringify({
                header:"members",
                content:{isLarge: false, members:membersData.sort((a, b) => b.isOwner - a.isOwner)}
            }))

        } catch (error) {
            console.error(error)
        }
    }
}