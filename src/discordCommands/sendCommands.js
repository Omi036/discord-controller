exports.sendCommands = async (client, connection) => {
    var cmds = []

    const app = await client.application.fetch()
    if(!app) return // If it cant get itself (?

    const commands = await app.commands.fetch()
    if(!command) return // If cant get commands

    for(var command of commands) {
        command = command[1]
        cmds.push({name:command.name, id:command.id})
    }

    try {
        connection.send(JSON.stringify({
            header:"commands",
            content: cmds
        }))
    } catch (error) {
        console.error(error)
    }
}