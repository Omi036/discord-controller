const { HTTPConfig, StartHTTPServer } = require("./src/http")
const { WSConfig, StartWSServer } = require("./src/socket")
const { DiscordConfig } = require("./src/discord")

StartHTTPServer()
const SocketServer = StartWSServer()
DiscordConfig.socketServer = SocketServer