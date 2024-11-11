exports.deleteMessage = async (client, connection, svId, chId, id, channelType) => {
    if(channelType === "channel"){
        const sv = client.guilds.cache.find(server => server.id === svId)
        if(!sv) return // If no server found

        const channel = sv.channels.cache.find(channel => channel.id === chId)
        if(!channel) return // If no server found

        const msg = channel.messages.cache.find(msg => msg.id === id)
        if(!msg) return // If no message found
    
        if(!channel.permissionsFor(client.user).toArray().includes("ManageMessages")) return // If doesnt have perms
        
        try {
            await msg.delete()
            await require("./sendChatSettings").sendChatSettings(client, connection, "channel", svId, chId)

        } catch (error) {
            console.error(error)
        }

    } else {
        const user = client.users.fetch(chId)
        if(!user) return // If no user found
        
        const msg = user.dmChannel.messages.cache.find(msg => msg.id === id)
        if(!msg) return // If no message found

        try {
            await msg.delete()
            await require("./sendChatSettings").sendChatSettings(client, connection, "dm", svId, chId)
            
        } catch (error) {
            console.error(error)
        }
    }
}