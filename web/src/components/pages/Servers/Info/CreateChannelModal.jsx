import { Modal, TextInput, Checkbox, SimpleGrid, SegmentedControl, Text, Button, Slider } from "@mantine/core"
import { SendMessage } from "../../../misc/WebSocket"
import { useState } from "react"


export const CreateChannelModal = ({opened, setOpened, svid}) => {
    const [ channeltype, setChanneltype ] = useState("GuildText")

    const [channelName, setChannelName] = useState("")
    const [channelTopic, setChannelTopic] = useState("")
    const [isNsfw, setIsNsfw] = useState(false)

    const [hasUserLimit, setHasUserLimit] = useState(false)
    const [maxUsers, setMaxUsers] = useState(1)
    const [bitrate, setBitrate] = useState(64)

    const segmentedData = [
        {label:"Text", value:"GuildText"},
        {label:"Voice", value:"GuildVoice"},
        {label:"Category", value:"GuildCategory"}
    ]

    const cleanData = async () => {
        setChanneltype("GuildText")
        setChannelName("")
        setChannelTopic("")
        setIsNsfw(false)
        setHasUserLimit(false)
        setMaxUsers(1)
        setBitrate(8)
    }

    const createChannel = async () => {
        SendMessage("create_channel", {
            svId: svid,
            type: channeltype,
            name: channelName,
            topic: channelTopic,
            isNsfw: isNsfw,
            userLimit: (hasUserLimit && maxUsers),
            bitrate: bitrate
        })

        await cleanData()

        setOpened(false)
    }

    const updateName = (e)  => {
        if(channeltype === "GuildText"){
            setChannelName(e.currentTarget.value.toLowerCase().replace(" ","-"))
        } else {
            setChannelName(e.currentTarget.value)
        }
    }

    const closeModal = async () => {
        await cleanData()
        setOpened(false)

    }

    return (
        <Modal opened={opened} onClose={closeModal} title="Create new Channel">
            <SimpleGrid cols={1}>

                <SegmentedControl fullwidth color="indigo" data={segmentedData} value={channeltype} onChange={(e) => setChanneltype(e)}/>
                <TextInput label="Channel Name" placeholder="Name" required value={channelName} onChange={updateName}/>
                <TextInput label="Channel Topic / Description" placeholder="Topic" value={channelTopic} onChange={(e) => setChannelTopic(e.currentTarget.value)}/>

            </SimpleGrid>
            <SimpleGrid cols={2} mt={10}>
                <Checkbox color="indigo" label="NSFW" checked={isNsfw} onChange={(e) => setIsNsfw(!isNsfw)}/>
                {channeltype === "GuildVoice" && <Checkbox color="indigo" checked={hasUserLimit} onChange={(e)=> setHasUserLimit(!hasUserLimit)} label="User Limit"/>}
            </SimpleGrid>
            <SimpleGrid cols={1} mt={15}>
                {channeltype === "GuildVoice" && (
                    <>
                        <Text mb={0}>Max Users</Text>
                        <Slider mt={0} color="indigo" label={(value) => `${value} Users`} value={maxUsers} onChange={(e) => setMaxUsers(e)} min={1} max={99} disabled={!hasUserLimit}/>

                        <Text mb={0}>Bitrate</Text>
                        <Slider mt={0} color="indigo" label={(value) => `${value}kbps`} value={bitrate} onChange={(e) => setBitrate(e)} min={8} max={96}/>
                    </>
                )}
            </SimpleGrid>
            <SimpleGrid cols={2} mt={10}>
                <Button fullWidth color="gray" onClick={()=>setOpened(false)}>Cancel</Button>
                <Button fullWidth color="indigo" onClick={createChannel} >Create</Button>
            </SimpleGrid>
        </Modal>
    )
}