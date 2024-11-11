exports.updateChannel = async (client, connection, svId, id, data) => {
    const sv = await client.guilds.cache.find(server => server.id === svId)
    if(!sv) return // If no server found

    const channel = await sv.channels.cache.find(channel => channel.id === id)
    if(!channel) return // if no channel found

    const editOptions = {}

    if(data.name) editOptions.name = data.name.trim().toLowerCase().replaceAll(" ","_")

    try {
        await channel.edit(editOptions)
    } catch (error) {
        console.error(error)
    }
}