// We import commands that the bot will exec
const { login } = require('./discord');

// Login the discord.js bot with the given token
const AuthorizeUser = (server, connection, data) => {
    login(data)
}

// This object contains all the websockets commands
exports.Commands = {
    "auth":AuthorizeUser,
}