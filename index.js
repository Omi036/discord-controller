const { StartWSServer } = require("./src/socket")
const { DiscordConfig } = require("./src/discord")

const port = process.env.VITE_SRVPORT || 5017
const host = process.env.VITE_BIND || "localhost"

const SocketServer = StartWSServer(host, port)
DiscordConfig.socketServer = SocketServer
