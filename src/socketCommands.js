// We import commands that the bot will exec
const Discord = require('./discord');

// Login the discord.js bot with the given token
const AuthorizeUser = (server, connection, data) => {
    Discord.login(data)
}

// If a bot is connected, there is no need to go again throught the login process
// This function handles that
const IsLoggedIn = (server, connection, data) => {
    Discord.isOnline()
}

// Logout the bot
const LogoutUser = (server, connection, data) => {
    Discord.logout()
}

// Changes the status of the bot
const ChangeStatus = (server, connection, data) => {
    Discord.setStatus(data)
}

const GenerateInvite = (server, connection, data) => {
    Discord.genInvite(data)
}

// This object contains all the websockets commands
exports.Commands = {
    "auth":AuthorizeUser,
    "islogged":IsLoggedIn,
    "logout":LogoutUser,
    "change_status":ChangeStatus,
    "gen_invite":GenerateInvite,
}