import { ScrollArea, SimpleGrid, Box, Text, LoadingOverlay, Modal } from "@mantine/core"
import { useStyles } from "../../../../styles/Pages.style"
import { useEffect, useState } from "react"
import { IconClearAll, IconHash, IconVolume, IconSpeakerphone, IconMessages } from "@tabler/icons"
import { AddSocketListener, SendMessage } from "../../../misc/WebSocket"
import { ChannelInfo } from "../Info/ChannelInfo"
import { customLoader } from "../../../../styles/Settings.style"

// Will display many of these elements in the list
const Channel = ({name, id, type, setChannelSetted}) => {
    // Sets a different icon depending on the type of channel.
    const icons = {
        "GuildCategory": <IconClearAll size={18}/>,
        "GuildText": <IconHash size={18} />,
        "GuildVoice": <IconVolume size={18} />,
        "GuildNews": <IconSpeakerphone size={18} />,
        "GuildForum": <IconMessages size={18} />,
    }

    // React Element
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



// Channels list
export const ChannelsTab = ({server, tab, setMsgDestiny, setPage}) => {
    const {classes} = useStyles()
    const [channelSetted, setChannelSetted] = useState(false)
    const [channels, setChannels] = useState([])
    
    useEffect(() => {
        AddSocketListener("channels", channels => {
            var new_channels = [];
            new_channels = channels.map(channel => <Channel {...channel} setChannelSetted={setChannelSetted} key={channel.id} />)
            setChannels(new_channels)
        })
    })

    // When the Channels tabbutton is pressed, we will load all the channels.
    useEffect(() => {
        if(tab !== "channels") return

        SendMessage("get_channels", {id:server})
    }, [tab])


    // Removes the channel info section and returns to the list
    useEffect(() => {
        if(!server) return
        setChannelSetted(false)
        setChannels([])

    }, [server])


    // React Element
    return (
        <ScrollArea type="auto" className={classes.scroll} style={{height: "88.5vh"}}>
            { channels.length === 0 && <LoadingOverlay visible overlayBlur={2} loader={customLoader} />}
            {channelSetted 
                ? <ChannelInfo channelId={channelSetted} setChannel={setChannelSetted} serverId={server} setMsgDestiny={setMsgDestiny} setPage={setPage}/> 
                : <SimpleGrid cols={1} spacing={40} verticalSpacing={5}> {channels} </SimpleGrid>
            }
        </ScrollArea>
    )
}