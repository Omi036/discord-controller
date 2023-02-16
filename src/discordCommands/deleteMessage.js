exports.deleteMessage = (client, connection, svId, chId, id) => {
    const sv = client.guilds.cache.find(server => server.id === svId)
    const channel = sv.channels.cache.find(channel => channel.id === chId)
    const msg = channel.messages.cache.find(msg => msg.id === id)
    msg.delete().then(() =>{
        require("./sendChatSettings").sendChatSettings(client, connection, "channel", svId, chId)
    })
}