exports.sendCommands = async (client, connection) => {
    var cmds = []

    const app = await client.application.fetch()
    const commands = await app.commands.fetch()

    for(var command of commands) {
        command = command[1]
        cmds.push({name:command.name, id:command.id})
    }

    connection.send(JSON.stringify({
        header:"commands",
        content: cmds
    }))
}