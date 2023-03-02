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
const SetPresence = (server, connection, data) => {
    Discord.setStatus(connection, data)
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


const PostMessage = (server, connection, data) => {
    console.log(data)
    Discord.postMessage(connection, data.type, data.svId, data.id, data.content, data.attachments)
}

const DeleteMessage = (server, connection, data) => {
    Discord.deleteMessage(connection, data.svId, data.chId, data.id)
}


const QueryUser = (server, connection, data) => {
    Discord.queryUser(connection, data.query)
}

const SendUserInfo = (server, connection, data) => {
    Discord.sendUserInfo(connection, data.id)
}


const SendCommands = (server, connection, data) => {
    Discord.sendCommands(connection)
}


const SendCommandInfo = (server, connection, data) => {
    Discord.sendCommandInfo(connection, data.id)
}


const DeleteChannel = (server, connection, data) => {
    Discord.deleteChannel(connection, data.svId, data.id, data.reason)
}


// This object contains all the websockets commands
exports.Commands = {
    "auth":AuthorizeUser,
    "islogged":IsLoggedIn,
    "logout":LogoutUser,

    "set_presence_data":SetPresence,

    "post_message": PostMessage,
    "delete_message": DeleteMessage,
    "send_chat_settings":SendChatSettings,

    "gen_invite":GenerateInvite,
    "gen_channel_invite":GenerateChannelInvite,

    "get_servers":SendServers,
    "get_server_data":SendServerData,

    "get_channels":SendChannels,
    "get_channel_data":SendChannelData,
    "delete_channel":DeleteChannel,

    "get_roles":SendRoles,
    "get_role_data": SendRoleData,
    
    "get_members": SendMembers,
    "get_member_data": SendMemberData,

    "query_user": QueryUser,

    "get_user_info": SendUserInfo,

    "get_commands": SendCommands,
    "get_command_info":SendCommandInfo,
}