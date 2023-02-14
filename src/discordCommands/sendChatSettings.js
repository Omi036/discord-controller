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
                    var embeds = []
                    try {
                        message.attachments.forEach(attachment => {
                            attachments.push({name:attachment.name, url:attachment.url, type:attachment.contentType})
                        })
                    } catch (error) {}
                    if(message.embeds) {
                        for(const embed of message.embeds) {
                            embeds.push({
                                author:embed.author && embed.author.name,
                                color:embed.hexColor,
                                description:embed.description,
                                footer:embed.footer && embed.footer.text,
                                image: embed.image && embed.image.url,
                                thumbnail:embed.thumbnail && embed.thumbnail.url,
                                timestamp:embed.timestamp,
                                title: embed.title,
                                fields: embed.fields && embed.fields.map(field => ({name: field.name, value:field.value}))
                            })
                        }
                    }

                    currentMessage.author = message.author.tag
                    currentMessage.authorAvatar = message.author.avatar && `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=600`,
                    currentMessage.content = message.cleanContent //! Warning,  GatewayIntentBits.MessageContent  needed
                    currentMessage.attachments = attachments
                    currentMessage.embeds = embeds
                    currentMessage.id = message.id
                    messagesSettings.push(currentMessage)
                }
                connection.send(JSON.stringify({
                    header:"chat_settings",
                    content:{
                        name:channel.name,
                        id:channel.id,
                        messages:messagesSettings.reverse(),
                    }}))
            })
            break;
    }

}