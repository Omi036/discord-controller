exports.genInvite = async (client, connection, data, PermissionFlagsBits) => {
    const permissions = []
    data.forEach(perm => permissions.push(PermissionFlagsBits[perm]))

    try {
        const invite = await client.generateInvite({scopes:["bot"],permissions:permissions})
        
        connection.send(JSON.stringify({
            header:"reply_invite",
            content: invite
        }))
    } catch (error) {
        console.error(error)
    }    
}