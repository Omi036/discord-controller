import { Modal, Select, TextInput, Checkbox, SimpleGrid, SegmentedControl, Text, Button, Slider } from "@mantine/core"
import { SendMessage } from "../../../misc/WebSocket"
import { useState } from "react"
import { regions } from "../../../misc/Enums"

export const CreateChannelModal = ({opened, setOpened, svid}) => {
    const [ channeltype, setChanneltype ] = useState("GuildText")

    const [channelName, setChannelName] = useState("")
    const [channelTopic, setChannelTopic] = useState("")
    const [isNsfw, setIsNsfw] = useState(false)
    const [region, setRegion] = useState(null)

    const [hasUserLimit, setHasUserLimit] = useState(false)
    const [hasSlowdown, setHasSlowDown] = useState(false)

    const [slowdown, setSlowdown] = useState(1)
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
        setSlowdown(false)
        hasSlowdown(false)
        setRegion(null)
    }

    const createChannel = async () => {
        SendMessage("create_channel", {
            svId: svid,
            type: channeltype,
            name: channelName,
            topic: channelTopic,
            isNsfw: isNsfw,
            userLimit: (hasUserLimit && maxUsers),
            bitrate: bitrate,
            slowdown: (hasSlowdown && slowdown),
            region: region
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
                {channeltype !== "GuildCategory" && (
                    <>
                    <Checkbox color="indigo" label="NSFW" checked={isNsfw} onChange={(e) => setIsNsfw(!isNsfw)}/>
                    <Checkbox color="indigo" label="Slowdown" checked={hasSlowdown} onChange={(e) => setHasSlowDown(!hasSlowdown)}/>
                    </>
                )}
                {channeltype === "GuildVoice" && <Checkbox color="indigo" checked={hasUserLimit} onChange={(e)=> setHasUserLimit(!hasUserLimit)} label="User Limit"/>}
            </SimpleGrid>
            <SimpleGrid cols={1} mt={15}>
                {channeltype !== "GuildCategory" && (
                    <>
                        <Text mb={0}>Slowdown</Text>
                        <Slider mt={0} color="indigo" label={(value) => `${value}s`} value={slowdown} onChange={(e) => setSlowdown(e)} min={1} max={300} disabled={!hasSlowdown}/>
                    </>
                    )
                }
                {channeltype === "GuildVoice" && (
                    <>
                        <Select 
                            label="Region"
                            data={regions}
                            color="indigo"
                            mt={10}
                            value={region}
                            onChange={(val) => setRegion(val)}
                        />

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