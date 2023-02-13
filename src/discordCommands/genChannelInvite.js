exports.genChannelInvite = (client, connection, svId, id, settings) => {
    const sv = client.guilds.cache.find(server => server.id === svId)
    const channel = sv.channels.cache.find(channel => channel.id === id)

    console.log(settings)

    channel.createInvite(settings).then((invite) =>
        connection.send(JSON.stringify({
            header:"reply_channel_invite",
            content: invite.url
        }))
    )
}