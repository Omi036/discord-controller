import { ScrollArea, SimpleGrid, Flex, Text, LoadingOverlay, useMantineTheme, Button } from "@mantine/core"
import { useStyles } from "../../../../styles/Pages.style"
import { useEffect, useState } from "react"
import { AddSocketListener, SendMessage } from "../../../misc/WebSocket"
import { ChannelInfo } from "../Info/ChannelInfo"
import { customLoader } from "../../../../styles/LogIn.style"
import { channelIcons } from "../../../misc/Enums"
import { CreateChannelModal } from "../Info/CreateChannelModal"


const Channel = ({name, id, type, setChannelSetted}) => {
    const theme = useMantineTheme()

    return(
    <Flex 
        p={10}
        direction="row"
        align="center"
        ml={type==="GuildCategory" ? 0 : 20}
        bg={theme.colors.dark[6]}
        onClick={()=>{setChannelSetted(id)}}
        sx={{
            boxSizing:"border-box",
            border:`1px solid ${theme.colors.dark[4]}`,
            borderRadius: 5,
            cursor:"pointer",
            "&:hover":{
                border:`1px solid ${theme.colors.dark[3]}`,
                backgroundColor: theme.colors.dark[5],
            }
        }}
    >
        {channelIcons[type]}
        <Text color={theme.colors.dark[2]} ml={10}> {name} </Text>
        <Text color={theme.colors.dark[3]} ml="auto"> {id} </Text>
    </Flex>)
}

const CreateChannel = ({setOpened}) => {
    const theme = useMantineTheme()

    return (
        <Button color="indigo"  onClick={() => setOpened(true)} fullWidth>
            Create new Channel
        </Button>

    )
}



export const ChannelsTab = ({server, tab, setMsgDestiny, setCurrentPage}) => {
    const [openedNewChannelModal, setOpenedNewChannelModal] = useState(false)
    const {classes} = useStyles()
    const [channelSetted, setChannelSetted] = useState(false)
    const [channels, setChannels] = useState([])

    
    useEffect(() => {
        AddSocketListener("channels", channels => {
            const updatedChannels = channels.map(channel => <Channel {...channel} setChannelSetted={setChannelSetted} key={channel.id} />)
            setChannels(updatedChannels)
        })
    })


    useEffect(() => {
        if(tab === "channels") SendMessage("get_channels", {id:server})
    }, [tab])



    useEffect(() => {
        if(!server) return
        setChannelSetted(false)
        setChannels([])
    }, [server])


    
    return (
        <>
        <CreateChannelModal svid={server} opened={openedNewChannelModal} setOpened={setOpenedNewChannelModal}/>
        <ScrollArea type="auto" className={classes.scroll} h="88.5vh">
            { channels.length === 0 && <LoadingOverlay visible overlayBlur={2} loader={customLoader} />}
            { channelSetted 
                ? <ChannelInfo channelId={channelSetted} setChannel={setChannelSetted} serverId={server} setMsgDestiny={setMsgDestiny} setCurrentPage={setCurrentPage}/> 
                : <SimpleGrid cols={1} spacing={40} verticalSpacing={5}> <CreateChannel setOpened={setOpenedNewChannelModal}/> {channels} </SimpleGrid>
            }
        </ScrollArea>
        </>
    )
}