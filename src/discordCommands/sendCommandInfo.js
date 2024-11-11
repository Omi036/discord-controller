exports.sendCommandInfo = async (client,connection,id, ApplicationCommandType, ApplicationCommandOption) => {
    var options = []

    const app = await client.application.fetch()
    if(!app) return // if... if it can get isetlf?

    const command = await app.commands.fetch(id)
    if(!command) return // If command does not exist

    for(const option of command.options){
        options.push({name: option.name, description: option.description, type:ApplicationCommandOption[option.type], required: option.required})
    }

    try {
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
    } catch (error) {
        console.error(error)
    }
}