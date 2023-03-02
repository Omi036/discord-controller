import { ScrollArea, SimpleGrid, Box, TextInput, Text, ActionIcon, Checkbox, LoadingOverlay, Button, Modal, Slider, CopyButton, NumberInput,} from "@mantine/core"
import { AddSocketListener, SendMessage } from "../../../misc/WebSocket"
import { IconArrowBack, IconClipboard, IconSend } from "@tabler/icons"
import { useState, useEffect, useRef } from "react"
import { TextDisplay } from "../../../misc/TextDisplay"
import { customLoader } from "../../../../styles/Settings.style"

// The modal that will send an invite to a channel
const CreateInviteModal = ({channelID, serverId, opened, setOpened}) => {
    const [infinite, setInfinite] = useState(true)
    const [uses, setUses] = useState(0)
    const temporaryEl = useRef()
    const durationEl = useRef()
    const reasonEl = useRef()
    const [ invite, setInvite ] = useState("")

    // Adds the listener that will receiv the invitation link
    useEffect(() => {
        AddSocketListener("reply_channel_invite", inv => setInvite(inv))
    })
    
    // The click handler
    const createInvite = () => {
        var duration;
        if(infinite) duration = 0
        else {duration = durationEl.current.value}

        SendMessage("gen_channel_invite", {svId:serverId, id:channelID, settings:{
            temporary: temporaryEl.current.checked,
            reason: reasonEl.current.value,
            maxAge: duration,
            maxUses: uses
        }})
    }

    // React Element
    return (
        <Modal title="Create Channel Invite"  opened={opened} onClose={() => setOpened(false)}>
            <SimpleGrid cols={1}>
                <Checkbox color="indigo" label="Temporary Invite" ref={temporaryEl}/>
                <Checkbox color="indigo" label="Infinite Duration" checked={infinite} onChange={(e) => setInfinite(e.currentTarget.checked)}/>
                <NumberInput label="Duration" placeholder="Invite duration (In seconds)" disabled={infinite} ref={durationEl}/>
                <TextInput label="Reason" placeholder="Optional reason" ref={reasonEl}/>
                <Text style={{marginBottom:0}}>Uses (0 for unlimited uses)</Text>
                <Slider value={uses} onChange={setUses} style={{marginTop:0}} color="indigo" marks={[{ value: 20, label: '20%' },{ value: 50, label: '50%' },{ value: 80, label: '80%' },]} />
                <Button color="indigo" fullWidth style={{marginTop:15}} onClick={createInvite}>Create Invite</Button>
            </SimpleGrid>
            <Box style={{display:"flex", flexDirection:"row", justifyContent: "space-between", alignItems: "center", marginTop:10}}>
                <TextInput readOnly style={{ width: "65%"}} value={invite}/>
                <CopyButton value={invite}>
                  {({ copied, copy }) => (
                    <Button color={copied ? 'teal' : 'indigo'} onClick={copy}>
                      <IconClipboard />
                    </Button>
                  )}
                </CopyButton>
                <Button color={'indigo'} style={{margin:"auto 0"}} onClick={() => {invite && window.open(invite, "_blank")}}>
                    <IconSend />
                </Button>
            </Box>
        </Modal>
    )
}


// Contains info about a channel
export const ChannelInfo = ({channelId, setChannel, serverId, setMsgDestiny, setPage}) => {
    const defaultChannelInfo = {
        name:"Channel",
        id:"000000000000000000",
        type:"",
        url:"",
        createdAt:"",
        manageable:false,
        messageable: false,
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
    const [channelInfo, setChannelInfo] = useState(defaultChannelInfo)
    const [ inviteModalOpened, setInviteModalOpened] = useState(false)
    const [ modalConfirmation, setModalConfirmation] = useState(false)
    const [ reason, setReason] = useState("")

    // Updates the channel info
    useEffect(() => {
        AddSocketListener("channel_data", (data) => {
            const new_info = {...defaultChannelInfo}
            for(const key in data){ new_info[key] = data[key] }
            setChannelInfo(new_info)
        })
    })

    // When a new channel is selected, will request new data
    useEffect(() => {
        SendMessage("get_channel_data", {svId:serverId,id:channelId})
    },[channelId])

    const handleDelete = () => {
        SendMessage("delete_channel", {svId:serverId,id:channelId, reason:reason})
        setInviteModalOpened(false)
        setChannel()
    }
    
    return (
        <>
            { channelInfo.id === "000000000000000000" && <LoadingOverlay visible overlayBlur={0} loader={customLoader} /> }
            <CreateInviteModal channelID={channelId} serverId={serverId} opened={inviteModalOpened} setOpened={setInviteModalOpened}/>
            <Modal opened={modalConfirmation} onClose={() => setModalConfirmation(false)}>
                <Text  align="center">Are you sure you want to delete "{channelInfo.name}"?</Text>
                <TextInput sx={{marginTop:10}} label="Reason (Optional)" placeholder="It was an ugly channel" value={reason} onChange={(event) => setReason(event.currentTarget.value)}/>
                <Button sx={{marginTop:10}} fullWidth color={"red"} onClick={handleDelete}>Yes, I'm sure I want to delete "{channelInfo.name}"</Button>
            </Modal>

            <Box sx={(theme) => ({borderBottom: `2px solid ${theme.colors.dark[4]}`, display:"flex", marginBottom:5})}>
                <ActionIcon onClick={()=>{setChannel(false)}}>
                    <IconArrowBack />
                </ActionIcon>
                <Text style={{marginLeft:10}}>{channelInfo.name}</Text>
                <Text sx={(theme) => ({marginLeft:"auto", marginBottom:10, color:theme.colors.dark[3]})}>{channelInfo.id}</Text>
            </Box>
            <ScrollArea>
                <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginBottom:10}}>
                    {["GuildText","GuildVoice","GuildNews"].includes(channelInfo.type) && <TextDisplay value={channelInfo.messages} label={"Messages"} />}
                    {channelInfo.type === "GuildVoice" && <TextDisplay label={"Users Limits"} value={channelInfo.userLimit} />}
                </Box>
                <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginBottom:10}}>
                    {channelInfo.type === "GuildVoice" && <TextDisplay label={"Members Connected"} value={channelInfo.members} />}
                </Box>
                <SimpleGrid cols={2} style={{marginBottom: 10}}>
                    <Checkbox  readOnly color={"indigo"} label="Manageable by bot" checked={channelInfo.manageable} />
                    <Checkbox  readOnly color={"indigo"} label="Viewable by bot" checked={channelInfo.viewable} />
                    <Checkbox  readOnly color={"indigo"} label="Deletable by bot" checked={channelInfo.deletable} />
                    {["GuildText","GuildVoice","GuildNews"].includes(channelInfo.type) && <Checkbox  readOnly color={"indigo"} label="Messageable by Bot" checked={channelInfo.messageable} />}
                    {["GuildStage","GuildVoice"].includes(channelInfo.type) && <Checkbox  readOnly color={"indigo"} label="Joinable by Bot" checked={channelInfo.joinable} />}
                    {["GuildStage","GuildVoice"].includes(channelInfo.type) && <Checkbox  readOnly color={"indigo"} label="Full" checked={channelInfo.isFull} />}
                    {channelInfo.type === "GuildVoice" && <Checkbox  readOnly color={"indigo"} label="Bot can Speak" checked={channelInfo.speakable} />}
                    {["GuildText","GuildVoice","GuildForum", "GuildNews"].includes(channelInfo.type) && <Checkbox  readOnly color={"indigo"} label="NSFW" checked={channelInfo.nsfw} />}
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
                <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginTop:10}}>
                    <Button color="indigo" disabled={!["GuildText","GuildVoice","GuildNews"].includes(channelInfo.type) || !channelInfo.messageable} fullWidth style={{marginRight:10}} onClick={()=>{setMsgDestiny({type:"channel",svId:serverId, id:channelId});setPage("Messages")}}>Send Message</Button>
                    <Button color="indigo" disabled={["GuildCategory"].includes(channelInfo.type)} fullWidth style={{marginLeft:10}} onClick={() => setInviteModalOpened(true)}>Generate Invite</Button>
                    <Button color="red" disabled={!channelInfo.deletable} fullWidth style={{marginLeft:10}} onClick={()=>setModalConfirmation(true)}>Delete Channel</Button>
                </Box>
            </ScrollArea>
        </>
    )
}