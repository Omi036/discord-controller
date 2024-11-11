exports.sendChatSettings = async (client, connection, type, svId, id) => {
    switch(type) {
        case "channel":
            const sv = await client.guilds.cache.find(server => server.id === svId)
            if(!sv) return // If no server found

            const channel = await sv.channels.cache.find(channel => channel.id === id)
            if(!channel) return // If no channel found

            const messages = await channel.messages.fetch({ limit: 20 })
            var messagesSettings = []
            
            for(var message of messages) {
                message = message[1]
                var currentMessage = {}
                var attachments = []
                var embeds = []

                message.attachments.forEach(attachment => {
                    attachments.push({name:attachment.name, url:attachment.url, type:attachment.contentType})
                })

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

            try {
                connection.send(JSON.stringify({
                    header:"chat_settings",
                    content:{
                        name:channel.name,
                        id:channel.id,
                        messages:messagesSettings.reverse(),
                    }
                }))
                
            } catch (error) {
                console.error(error)
            }
            break;


        case "dm":
            const user = await client.users.fetch(id)
            if(!user) return // If no user found
            var dmChannel;

            try {
                dmChannel = await user.createDM()                
            } catch (error) {
                console.error(error)
                return
            }

            const dmMessages = await dmChannel.messages.fetch({ limit: 20 })
            var messagesSettings = []

            for(var message of dmMessages) {
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

            try {
                connection.send(JSON.stringify({
                    header:"chat_settings",
                    content:{
                        name:user.tag,
                        id:user.id,
                        messages:messagesSettings.reverse(),
                    }
                }))
            } catch (error) {
                console.error(error)
            }
            break
    }
}