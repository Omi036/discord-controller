const { WSConfig, StartWSServer } = require("./src/socket")
const { DiscordConfig } = require("./src/discord")

const SocketServer = StartWSServer()
DiscordConfig.socketServer = SocketServer

require("open")("http://localhost:5018/")