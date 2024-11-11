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

    try {
        client.user.setPresence(presence)
        refresh()
        
    } catch (error) {
        console.error(error)
    }
}