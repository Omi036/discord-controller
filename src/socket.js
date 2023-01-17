const { WebSocketServer } = require('ws');

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
        connection.on('message', (data) => {console.log('received: %s', data);
        });
    });

    // Notify when the server is up
    server.on("listening", () => console.log(`Websockets setted up successfully on ${WSConfig.host}:${WSConfig.port}`))
}


exports.WSConfig = WSConfig
exports.StartWSServer = StartWSServer