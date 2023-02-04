import { ScrollArea, SimpleGrid, TextInput, Box, Text } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { useEffect, useState } from "react"
import { IconClearAll, IconHash, IconVolume, IconSpeakerphone, IconMessages } from "@tabler/icons"
import { AddSocketListener, SendMessage } from "../../misc/WebSocket"
import { ChannelInfo } from "./ChannelInfo"

const Channel = ({name, id, type, setChannelSetted}) => {
    const icons = {
        "GuildCategory": <IconClearAll size={18}/>,
        "GuildText": <IconHash size={18} />,
        "GuildVoice": <IconVolume size={18} />,
        "GuildNews": <IconSpeakerphone size={18} />,
        "GuildForum": <IconMessages size={18} />,
    }

    return(
    <Box sx={(theme)=>({
        boxSizing:"border-box",
        padding:10,
        display:"flex",
        flexDirection: "row",
        alignItems:"center",
        marginLeft: type==="GuildCategory" ? 0 : 20,
        border:`1px solid ${theme.colors.dark[4]}`,
        backgroundColor: theme.colors.dark[6],
        borderRadius: 5,
        cursor:"pointer",
        "&:hover":{
            border:`1px solid ${theme.colors.dark[3]}`,
            backgroundColor: theme.colors.dark[5],
        }
    })} onClick={()=>{setChannelSetted(id)}}>
        {icons[type]}
        <Text sx={(theme)=>({marginLeft:10, color:theme.colors.dark[2]})}>{name}</Text>
        <Text sx={(theme)=>({marginLeft:"auto", color:theme.colors.dark[3]})}>{id}</Text>
    </Box>)
}

export const ChannelsTab = ({server, tab}) => {
    const {classes} = useStyles()
    const [channelSetted, setChannelSetted] = useState(false)
    const [channels, setChannels] = useState()
    
    useEffect(() => {
        AddSocketListener("channels", channels => {
            var new_channels = [];

            channels.forEach(channel => {
                new_channels.push(<Channel {...channel} setChannelSetted={setChannelSetted} key={channel.id} />)
            })

            setChannels(new_channels)
        })
    })

    // When the Channels tabbutton is pressed, we will load all the channels.
    useEffect(() => {
        if(tab !== "channels") return

        SendMessage("get_channels", {id:server})
    }, [tab])

    useEffect(() => {
        if(!server) return
        setChannelSetted(false)

    }, [server])


    return (
        <ScrollArea type="auto" className={classes.scroll} style={{height: "88.5vh"}}>
            {channelSetted ? 
            <ChannelInfo channelId={channelSetted} setChannel={setChannelSetted} serverId={server}/> : 
            <SimpleGrid cols={1} spacing={40} verticalSpacing={5}>
                {channels}
            </SimpleGrid>
            }
            
        </ScrollArea>
    )
}