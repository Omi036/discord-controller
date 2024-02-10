import { IconRobot, IconMessage, IconCode, IconServer, IconUser, IconMessages, IconClearAll, IconHash, IconVolume, IconSpeakerphone, IconPlus } from "@tabler/icons";

// Sidebar.jsx
export const sidebarLinks = [
    {label: "Client", icon: IconRobot},
    {label: "Servers", icon: IconServer },
    {label: "Users", icon: IconUser },
    {label: "Commands", icon: IconCode },
    {label: "Messages", icon: IconMessage },
];


export const defaultProfile = {
    avatar:undefined,
     username:"Dummy#0000"
}



// Settings.jsx
export const setteable_intents = ["GuildMembers","MessageContent","GuildPresences"]
export const defaults_intents = {
    "Guilds":true,
    "GuildMembers": false,
    "GuildBans": true,
    "GuildIntegrations": true,
    "GuildEmojisAndStickers": true,
    "GuildWebhooks": true ,
    "GuildInvites": true,
    "GuildVoiceStates": false,
    "GuildPresences": false,
    "GuildMessages": true,
    "GuildMessageReactions": false,
    "GuildMessageTyping": false,
    "GuildScheduledEvents": false,
    "DirectMessages": true,
    "DirectMessageReactions": false,
    "DirectMessageTyping": false,
    "MessageContent": false,
    "AutoModerationConfiguration": true,
    "AutoModerationExecution": true
}


export const intentsLayoutScheme = [
    {label:"Minimum", value:"minimum"},
    {label:"Default", value:"default"},
    {label:"All", value:"all"},
    {label:"All Default-Enabled", value:"defaultdisabled"}
]


// Client/Page.jsx
export const defaultSettings = {
    client: {
        guilds:0,
        channels:0,
        token:"",
        initializedAt:""
    },
    user: {
        verified: false,
        status:"",
        tag:"",
        id:"",
        avatarURL:"",
        createdAt:new Date(),
    },
    app: {
        public: false,
        codeGrant: false,
        name:"",
        description:"",
        owner:"",
        id:"",
        tags:"",
        iconURL:"",
        commands:0,
        createdAt:""
    }
}


// Client/InviteModal.jsx
export const defaultPermissions = {
    AddReactions: true,
    Administrator: false,
    AttachFiles: false,
    BanMembers: false,
    ChangeNickname: false,
    Connect: true,
    CreateInstantInvite: false,
    CreatePrivateThreads: false,
    CreatePublicThreads: false,
    DeafenMembers: false,
    EmbedLinks: false,
    KickMembers: false,
    ManageChannels: true,
    ManageEmojisAndStickers: false,
    ManageEvents: false,
    ManageGuild: false,
    ManageMessages: true,
    ManageNicknames: false,
    ManageRoles: true,
    ManageThreads: false,
    ManageWebhooks: false,
    MentionEveryone: true,
    ModerateMembers: false,
    MoveMembers: false,
    MuteMembers: false,
    PrioritySpeaker: false,
    ReadMessageHistory: true,
    RequestToSpeak: false,
    SendMessages: true,
    SendMessagesInThreads: false,
    SendTTSMessages: false,
    Speak: true,
    Stream: false,
    UseApplicationCommands: true,
    UseEmbeddedActivities: false,
    UseExternalEmojis: true,
    UseExternalStickers: true,
    UseVAD: false,
    ViewAuditLog: false,
    ViewChannel: true,
    ViewGuildInsights: false
}


export const possibleLayouts = [
    { label: "None", value: "none" },
    { label: "Default", value: "default" },
    { label: "All", value: "all" },
    { label: "Admin", value: "admin"}
]



// Client/UserSection.jsx
export const defaultPresence = {
    status:"online",
    type:"0",
    device:"web",
    name:"A name"
}


export const possibleStatus = [
    { label: "Online", value: "online" },
    { label: "Idle", value: "idle" },
    { label: "DnD", value: "dnd" },
    { label: "Invisible", value: "invisible" }
]

export const possibleDevices = [
    {value:"web",label:"Web"},
    {value:"mobile",label:"Mobile"},
    {value:"desktop",label:"Desktop"}
]


export const noActivity = "-1"
export const possibleActivityType = [
    {value:"5", label:"Competing"},
    {value:"4", label:"Custom"},
    {value:"3", label:"Watching"},
    {value:"2", label:"Listening"},
    {value:"1", label:"Streaming"},
    {value:"0", label:"Playing"},
    {value:"-1", label:"None"}
]


// Chat/Chat.jsx
export const defaultChatSettings = {
    name: "Channel",
    id: "000000000000000000",
    messages:[]
}

export const defaultEmbed = {
    title:"",
    json:""
}


// Servers/GeneralTab.jsx
export const defaultServerInfo = {
    users: 0,
    channels: 0,
    roles: 0,
    bans: 0,
    emojis: 0,
    stickers: 0,
    isVerified: false,
    isPartenered: false,
    name: "Dummy",
    description: "You haven't selected a server yet",
    id:"000000000000000000",
    owner:"Dummy#0000",
    iconUrl:"",
    language:"",
    createdAt:"",
    joinedAt:"",
    verificationLevel: 0,
    boostTier: 0,
    explicitFilter: 0,
    nsfwLevel: 0
}


// Server/Info/CreateInviteModal.jsx
export const UsesMarks = [
    { value: 20, label: '20%' },
    { value: 50, label: '50%' },
    { value: 80, label: '80%' }
]


// Server/Info/ChannelInfo.jsx
export const defaultChannelInfo = {
    name:"",
    id:"000000000000000000",
    type:"",
    url:"",
    createdAt:"",
    manageable:false,
    messageable: false,
    viewable:false,
    deletable: false,
    messages: 0,
    nsfw: false,
    rateLimit: 0,
    topic: "",
    bitrate: "",
    isFull: false,
    joinable: false,
    rtcRegion: "none",
    speakable: false,
    userLimit: 0,
    members: 0,
    avaiableTags: [],
    defaultDuration: "0"
}


// Server/Info/RoleInfo.jsx
export const defaultRoleInfo = {
    name: "Role",
    id: "000000000000000000",
    hexColor: "#99aab5",
    hoist: false,
    editable: false,
    managed: false,
    mentionable: false,
    createdAt: "",
    icon: "",
    members: 0,
    position: 0,
    tags: [],
    permissions:[],
    unicodeEmoji:""
}

export const permLists = [
    "AddReactions",
    "Administrator",
    "AttachFiles",
    "BanMembers",
    "ChangeNickname",
    "Connect",
    "CreateInstantInvite",
    "CreatePrivateThreads",
    "CreatePublicThreads",
    "DeafenMembers",
    "EmbedLinks",
    "KickMembers",
    "ManageChannels",
    "ManageEmojisAndStickers",
    "ManageEvents",
    "ManageGuild",
    "ManageMessages",
    "ManageNicknames",
    "ManageRoles",
    "ManageThreads",
    "ManageWebhooks",
    "MentionEveryone",
    "ModerateMembers",
    "MoveMembers",
    "MuteMembers",
    "PrioritySpeaker",
    "ReadMessageHistory",
    "RequestToSpeak",
    "SendMessages",
    "SendMessagesInThreads",
    "SendTTSMessages",
    "Speak",
    "Stream",
    "UseApplicationCommands",
    "UseEmbeddedActivities",
    "UseExternalEmojis",
    "UseExternalStickers",
    "UseVAD",
    "ViewAuditLog",
    "ViewChannel",
    "ViewGuildInsight"
]

// Server/Info/MemberInfo.jsx
export const defaultMemberSettings = {
    bannable: false,
    kickable: false,
    manageable: false,
    moderatable: false,
    isSystem: false,
    isBot: false,
    tag:"Dummy#0000",
    nickname: "Dumi", 
    id: "000000000000000000", 
    avatar:"https://img.img", 
    banner: "https://img.img",
    accentColor: "#000000",
    createdAt: "",
    joinedAt: "",
    status: "offline",
    statusDevice: "desktop",
    roles: [],
    badges: [],
    permissions: [],
}


// Commands/CmdInfoSection.jsx
export const defaultCommandData = {
    name:"",
    id:"000000000000000000", 
    description:"",
    createdAt:"",
    isNsfw:false,
    isAvailableInDm:false,
    type:"",
    guild:"",
    options:[],
    localizations:{name:{},description:{}}
}

// Servers/Tabs/ChannelsTab.jsx
export const channelIcons = {
    "GuildCategory": <IconClearAll size={18}/>,
    "GuildText": <IconHash size={18} />,
    "GuildVoice": <IconVolume size={18} />,
    "GuildNews": <IconSpeakerphone size={18} />,
    "GuildForum": <IconMessages size={18} />,
    "CreateNew": <IconPlus size={18} />
}


// Users/UserInfoSection.jsx
export const defaultUserData = {
    isSystem:false, 
    isBot:false, 
    tag: "",
    id: "000000000000000000", 
    createdAt: "", 
    accentColor: "Default",
    avatarUrl: "",
    banner: "",
    flags:[],
}


export const userFlagsList = [
    "ActiveDeveloper",
    "BotHTTPInteractions",
    "BugHunterLevel1",
    "BugHunterLevel2",
    "CertifiedModerator",
    "HypeSquadOnlineHouse1",
    "HypeSquadOnlineHouse2",
    "HypeSquadOnlineHouse3",
    "Hypesquad",
    "Partner",
    "PremiumEarlySupporter",
    "Quarantined",
    "Spammer",
    "Staff",
    "TeamPseudoUser",
    "VerifiedBot",
    "VerifiedDeveloper"
]

export const regions = [
    {label:"Automatic", value:null},
    {label:"Brazil", value:"brazil"},
    {label:"Hong Kong", value:"hongkong"},
    {label:"India", value:"india"},
    {label:"Japan", value:"japan"},
    {label:"Rotterdam", value:"rotterdam"},
    {label:"Russia", value:"russia"},
    {label:"Singapore", value:"singapore"},
    {label:"South Africa", value:"southafrica"},
    {label:"Sydney", value:"sydney"},
    {label:"US Central", value:"us-central"},
    {label:"US East", value:"us-east"},
    {label:"US South", value:"us-south"},
    {label:"US West", value:"us-west"},
]