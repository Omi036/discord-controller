exports.sendServers = (client, connection) => {
    const guilds = []

    client.guilds.cache.forEach(sv => {
        guilds.push({name:sv.name, id:sv.id, avatar:sv.iconURL()})
    })

    try {
        connection.send(JSON.stringify({
            header:"servers_info",
            content: guilds
        }))
    } catch (error) {
        console.error(error)
    }
}