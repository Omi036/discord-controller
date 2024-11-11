const { AttachmentBuilder } = require('discord.js')

exports.postMessage = async (client, connection, type, svId, id, content, attachments) => {

    switch (type) {
        case "channel":
            const sv = await client.guilds.cache.find(server => server.id === svId)
            if(!sv) return // If no server found

            const channel = await sv.channels.cache.find(channel => channel.id === id)
            if(!channel) return // If no channel found

            var message = {}

            if(content) message.content = content
            if(attachments.embed) message.embeds = [attachments.embed]
            if(attachments.files) {
                message.files = []
                for(const file of attachments.files){
                    const attachment = new AttachmentBuilder(Buffer.from(file.buffer, "base64"), {name:file.name})
                    message.files.push(attachment)
                }
            }

            try {
                await channel.send(message)
                await require("./sendChatSettings").sendChatSettings(client, connection, type, svId, id)
                
            } catch (error) {
                console.error(error)
            }

            break;

        case "dm":
            const user = await client.users.fetch(id)
            if(!user) return // If no user found

            var message = {}

            if(content) message.content = content
            if(attachments.embed) message.embeds = [attachments.embed]
            if(attachments.files) {
                message.files = []
                for(const file of attachments.files){
                    const attachment = new AttachmentBuilder(Buffer.from(file.buffer, "base64"), {name:file.name})
                    message.files.push(attachment)
                }
            }
            
            try {
                await user.dmChannel.send(message)
                await require("./sendChatSettings").sendChatSettings(client, connection, type, svId, id)
                
            } catch (error) {
                console.error(error)
            }
            break;
    }
}