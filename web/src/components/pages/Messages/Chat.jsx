import { Paper, Box, Text, ActionIcon, ScrollArea, Textarea, LoadingOverlay } from "@mantine/core"
import { customLoader } from "../../../styles/Settings.style"
import { useStyles } from "../../../styles/Pages.style"
import { IconAt, IconArrowBack } from "@tabler/icons"
import { useMantineTheme } from "@mantine/core"
import { useEffect, useState, useRef } from "react"
import { AddSocketListener, SendMessage } from "../../misc/WebSocket"
import { Message } from "./Message"


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

    
    return (
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
                    <Textarea onKeyDown={keyHandler} placeholder="Enter here your text" ref={messageInput}/>
                </Box>

            </Box>
        </Paper>
    )
}