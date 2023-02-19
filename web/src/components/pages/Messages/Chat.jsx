import { Paper, Box, Text, ActionIcon, ScrollArea, Textarea, LoadingOverlay, Popover, Button, FileButton } from "@mantine/core"
import { customLoader } from "../../../styles/Settings.style"
import { useStyles } from "../../../styles/Pages.style"
import { IconAt, IconArrowBack, IconPlus, IconPaperclip, IconFile } from "@tabler/icons"
import { useMantineTheme } from "@mantine/core"
import { useEffect, useState, useRef } from "react"
import { AddSocketListener, SendMessage } from "../../misc/WebSocket"
import { Message } from "./Message"
import { AddEmbedModal } from "./AddEmbedModal"


export const Chat = ({destiny, setDestiny}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()
    const messageInput = useRef()
    const defaultSettings = {
        name: "Channel",
        id: "000000000000000000",
        messages:[]
    }
    const [settings, setSettings] = useState(defaultSettings)
    const [embedModalOpened, setEmbedModalOpened] = useState(false)
    const [files, setFiles] = useState([])

    useEffect(() => {
        AddSocketListener("chat_settings", settings => {
            setSettings(settings)
        })
    })
    

    useEffect(() => {
        SendMessage("send_chat_settings", {type:destiny.type, svId: destiny.svId, id:destiny.id})
    },[destiny])


    var messagesElements = []
    for(const message of settings.messages) {
        messagesElements.push(
        <Message 
            svId={destiny.svId}
            channelId={settings.id}
            key={message.id} 
            attachments={message.attachments} 
            user={message.author} 
            avatar={message.authorAvatar} 
            content={message.content}
            embeds={message.embeds}
            id={message.id}
         />)
    }

    const keyHandler = e => {
        if(e.keyCode !== 13) return
        if(e.shiftKey) {
            e.preventDefault()
            messageInput.current.value += "\n"
            return
        }
        if(!messageInput.current.value.length >= 1) return

        e.preventDefault()
        SendMessage("post_message", {type:destiny.type, svId: destiny.svId, id:destiny.id, content:messageInput.current.value})
        messageInput.current.value = ""
    }

    const AddAttachElement = () => {
        return (
            <Popover width={200} position="top" withArrow shadow="md">
                <Popover.Target>
                    <ActionIcon style={{marginRight:80}}>
                        <IconPlus />
                    </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                    <Button variant="subtle" color="gray" sx={{display:"flex", marginBottom:5}} fullWidth leftIcon={<IconPlus />} onClick={()=>setEmbedModalOpened(true)}>Add Embed</Button>
                    <FileButton onChange={setFiles} multiple>
                        {(props) => <Button variant="subtle"  {...props} color="gray" sx={{display:"flex"}} fullWidth leftIcon={<IconPlus />}>Add File</Button>}
                    </FileButton>
                </Popover.Dropdown>
            </Popover>
        )
    }


    const AttachList = () => {
        return (
            <Popover width={files.length >=1 ? 500 : 10} position="top" withArrow shadow="md">
                <Popover.Target>
                    <ActionIcon style={{marginRight:10}}>
                        <IconPaperclip />
                    </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown style={{display:"grid", gridTemplateColumns: "repeat(3, 33%)", width:"100%"}}>
                    {files.map(file  => (
                        <Box key={file.name} style={{display:"flex",width:"90%", flexDirection:"column", alignItems:"center", backgroundColor:"#2c2e33", borderRadius:7, margin:5, boxSizing:"border-box", padding:7}}>
                            <IconFile />
                            <Text style={{overflow: "hidden", whiteSpace: "nowrap",textAlign:"center", textOverflow: "ellipsis", width: "80%"}}>{file.name}</Text>
                        </Box>
                    ))}
                </Popover.Dropdown>
            </Popover>
        )
    }

    
    return (
        <>
        <AddEmbedModal opened={embedModalOpened} setOpened={setEmbedModalOpened} />
        <Paper shadow="sm" radius={"md"} className={classes.papers} style={{width:"95%"}}>
            <Box className={classes.paper_header}>
                <IconAt color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">Chat</Text>
            </Box>

            <Box style={{boxSizing: "border-box",padding:10}}>

                <Box sx={(theme) => ({borderBottom: `2px solid ${theme.colors.dark[4]}`, display:"flex", marginBottom:5})}>
                    <ActionIcon onClick={()=>{setDestiny()}}>
                        <IconArrowBack />
                    </ActionIcon>
                    <Text style={{marginLeft:10}}>{settings.name}</Text>
                    <Text sx={(theme) => ({marginLeft:"auto", marginBottom:10, color:theme.colors.dark[3]})}>{settings.id}</Text>
                </Box>

                <ScrollArea type="auto" style={{height:"70vh", boxSizing:"border-box", paddingTop:10}}>
                    { settings.id === "000000000000000000" && <LoadingOverlay visible overlayBlur={0} loader={customLoader} />}
                    {messagesElements}
                </ScrollArea>

                <Box style={{marginTop:"1vh"}}>
                    <Textarea onKeyDown={keyHandler} placeholder="Enter here your text" ref={messageInput} rightSection={<><AttachList /><AddAttachElement /></>}/>
                </Box>

            </Box>
        </Paper>
        </>
    )
}