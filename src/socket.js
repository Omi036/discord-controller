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
        connection.on('message', (data) => {
            // will try to exec the function from the library
            try {
                // This may be a little complex to explain here, go to the bottom of the script
                try { data = JSON.parse(data.toString())}
                catch(e){ data = JSON.parse(data) }
                // data = JSON.parse(data);
                console.log(data)
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


/* Explanation of Websockets here

    We have our server (This script)

    And we have the client (The browser)

    They both comunicate using strings and not objects

    That's why we JSON.stringify the message in the sender and JSON.parse in the receiver

    All the messages has to follow the following structure:

    message = {
        header: "auth",   - Name of the command to exec, it can't have spaces
        content: ...      - Whatever you want to send
    }

    We then JSON.stringify it and send it to the server/client

    Finally, we JSON.parse it, and exec the message.header command with the message.content

    That works viceversa.

*/
