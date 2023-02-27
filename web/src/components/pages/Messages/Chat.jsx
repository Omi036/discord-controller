import { Paper, Box, Text, ActionIcon, ScrollArea, Textarea, LoadingOverlay, Popover, Button, FileButton, Indicator } from "@mantine/core"
import { customLoader } from "../../../styles/Settings.style"
import { useStyles } from "../../../styles/Pages.style"
import { IconAt, IconArrowBack, IconPlus, IconPaperclip, IconFile, IconLayoutSidebar, IconSend, IconReload } from "@tabler/icons"
import { useMantineTheme } from "@mantine/core"
import { useEffect, useState, useRef } from "react"
import { AddSocketListener, SendMessage } from "../../misc/WebSocket"
import { Message } from "./Message"
import { AddEmbedModal } from "./AddEmbedModal"


function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

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
    const defaultEmbed = {title:"",json:""}
    const [embed, setEmbed] = useState(defaultEmbed)

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

    const postMessage = async () => {
        if(embed.title) console.log("Embed")
        if(embed.title || messageInput.current.value.length > 0 || files.length > 0) {
            var based_files = [] // 🗿
            for(const file of files) {
                const buffer = await file.arrayBuffer()
                const base64String = _arrayBufferToBase64(buffer);
                based_files.push({name:file.name, buffer:base64String});
            }
    
            SendMessage("post_message", {type:destiny.type, svId: destiny.svId, id:destiny.id, content:messageInput.current.value,attachments:{embed:embed.json, files:based_files}})
            setEmbed({
                title:"",
                json:""
            })
            setFiles([])
            messageInput.current.value = ""
        }
    }

    const keyHandler = e => {
        if(e.keyCode !== 13) return
        if(e.shiftKey) {
            e.preventDefault()
            messageInput.current.value += "\n"
            return
        }

        e.preventDefault()
        postMessage()
    }

    const SendButton = () => {
        return (
        <ActionIcon style={{marginRight:80}}>
            <IconSend onClick={postMessage} />
        </ActionIcon>
        )
    }


    const AttachList = () => {
        return (
            <Popover width={500} position="top" withArrow shadow="md">
                <Popover.Target>
                    <ActionIcon style={{marginRight:10}}>
                        <Indicator color="indigo" size={16} showZero label={`${files.length + (embed.title ? 1 :0)}`}>
                            <IconPaperclip />
                        </Indicator>
                    </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown >
                    <Box style={{display:"grid", gridTemplateColumns: "repeat(3, 33%)", width:"100%"}}>
                    {files.map(file  => (
                        <Box key={file.name} sx={{display:"flex",width:"90%", flexDirection:"column", alignItems:"center", backgroundColor:"#2c2e33", borderRadius:7, margin:5, boxSizing:"border-box", padding:7,cursor:"pointer", "&:hover":{backgroundColor:"#a61e4d"}}} onClick={() => {var new_files = [...files]; new_files.splice(files.indexOf(file),1); setFiles(new_files)}}>
                            <IconFile color="#4dabf7"/>
                            <Text style={{overflow: "hidden", whiteSpace: "nowrap",textAlign:"center", textOverflow: "ellipsis", width: "80%"}}>{file.name}</Text>
                        </Box>
                    ))}
                    {embed.title && (
                        <Box sx={{display:"flex",width:"90%", flexDirection:"column", alignItems:"center", backgroundColor:"#2c2e33", borderRadius:7, margin:5, boxSizing:"border-box", padding:7,cursor:"pointer", "&:hover":{backgroundColor:"#a61e4d"}}} onClick={()=>setEmbed(defaultEmbed)}>
                            <IconLayoutSidebar color="#ffa94d"/>
                            <Text style={{overflow: "hidden", whiteSpace: "nowrap",textAlign:"center", textOverflow: "ellipsis", width: "80%"}}>{embed.title}</Text>
                        </Box>
                    )}
                    </Box>
                    <Box style={{display:"flex",flexDirection:"row", marginTop:8, justifyContent:"space-between",}}>

                        <Button color="indigo" leftIcon={<IconPlus />} style={{width:"48%"}} onClick={()=>setEmbedModalOpened(true)}>Set Embed</Button>
                        <FileButton onChange={setFiles} multiple>
                            {(props) => <Button  {...props} color="indigo" leftIcon={<IconPlus />} style={{width:"48%"}}>Set Files</Button>}
                        </FileButton>

                    </Box>
                </Popover.Dropdown>
            </Popover>
        )
    }

    
    return (
        <>
        <AddEmbedModal opened={embedModalOpened} setOpened={setEmbedModalOpened} setEmbed={setEmbed}/>
        <Paper shadow="sm" radius={"md"} className={classes.papers} style={{width:"95%"}}>
            <Box className={classes.paper_header}>
                <IconAt color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">Chat</Text>
                <ActionIcon style={{marginLeft:"auto", marginRight:10}} onClick={()=>{SendMessage("send_chat_settings", {type:destiny.type, svId: destiny.svId, id:destiny.id})}}>
                        <IconReload />
                </ActionIcon>
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
                    <Textarea onKeyDown={keyHandler} placeholder="Enter here your text" ref={messageInput} rightSection={<><AttachList /><SendButton /></>}/>
                </Box>

            </Box>
        </Paper>
        </>
    )
}