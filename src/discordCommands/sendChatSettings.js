exports.sendChatSettings = (client, connection, type, svId, id) => {
    switch(type) {
        case "channel":
            const sv = client.guilds.cache.find(server => server.id === svId)
            const channel = sv.channels.cache.find(channel => channel.id === id)
            channel.messages.fetch({ limit: 20 }).then(messages => {
                var messagesSettings = []
                for(var message of messages) {
                    message = message[1]
                    var currentMessage = {}
                    var attachments = []
                    try {
                        message.attachments.forEach(attachment => {
                            attachments.push({name:attachment.name, url:attachment.url, type:attachment.contentType})
                        })
                    } catch (error) {}
                    currentMessage.author = message.author.tag
                    currentMessage.authorAvatar = `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=600message.author.avatar`,
                    currentMessage.content = message.cleanContent //! Warning,  GatewayIntentBits.MessageContent  needed
                    currentMessage.attachments = attachments
                    messagesSettings.push(currentMessage)
                }
                connection.send(JSON.stringify({header:"chat_settings", content:{name:channel.name, id:channel.id, messages:messagesSettings.reverse()}}))
            })
            break;
    }

}