exports.leaveServer = async (client, connection, svId, refreshServers) => { // Does this even work?
    const sv = await client.guilds.cache.find(server => server.id === svId)
    if(!sv) return // If no server found

    try {
        await sv.leave()
        await refreshServers(connection)
        
    } catch (error) {
        console.error(error)
    }
}