exports.genChannelInvite = async (client, connection, svId, id, settings) => {
    const sv = await client.guilds.cache.find(server => server.id === svId)
    if(!sv) return // If no server found

    const channel = await sv.channels.cache.find(channel => channel.id === id)
    if(!channel) return // If no channel found

    try {
        await channel.createInvite(settings)
        await connection.send(JSON.stringify({
            header:"reply_channel_invite",
            content: invite.url
        }))

    } catch (error) {
        console.error(error)
    }
}