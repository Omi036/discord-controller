import { ScrollArea, SimpleGrid, TextInput, Text, ActionIcon, Checkbox, LoadingOverlay, Button, Modal, Flex, useMantineTheme} from "@mantine/core"
import { AddSocketListener, SendMessage } from "../../../misc/WebSocket"
import { IconArrowBack } from "@tabler/icons"
import { useState, useEffect } from "react"
import { TextDisplay } from "../../../misc/TextDisplay"
import { customLoader } from "../../../../styles/Settings.style"
import { CreateInviteModal } from "./CreateInviteModal"
import { defaultChannelInfo } from "../../../misc/Enums"


// Contains info about a channel
export const ChannelInfo = ({channelId, setChannel, serverId, setMsgDestiny, setCurrentPage}) => {
    const theme = useMantineTheme()
    const [ channelInfo, setChannelInfo] = useState(defaultChannelInfo)
    const [ inviteModalOpened, setInviteModalOpened] = useState(false)
    const [ modalConfirmation, setModalConfirmation] = useState(false)
    const [ reason, setReason] = useState("")


    useEffect(() => {
        AddSocketListener("channel_data", (data) => {
            const updatedInfo = {...defaultChannelInfo}
            for(const key in data){ updatedInfo[key] = data[key] }
            setChannelInfo(updatedInfo)
        })
    })

    

    useEffect(() => {
        SendMessage("get_channel_data", {
            svId:serverId,
            id:channelId
        })
    },[channelId])



    const handleDelete = () => {
        SendMessage("delete_channel", {
            svId:serverId,
            id:channelId, 
            reason:reason
        })

        setInviteModalOpened(false)
        setChannel()
    }


    const handleSendMessage = () => {
        setMsgDestiny({
            type:"channel",
            svId:serverId, 
            id:channelId
        })
        
        setCurrentPage("Messages")
    }
    


    return (
        <>
            { channelInfo.id === "000000000000000000" && <LoadingOverlay visible overlayBlur={0} loader={customLoader} /> }

            <CreateInviteModal channelID={channelId} serverId={serverId} opened={inviteModalOpened} setOpened={setInviteModalOpened}/>

            <Modal opened={modalConfirmation} onClose={() => setModalConfirmation(false)}>
                <Text align="center"> Are you sure you want to delete "{channelInfo.name}"? </Text>
                <TextInput mt={10} label="Reason (Optional)" placeholder="It was an ugly channel" value={reason} onChange={(event) => setReason(event.currentTarget.value)}/>
                <Button mt={10} fullWidth color="red" onClick={handleDelete}>Yes, I'm sure I want to delete "{channelInfo.name}"</Button>
            </Modal>

            <Flex mb={5} sx={(theme) => ({borderBottom: `2px solid ${theme.colors.dark[4]}`})}>
                <ActionIcon onClick={()=>{setChannel(false)}}>
                    <IconArrowBack />
                </ActionIcon>
                <Text ml={10}> {channelInfo.name} </Text>
                <Text ml="auto" mb={10} color={theme.colors.dark[3]}> {channelInfo.id} </Text>
            </Flex>

            <ScrollArea>

                <Flex direction="row" justify="space-around" mb={10} w="100%">
                    {["GuildText","GuildVoice","GuildNews"].includes(channelInfo.type) && <TextDisplay value={channelInfo.messages} label="Messages" />}
                    {channelInfo.type === "GuildVoice" && <TextDisplay label="Users Limits" value={channelInfo.userLimit} />}
                </Flex>

                <Flex direction="row" justify="space-around" mb={10} w="100%">
                    {channelInfo.type === "GuildVoice" && <TextDisplay label={"Members Connected"} value={channelInfo.members} />}
                </Flex>

                <SimpleGrid cols={2} mb={10}>
                    <Checkbox  readOnly color={"indigo"} label="Manageable by bot" checked={channelInfo.manageable} />
                    <Checkbox  readOnly color={"indigo"} label="Viewable by bot"   checked={channelInfo.viewable} />
                    <Checkbox  readOnly color={"indigo"} label="Deletable by bot"  checked={channelInfo.deletable} />
                    {["GuildText","GuildVoice","GuildNews"].includes(channelInfo.type) && <Checkbox  readOnly color="indigo" label="Messageable by Bot" checked={channelInfo.messageable} />}
                    {["GuildStage","GuildVoice"].includes(channelInfo.type) && <Checkbox  readOnly color="indigo" label="Joinable by Bot" checked={channelInfo.joinable} />}
                    {["GuildStage","GuildVoice"].includes(channelInfo.type) && <Checkbox  readOnly color="indigo" label="Full" checked={channelInfo.isFull} />}
                    {channelInfo.type === "GuildVoice" && <Checkbox  readOnly color="indigo" label="Bot can Speak" checked={channelInfo.speakable} />}
                    {["GuildText","GuildVoice","GuildForum", "GuildNews"].includes(channelInfo.type) && <Checkbox  readOnly color="indigo" label="NSFW" checked={channelInfo.nsfw} />}
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

                <Flex direction="row" justify="space-around" mt={10} w="100%">
                    <Button color="indigo" fullWidth me={10} onClick={handleSendMessage} disabled={!["GuildText","GuildVoice","GuildNews"].includes(channelInfo.type) || !channelInfo.messageable}> Send Message </Button>
                    <Button color="indigo" fullWidth ml={10} onClick={()=>setInviteModalOpened(true)}  disabled={["GuildCategory"].includes(channelInfo.type)}> Generate Invite</Button>
                    <Button color="red"    fullWidth ml={10} onClick={()=>setModalConfirmation(true)}  disabled={!channelInfo.deletable}> Delete Channel </Button>
                </Flex>
            </ScrollArea>
        </>
    )
}