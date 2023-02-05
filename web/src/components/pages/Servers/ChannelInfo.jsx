import { ScrollArea, SimpleGrid, Box, TextInput, Text, ActionIcon, Checkbox } from "@mantine/core"
import { AddSocketListener, SendMessage } from "../../misc/WebSocket"
import { IconArrowBack } from "@tabler/icons"
import { useState, useEffect } from "react"
import { TextDisplay } from "../../misc/TextDisplay"

export const ChannelInfo = ({channelId, setChannel, serverId}) => {
    const channelData = {
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
    const [data, setData] = useState(channelData)

    useEffect(() => {
        AddSocketListener("channel_data", (data) => {
            const new_data = {...data}
            Object.keys(data).forEach(key => {new_data[key] = data[key]})
            setData(new_data)
        })
    })

    useEffect(() => {
        SendMessage("get_channel_data", {svId:serverId,id:channelId})
    },[channelId])

    console.log(data.name)
    
    return (
        <>
            <Box sx={(theme) => ({borderBottom: `2px solid ${theme.colors.dark[4]}`, display:"flex", marginBottom:5})}>
                <ActionIcon onClick={()=>{setChannel(false)}}>
                    <IconArrowBack />
                </ActionIcon>
                <Text style={{marginLeft:10}}>{data.name}</Text>
                <Text sx={(theme) => ({marginLeft:"auto", marginBottom:10, color:theme.colors.dark[3]})}>{data.id}</Text>
            </Box>
            <ScrollArea>
                <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginBottom:10}}>
                    {["GuildText","GuildVoice","GuildNews"].includes(data.type) && <TextDisplay value={data.messages} label={"Messages"} />}
                    {data.type === "GuildVoice" && <TextDisplay label={"Users Limits"} value={data.userLimit} />}
                </Box>
                <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginBottom:10}}>
                    {data.type === "GuildVoice" && <TextDisplay label={"Members Connected"} value={data.members} />}
                </Box>
                <SimpleGrid cols={2} style={{marginBottom: 10}}>
                    <Checkbox  readOnly color={"indigo"} label="Manageable by bot" checked={data.manageable} />
                    <Checkbox  readOnly color={"indigo"} label="Viewable by bot" checked={data.viewable} />
                    <Checkbox  readOnly color={"indigo"} label="Deletable by bot" checked={data.deletable} />
                    {["GuildStage","GuildVoice"].includes(data.type) && <Checkbox  readOnly color={"indigo"} label="Joinable by Bot" checked={data.joinable} />}
                    {["GuildStage","GuildVoice"].includes(data.type) && <Checkbox  readOnly color={"indigo"} label="Full" checked={data.isFull} />}
                    {data.type === "GuildVoice" && <Checkbox  readOnly color={"indigo"} label="Bot can Speak" checked={data.speakable} />}
                    {["GuildText","GuildVoice","GuildForum", "GuildNews"].includes(data.type) && <Checkbox  readOnly color={"indigo"} label="NSFW" checked={data.nsfw} />}
                </SimpleGrid>
                <SimpleGrid cols={2}>
                    <TextInput readOnly label="Name" value={data.name}/>
                    <TextInput readOnly label="Id" value={data.id}/>
                    <TextInput readOnly label="Type" value={data.type}/>
                    <TextInput readOnly label="Url" value={data.url}/>
                    <TextInput readOnly label="Created At" value={data.createdAt}/>
                    <TextInput readOnly label="Topic" value={data.topic} />
                    {["GuildText","GuildVoice","GuildForum"].includes(data.type) && <TextInput readOnly label="Text Timeout" value={`${data.rateLimit}s`}/>}
                    {data.type === "GuildVoice" && <TextInput readOnly label="Bit Rate" value={data.bitrate}/>}
                    {data.type === "GuildVoice" && <TextInput readOnly label="Voice Region" value={data.rtcRegion}/>}
                    {data.type === "GuildForum" && <TextInput readOnly label="Tags Avaiable" value={data.avaiableTags}/>}
                    {data.type === "GuildForum" && <TextInput readOnly label="Archive At" value={data.defaultDuration / 60 / 60}/>}
                </SimpleGrid>
            </ScrollArea>
        </>
    )
}