exports.setStatus = (client, connection, rawPresence, refresh) => {
    const presence = {
        status: rawPresence.status,
        activities:[]
    }
    console.log(rawPresence)
    console.log(rawPresence.type)
    console.log(rawPresence.type != "-1")
    if(rawPresence.type != "-1"){
        presence.activities.push(
            {
                name: rawPresence.name,
                type: parseInt(rawPresence.type)
            }
        )
    }

    client.user.setPresence(presence)
    console.log("A")
    refresh()
}