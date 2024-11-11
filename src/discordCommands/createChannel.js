const { Client, ChannelType } = require("discord.js")

/**
 * @param {Client} client
 */
exports.createChannel = async (client, connection, data, refreshChannels) => {
    const sv = await client.guilds.cache.find(server => server.id === data.svId)

    if(!sv) return // If no server found

    try {
        await sv.channels.create({
            name: data.name.toLocaleLowerCase().replaceAll(" ", "-"),
            topic: data.topic,
            nsfw: data.isNsfw,
            type: ChannelType[data.type],
            bitrate: data.bitrate*1000,
            userLimit: data.userLimit,
            rateLimitPerUser: data.slowdown,
            rtcRegion: data.region
        })
        
    } catch (error) {
        console.error(error)
    }

    refreshChannels(connection, data.svId)
}