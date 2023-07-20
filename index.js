const { StartWSServer } = require("./src/socket")
const { DiscordConfig } = require("./src/discord")

const SocketServer = StartWSServer("localhost", 5017)
DiscordConfig.socketServer = SocketServer