exports.deleteChannel = (client, connection, svId, id,reason, ChannelType) => {
    const sv = client.guilds.cache.find(server => server.id === svId)
    const channel = sv.channels.cache.find(channel => channel.id === id)
    
    channel.delete(reason).then(() => require("./sendChannels").sendChannels(client, connection, svId, ChannelType))
}