// We import commands that the bot will exec
const Discord = require('./discord');

// Login the discord.js bot with the given token
const AuthorizeUser = (server, connection, data) => {
    Discord.login(data)
}

// If a bot is connected, there is no need to go again throught the login process
// This function handles that
const IsLoggedIn = (server, connection, data) => {
    try { Discord.isOnline()
    } catch (_) {}
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
    Discord.genInvite(connection, data)
}

// Sends a list of all the avaiable servers
const SendServers = (server, connection, data) => {
    Discord.sendServers(connection)
}

// Sends data from a server
const SendServerData = (server, connection, data) => {
    Discord.sendServerData(connection, data.id)
}

// This sends a list of all the channels avaiable
const SendChannels = (server, connection,data) => {
    Discord.sendChannels(connection, data.id)
}

// Sends data from a specific channel
const SendChannelData = (server, connection, data) => {
    Discord.sendChannelData(connection, data.svId, data.id)
}

const SendRoles = (server, connection, data) => {
    Discord.sendRoles(connection, data.id)
}

const SendRoleData = (server, connection, data) => {
    Discord.sendRoleData(connection, data.svId, data.id)
}

const SendMembers = (server, connection, data) => {
    Discord.sendMembers(connection, data.svId)
}

const SendMemberData = (server, connection, data) => {
    Discord.sendMemberData(connection, data.svId, data.id)
}


const GenerateChannelInvite = (server, connection, data) => {
    Discord.genChannelInvite(connection, data.svId, data.id, data.settings)
}

const SendChatSettings = (server, connection, data) => {
    Discord.sendChatSettings(connection, data.type, data.svId, data.id)
}


// This object contains all the websockets commands
exports.Commands = {
    "auth":AuthorizeUser,
    "islogged":IsLoggedIn,
    "logout":LogoutUser,
    "change_status":ChangeStatus,
    "send_chat_settings":SendChatSettings,
    "gen_invite":GenerateInvite,
    "gen_channel_invite":GenerateChannelInvite,

    "get_servers":SendServers,
    "get_server_data":SendServerData,

    "get_channels":SendChannels,
    "get_channel_data":SendChannelData,

    "get_roles":SendRoles,
    "get_role_data": SendRoleData,
    
    "get_members": SendMembers,
    "get_member_data": SendMemberData,
}