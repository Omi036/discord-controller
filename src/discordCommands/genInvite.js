exports.genInvite = (client, connection, data, PermissionFlagsBits) => {
    const permissions = []
    data.forEach(perm => permissions.push(PermissionFlagsBits[perm]))
    const invite = client.generateInvite({scopes:["bot"],permissions:permissions})
    
    connection.send(JSON.stringify({
        header:"reply_invite",
        content: invite
    }))
}