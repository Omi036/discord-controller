const open = require("open")
const { WSConfig, StartWSServer } = require("./src/socket")
const { DiscordConfig } = require("./src/discord")

const SocketServer = StartWSServer()
DiscordConfig.socketServer = SocketServer
open("http://localhost:5018/")