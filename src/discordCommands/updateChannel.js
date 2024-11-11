exports.updateChannel = (client, connection, svId, id, data) => {
    const sv = client.guilds.cache.find(server => server.id === svId)
    const channel = sv.channels.cache.find(channel => channel.id === id)

    const editOptions = {}

    if(data.name) editOptions.name = data.name.trim().toLowerCase().replaceAll(" ","_")

    channel.edit(editOptions)
}