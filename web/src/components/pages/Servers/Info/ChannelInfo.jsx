import { ScrollArea, SimpleGrid, Box, TextInput, Text, ActionIcon, Checkbox, LoadingOverlay } from "@mantine/core"
import { AddSocketListener, SendMessage } from "../../../misc/WebSocket"
import { IconArrowBack } from "@tabler/icons"
import { useState, useEffect } from "react"
import { TextDisplay } from "../../../misc/TextDisplay"
import { customLoader } from "../../../../styles/Settings.style"

// Contains info about a channel
export const ChannelInfo = ({channelId, setChannel, serverId}) => {
    const defaultChannelInfo = {
        name:"Channel",
        id:"000000000000000000",
        type:"",
        url:"",
        createdAt:"",
        manageable:false,
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
    const [channelInfo, setChannelInfo] = useState(defaultChannelInfo)

    // Updates the channel info
    useEffect(() => {
        AddSocketListener("channel_data", (data) => {
            const new_info = {...defaultChannelInfo}
            for(const key in data){ new_info[key] = data[key] }
            setChannelInfo(new_info)
        })
    })

    // When a new channel is selected, will request new data
    useEffect(() => {
        SendMessage("get_channel_data", {svId:serverId,id:channelId})
    },[channelId])
    
    return (
        <>
            { channelInfo.id === "000000000000000000" ? <LoadingOverlay visible overlayBlur={0} loader={customLoader} /> : <></> }
            <Box sx={(theme) => ({borderBottom: `2px solid ${theme.colors.dark[4]}`, display:"flex", marginBottom:5})}>
                <ActionIcon onClick={()=>{setChannel(false)}}>
                    <IconArrowBack />
                </ActionIcon>
                <Text style={{marginLeft:10}}>{channelInfo.name}</Text>
                <Text sx={(theme) => ({marginLeft:"auto", marginBottom:10, color:theme.colors.dark[3]})}>{channelInfo.id}</Text>
            </Box>
            <ScrollArea>
                <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginBottom:10}}>
                    {["GuildText","GuildVoice","GuildNews"].includes(channelInfo.type) && <TextDisplay value={channelInfo.messages} label={"Messages"} />}
                    {channelInfo.type === "GuildVoice" && <TextDisplay label={"Users Limits"} value={channelInfo.userLimit} />}
                </Box>
                <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginBottom:10}}>
                    {channelInfo.type === "GuildVoice" && <TextDisplay label={"Members Connected"} value={channelInfo.members} />}
                </Box>
                <SimpleGrid cols={2} style={{marginBottom: 10}}>
                    <Checkbox  readOnly color={"indigo"} label="Manageable by bot" checked={channelInfo.manageable} />
                    <Checkbox  readOnly color={"indigo"} label="Viewable by bot" checked={channelInfo.viewable} />
                    <Checkbox  readOnly color={"indigo"} label="Deletable by bot" checked={channelInfo.deletable} />
                    {["GuildStage","GuildVoice"].includes(channelInfo.type) && <Checkbox  readOnly color={"indigo"} label="Joinable by Bot" checked={channelInfo.joinable} />}
                    {["GuildStage","GuildVoice"].includes(channelInfo.type) && <Checkbox  readOnly color={"indigo"} label="Full" checked={channelInfo.isFull} />}
                    {channelInfo.type === "GuildVoice" && <Checkbox  readOnly color={"indigo"} label="Bot can Speak" checked={channelInfo.speakable} />}
                    {["GuildText","GuildVoice","GuildForum", "GuildNews"].includes(channelInfo.type) && <Checkbox  readOnly color={"indigo"} label="NSFW" checked={channelInfo.nsfw} />}
                </SimpleGrid>
                <SimpleGrid cols={2}>
                    <TextInput readOnly label="Name" value={channelInfo.name}/>
                    <TextInput readOnly label="Id" value={channelInfo.id}/>
                    <TextInput readOnly label="Type" value={channelInfo.type}/>
                    <TextInput readOnly label="Url" value={channelInfo.url}/>
                    <TextInput readOnly label="Created At" value={new Date(channelInfo.createdAt)}/>
                    <TextInput readOnly label="Topic" value={channelInfo.topic} />
                    {["GuildText","GuildVoice","GuildForum"].includes(channelInfo.type) && <TextInput readOnly label="Text Timeout" value={`${channelInfo.rateLimit}s`}/>}
                    {channelInfo.type === "GuildVoice" && <TextInput readOnly label="Bit Rate" value={channelInfo.bitrate}/>}
                    {channelInfo.type === "GuildVoice" && <TextInput readOnly label="Voice Region" value={channelInfo.rtcRegion}/>}
                    {channelInfo.type === "GuildForum" && <TextInput readOnly label="Tags Avaiable" value={channelInfo.avaiableTags}/>}
                    {channelInfo.type === "GuildForum" && <TextInput readOnly label="Archive At" value={channelInfo.defaultDuration / 60 / 60}/>}
                </SimpleGrid>
            </ScrollArea>
        </>
    )
}