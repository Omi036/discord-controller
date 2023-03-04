exports.setStatus = (client, connection, rawPresence, refresh) => {
    const presence = {
        status: rawPresence.status,
        activities:[]
    }

    if(rawPresence.type != "-1"){
        presence.activities.push(
            {
                name: rawPresence.name,
                type: parseInt(rawPresence.type)
            }
        )
    }

    client.user.setPresence(presence)
    refresh()
}