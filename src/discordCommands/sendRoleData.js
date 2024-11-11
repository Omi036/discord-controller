exports.sendRoleData = async (client, connection, svId, roleId) => {
    const sv = await client.guilds.cache.find(server => server.id === svId)
    if(!sv) return // If no server found

    const role = await sv.roles.fetch(roleId)
    if(!role) return // If no role found

    try {
        connection.send(JSON.stringify({
            header:"role_data",
            content:{
                name: role.name,
                id: role.id,
                hexColor: role.hexColor,
                hoist: role.hoist,
                editable: role.editable,
                managed: role.managed,
                mentionable: role.mentionable,
                createdAt: role.createdAt,
                icon: role.iconURL() || "None",
                members: role.members.size,
                position: role.position,
                tags: role.tags || "None",
                unicodeEmoji:role.unicodeEmoji || "None",
                permissions:role.permissions.toArray()
            }
        }))
    } catch (error) {
        console.error(error)
    }
}