exports.postMessage = (client, connection, type, svId, id, content) => {

    switch (type) {
        case "channel":
            const sv = client.guilds.cache.find(server => server.id === svId)
            const channel = sv.channels.cache.find(channel => channel.id === id)

            channel.send(content).then(() =>{
                require("./sendChatSettings").sendChatSettings(client, connection, type, svId, id)
            })
            break;
    }
}