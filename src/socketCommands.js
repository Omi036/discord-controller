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

// This generates an invites with custom invites
const GenerateInvite = (server, connection, data) => {
    Discord.genInvite(data)
}

// Sends a list of all the avaiable servers
const SendServers = (server, connection, data) => {
    Discord.sendServers()
}

// Sends data from a server
const SendServerData = (server, connection, data) => {
    Discord.sendServerData(data.id)
}



// This object contains all the websockets commands
exports.Commands = {
    "auth":AuthorizeUser,
    "islogged":IsLoggedIn,
    "logout":LogoutUser,
    "change_status":ChangeStatus,
    "gen_invite":GenerateInvite,
    "get_servers":SendServers,
    "get_server_data":SendServerData,
}