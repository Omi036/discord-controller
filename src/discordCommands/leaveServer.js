exports.leaveServer = async (client, connection, svId, refreshServers) => {
    const sv = client.guilds.cache.find(server => server.id === svId)
    await sv.leave()

    refreshServers(connection)
}