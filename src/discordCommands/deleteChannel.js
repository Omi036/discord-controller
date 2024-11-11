exports.deleteChannel = (client, connection, svId, id,reason, ChannelType) => {
    const sv = client.guilds.cache.find(server => server.id === svId)
    if(!sv) return // If no server found

    const channel = sv.channels.cache.find(channel => channel.id === id)
    if(!channel) return // If no channel found
    
    try {
        channel.delete(reason).then(() => require("./sendChannels").sendChannels(client, connection, svId, ChannelType))
        
    } catch (error) {
        console.error(error)
    }
}