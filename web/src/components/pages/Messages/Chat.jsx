import { Paper, Box, Text, ActionIcon, ScrollArea, TextInput, Avatar, Image, Accordion } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { IconAt, IconArrowBack, IconSend, IconFile, IconDownload } from "@tabler/icons"
import { useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"
import { AddSocketListener, SendMessage } from "../../misc/WebSocket"


const Attachment = ({type,name,url}) => {
    const theme = useMantineTheme()
    if(type.startsWith("application/") || type.startsWith("audio/")){
        return (
            <Box style={{display:"flex", flexDirection:"row", alignItems:"center", boxSizing:"border-box", padding:7, border:`1px solid ${theme.colors.dark[4]}`, borderRadius:10, marginBottom:10}}>
                <IconFile style={{marginRight:5}}/>
                <Text style={{color:theme.colors.blue[6], cursor: "pointer"}}onClick={() => window.open(url, "_blank")}>{name}</Text>
                <ActionIcon onClick={() => window.open(url, "_blank")} style={{marginLeft:"auto"}}>
                    <IconDownload />
                </ActionIcon>
            </Box>
        )
    } else if(type.startsWith("image/")){
        return <Image radius={10} src={url} />
    }
}


const Message = ({ user, avatar, content, attachments }) => {
    const theme = useMantineTheme()

    return (
        <Box style={{display:"flex", flexDirection:"column", boxSizing:"border-box", padding:7, border:`1px solid ${theme.colors.dark[4]}`, marginBottom:10, borderRadius:10, marginRight:20}}>
            <Box style={{display:"flex", alignItems:"center"}}>
                <Avatar src={avatar} style={{marginLeft:5, marginRight:10}} />
                <Box>
                    <Text weight={600}>{user}</Text>
                    <Text style={{color:theme.colors.gray[6]}}>{content}</Text>
                </Box>
            </Box>
            {attachments.length >=1 && 
            <Accordion variant="">
                <Accordion.Item value="attachments">
                <Accordion.Control>Attachments</Accordion.Control>
                <Accordion.Panel>{attachments.map(attach => <Attachment type={attach.type} name={attach.name} url={attach.url} />)}</Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            }
        </Box>
    )
}

export const Chat = ({destiny, setDestiny}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()
    const defaultSettings = {
        name: "Channel",
        id: "000000000000000000",
        messages:[]
    }
    const [settings, setSettings] = useState(defaultSettings)

    useEffect(() => {
        AddSocketListener("chat_settings", settings => setSettings(settings))
    })
    

    useEffect(() => {
        SendMessage("send_chat_settings", {type:destiny.type, svId: destiny.svId, id:destiny.id})
    },[destiny])


    var messagesElements = []
    for(const message of settings.messages) {
        messagesElements.push(<Message key={message.content} attachments={message.attachments} user={message.author} avatar={message.authorAvatar} content={message.content}/>)
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
                    <Text sx={(theme) => ({marginLeft:"auto", marginBottom:10, color:theme.colors.dark[3]})}>{destiny.id}</Text>
                </Box>
                <ScrollArea type="auto" style={{height:"76vh"}}>
                    {messagesElements}
                </ScrollArea>
                <Box style={{marginTop:"1vh"}}>
                    <TextInput placeholder="Enter here your text" rightSection={<IconSend  size={20}/>}/>
                </Box>
            </Box>
        </Paper>
    )
}