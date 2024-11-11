exports.queryUser = async (client, connection, query) => {
    // *Doom musics starts playing*
    var users = []

    function push(user){
        if(!user) return

        for(const listUser of users){
            if(listUser.id === user.id) return
        }

        users.push({ id:user.id, name:user.tag, avatarUrl:`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=600` })
    }

    const guilds = await client.guilds.fetch()
    for(const partGuild of guilds){
        const guild = await partGuild[1].fetch()
        const members = await guild.members.fetch()
        
        for(const member of members) {
            var user = member[1].user
            if(user.id.startsWith(query) || user.username.toLowerCase().startsWith(query.toLowerCase())) push(user)
        }
    }

    try {
        connection.send(JSON.stringify({
            header:"return_query_user",
            content:users
        }))
        
    } catch (error) {
        console.error(error)
    }
}