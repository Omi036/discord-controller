exports.sendRoles = (client, connection, id) => {
    const sv = client.guilds.cache.find(server => server.id === id)
    sv.roles.fetch().then(items => {
        const roles = []

        items.sort((a, b) => {return b.position - a.position})
        items.forEach(role => {
            var color = role.hexColor;
            if(color === "#000000") color = "#99aab5"
            roles.push({name:role.name, id:role.id, color:color})
        })

        connection.send(JSON.stringify({
            header:"roles",
            content: roles
        }))
    })
}