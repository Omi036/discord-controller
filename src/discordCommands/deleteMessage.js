exports.deleteMessage = (client, connection, svId, chId, id, channelType) => {

    console.log(channelType)

    if(channelType === "channel"){
        const sv = client.guilds.cache.find(server => server.id === svId)
        const channel = sv.channels.cache.find(channel => channel.id === chId)
        const msg = channel.messages.cache.find(msg => msg.id === id)
    
        if(!channel.permissionsFor(client.user).toArray().includes("ManageMessages")) return
        
        msg.delete().then(() =>{
            require("./sendChatSettings").sendChatSettings(client, connection, "channel", svId, chId)
        })

    } else {
        client.users.fetch(chId).then(user => {
            const msg = user.dmChannel.messages.cache.find(msg => msg.id === id)
            msg.delete().then(() => {
                require("./sendChatSettings").sendChatSettings(client, connection, "dm", svId, chId)
            })
        })
    }
}