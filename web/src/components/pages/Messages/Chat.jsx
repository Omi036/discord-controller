import { Paper, Box, Text, ActionIcon, ScrollArea, Textarea, LoadingOverlay } from "@mantine/core"
import { customLoader } from "../../../styles/LogIn.style"
import { useStyles } from "../../../styles/Pages.style"
import { IconAt, IconArrowBack, IconSend, IconReload } from "@tabler/icons"
import { useMantineTheme } from "@mantine/core"
import { useEffect, useState, useRef } from "react"
import { AddSocketListener, SendMessage } from "../../misc/WebSocket"
import { Message } from "./Message"
import { AddEmbedModal } from "./AddEmbedModal"
import { defaultChatSettings, defaultEmbed } from "../../misc/Enums"
import { AttachPopover } from "./AttachPopover"


// Code "borrowed" from stackoverflow: https://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer
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
    const [settings, setSettings] = useState(defaultChatSettings)
    const [embedModalOpened, setEmbedModalOpened] = useState(false)
    const [files, setFiles] = useState([])
    const [embed, setEmbed] = useState(defaultEmbed)



    useEffect(() => {
        AddSocketListener("chat_settings", settings => {
            setSettings(settings)
        })
    })
    


    useEffect(() => {
        SendMessage("send_chat_settings", {
            type:destiny.type,
            svId: destiny.svId,
            id:destiny.id
        })
    },[destiny])



    const postMessage = async () => {
        if(embed.title || messageInput.current.value.length > 0 || files.length > 0) {

            var stringifiedFiles = []
            for(const file of files) {
                const buffer = await file.arrayBuffer()
                const base64String = _arrayBufferToBase64(buffer);
                stringifiedFiles.push({
                    name:file.name,
                    buffer:base64String
                });
            }
    
            SendMessage("post_message", {
                type:destiny.type,
                svId: destiny.svId,
                id:destiny.id, 
                content:messageInput.current.value,
                attachments:{
                    embed:embed.json, 
                    files:stringifiedFiles
                }
            })

            setEmbed(defaultEmbed)
            setFiles([])
            messageInput.current.value = ""
        }
    }



    const SendButton = () => {
        return (
            <ActionIcon mr={80}>
                <IconSend onClick={postMessage} />
            </ActionIcon>
        )
    }



    const handleRefreshClick = () => {
        SendMessage("send_chat_settings", {
            type:destiny.type, 
            svId: destiny.svId, 
            id:destiny.id
            }
        )
    }



    const keyHandler = (event) => {
        if(event.key !== "Enter") return
        if(event.shiftKey) {
            event.preventDefault()
            messageInput.current.value += "\n"
            return
        }

        event.preventDefault()
        postMessage()
    }



    var messagesElements = []
    for(const message of settings.messages) {
        messagesElements.push(
            <Message 
                key={message.id} 
                id={message.id}
                channelId={settings.id}
                svId={destiny.svId}
                user={message.author} 
                avatar={message.authorAvatar} 
                attachments={message.attachments} 
                content={message.content}
                embeds={message.embeds}
                channelType={destiny.type}
             />
        )
    }

    

    return (
        <>
            <AddEmbedModal opened={embedModalOpened} setOpened={setEmbedModalOpened} setEmbed={setEmbed}/>

            <Paper shadow="sm" radius="md" w="95%" className={classes.papers}>
                <Box className={classes.paper_header}>
                    <IconAt color={theme.white} className={classes.app_icon}/>
                    <Text color={theme.white} weight="600">Chat</Text>

                    <ActionIcon ml="auto" mr={10} onClick={handleRefreshClick}>
                        <IconReload />
                    </ActionIcon>
                </Box>

                <Box p={10} style={{boxSizing: "border-box"}}>

                    <Box mb={5}  style={{borderBottom: `2px solid ${theme.colors.dark[4]}`, display:"flex"}}>
                        <ActionIcon onClick={() => setDestiny()}>
                            <IconArrowBack />
                        </ActionIcon>

                        <Text ml={10}> {settings.name} </Text>
                        <Text ml="auto" mb={10} color={theme.colors.dark[3]}> {settings.id} </Text>
                    </Box>

                    <ScrollArea type="auto" h="70vh" pt={10} style={{boxSizing:"border-box"}}>
                        { settings.id === "000000000000000000" && <LoadingOverlay visible overlayBlur={0} loader={customLoader} />}
                        { messagesElements }
                    </ScrollArea>

                    <Box mt="1vh">
                        <Textarea onKeyDown={keyHandler} placeholder="Enter here your text" ref={messageInput} rightSection={<><AttachPopover files={files} setFiles={setFiles} embed={embed} setEmbedModalOpened={setEmbedModalOpened}/><SendButton /></>}/>
                    </Box>

                </Box>
            </Paper>
        </>
    )
}