exports.sendCommandInfo = async (client,connection,id, ApplicationCommandType) => {
    var cmds = []

    const app = await client.application.fetch()
    const command = await app.commands.fetch(id)

    connection.send(JSON.stringify({
        header:"command_info",
        content: {
            name:command.name,
            id:command.id,
            description:command.description,
            createdAt:command.createdAt,
            isNsfw:command.nsfw,
            isAvailableInDm:command.dmPermission ? command.dmPermission : false,
            type:ApplicationCommandType[command.type],
            guild:command.guild || "None",
            options:[]
        }
    }))
}