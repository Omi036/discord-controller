exports.sendChannels = (client, connection, id, ChannelType) => {
    const sv = client.guilds.cache.find(server => server.id === id)


    sv.channels.fetch().then(items => {
        const channels = []

        items.forEach(channel => {
            if(channel.type === ChannelType.GuildCategory || channel.parent) return

            channels.push({name: channel.name, id: channel.id, type: ChannelType[channel.type], position: channel.position})
        })


        const categories = items.filter(channel => channel.type === ChannelType.GuildCategory).sort((a,b) => {return a.position - b.position})

        categories.forEach(category => {
            var category_channels = category.children.cache.sort((a,b) => {return a.position - b.position})

            channels.push({name: category.name, id: category.id, type: "GuildCategory", position: category.position})

            category_channels.forEach(channel => {
                channels.push({name: channel.name, id: channel.id, type: ChannelType[channel.type], position: channel.position})
            })
        })


        connection.send(JSON.stringify({
            header:"channels",
            content: channels
        }))
    })
}