const { AttachmentBuilder } = require('discord.js')

exports.postMessage = (client, connection, type, svId, id, content, attachments) => {

    switch (type) {
        case "channel":
            const sv = client.guilds.cache.find(server => server.id === svId)
            const channel = sv.channels.cache.find(channel => channel.id === id)
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

            channel.send(message).then(() =>{
                require("./sendChatSettings").sendChatSettings(client, connection, type, svId, id)
            })
            break;

        case "dm":
            client.users.fetch(id).then(user => {
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
                
                user.dmChannel.send(message).then(() =>{
                    require("./sendChatSettings").sendChatSettings(client, connection, type, svId, id)
                })
            })
            break;
    }
}