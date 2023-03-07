exports.sendChannelData = async (client, connection, svId, id, ChannelType) => {
    const sv = client.guilds.cache.find(server => server.id === svId)
    const channel = sv.channels.cache.find(channel => channel.id === id)

    var messages;
    var members;

    try { 
        messages = await channel.messages.fetch()
        messages = messages.size
        if(messages === 50) messages = "+50"
    } catch (e) {}

    try { members = channel.members.size
    } catch (e) {}

    connection.send(JSON.stringify({
        header:"channel_data",
        content:{
            id:id,
            name:channel.name,
            type:ChannelType[channel.type],
            url: channel.url,
            viewable: channel.viewable,
            messageable: (channel.permissionsFor(client.user).toArray().includes("SendMessages") && channel.permissionsFor(client.user).toArray().includes("ViewChannel")),
            manageable: channel.manageable,
            createdAt: channel.createdAt,
            deletable: channel.deletable,
            messages: messages,
            nsfw: channel.nsfw,
            rateLimit: channel.rateLimitPerUser,
            topic: channel.topic || "None",
            bitrate: channel.bitrate,
            isFull: channel.full,
            joinable: channel.joinable,
            rtcRegion: channel.rtcRegion || "Automatic",
            speakable: channel.speakable,
            userLimit: channel.userLimit,
            members: members,
            avaiableTags: channel.availableTags,
            defaultDuration: channel.defaultAutoArchiveDuration
        }
    }))
}
