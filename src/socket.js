const { WebSocketServer } = require('ws');
const { Commands } = require('./socketCommands')

// Config Variables
const WSConfig = {
    host: "localhost",
    port: 5017
}

// Starts the server
const StartWSServer = () => {
    // Creates the server
    const server = new WebSocketServer({
        host: WSConfig.host,
        port: WSConfig.port,
    });

    // Link every future conecction with messages
    server.on('connection', (connection) => {

        Commands.islogged(server, connection)

        connection.on('message', (data) => {
            // will try to exec the function from the library
            try {
                // This may be a little complex to explain here, go to the bottom of the script
                try { data = JSON.parse(data.toString())}
                catch(e){ data = JSON.parse(data) }
                Commands[data.header](server, connection, data.content)
            } catch (error) {
                console.error(error)
            }
        });
    });

    // Notify when the server is up
    server.on("listening", () => console.log(`Websockets setted up successfully on ${WSConfig.host}:${WSConfig.port}`))
    return server
}


exports.WSConfig = WSConfig
exports.StartWSServer = StartWSServer