exports.sendRoles = async (client, connection, id) => {
    const sv = await client.guilds.cache.find(server => server.id === id)
    if(!sv) return // if no server found

    const items = await sv.roles.fetch()

    const roles = []

    items.sort((a, b) => {return b.position - a.position})
    items.forEach(role => {
        var color = role.hexColor;
        if(color === "#000000") color = "#99aab5"
        roles.push({name:role.name, id:role.id, color:color})
    })

    try {
        connection.send(JSON.stringify({
            header:"roles",
            content: roles
        }))
    } catch (error) {
        console.error(error)
    }
}