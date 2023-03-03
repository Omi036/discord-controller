exports.sendCommandInfo = async (client,connection,id, ApplicationCommandType, ApplicationCommandOption) => {
    var options = []

    const app = await client.application.fetch()
    const command = await app.commands.fetch(id)

    for(const option of command.options){
        options.push({name: option.name, description: option.description, type:ApplicationCommandOption[option.type], required: option.required})
    }

    connection.send(JSON.stringify({
        header:"command_info",
        content: {
            name:command.name,
            id:command.id,
            description:command.description,
            createdAt:command.createdAt,
            isNsfw:command.nsfw ? command.nsfw : false,
            isAvailableInDm:command.dmPermission ? command.dmPermission : false,
            type:ApplicationCommandType[command.type],
            guild:command.guild || "None",
            options:options,
            localizations:{name:command.nameLocalizations, description:command.descriptionLocalizations}
        }
    }))
}