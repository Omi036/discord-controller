const { WebSocketServer } = require('ws');
const { Commands } = require('./socketCommands')


const StartWSServer = (host, port) => {
    const server = new WebSocketServer({
        host: host,
        port: port,
    });


    server.on('connection', (connection) => {
        Commands.islogged(server, connection) // Is the bot online?

        connection.on('message', (data) => {

            try {
                data = JSON.parse(data.toString())
                Commands[data.header](server, connection, data.content)
                
            } catch (error) {
                console.error(error)
            }
        });
    });


    server.on("listening", () => console.log(`Websockets setted up successfully on ${host}:${port}`))
    server.on("error", (error) => console.error(error))
    return server
}


exports.StartWSServer = StartWSServer