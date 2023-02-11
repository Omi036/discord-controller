exports.sendChannels = (client, connection, id, ChannelType) => {
    const sv = client.guilds.cache.find(server => server.id === id)


    sv.channels.fetch().then(items => {
        // Here we will save all the channels, including categories
        const channels = []

        items.forEach(channel => {
            if(channel.type === ChannelType.GuildCategory || channel.parent) return

            channels.push({name: channel.name, id: channel.id, type: ChannelType[channel.type], position: channel.position})
        })

        // We get all the categories and sort them by their position
        const categories = items.filter(channel => channel.type === ChannelType.GuildCategory).sort((a,b) => {return a.position - b.position})

        // Then, we sort all the channels inside of the category by their position
        categories.forEach(category => {
            // We get and sort all the channels of the category
            var category_channels = category.children.cache.sort((a,b) => {return a.position - b.position})

            // We push the category channel before pushing its children
            channels.push({name: category.name, id: category.id, type: "GuildCategory", position: category.position})

            // Finally, for each channel, we push them in the correct order
            category_channels.forEach(channel => {
                channels.push({name: channel.name, id: channel.id, type: ChannelType[channel.type], position: channel.position})
            })
        })

        // Finally, we send them to the dashboard
        connection.send(JSON.stringify({
            header:"channels",
            content: channels
        }))
    })
}