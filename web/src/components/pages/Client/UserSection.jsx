import { Paper, Box, Text, ScrollArea, useMantineTheme, TextInput, Checkbox, SegmentedControl, Accordion, Select, Button}  from "@mantine/core"
import { IconUser } from "@tabler/icons"
import { useStyles } from "../../../styles/Pages.style"
import { ImageDisplay } from "../../misc/ImageDisplay"
import { SendMessage, AddSocketListener } from "../../misc/WebSocket"
import { useEffect, useState } from "react"

// Contains info about the discord user
export const UserSection = ({settings, setSettings}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()
    const [ presence, setPresence ] = useState({
        status:"online",
        type:"0",
        device:"web",
        name:"A name"
    })

    useEffect(() => {
        AddSocketListener("presence_data", data => {
            setPresence(data)
        })
    })

    const updatePresence = (key,value) => {
        var presence_old = {...presence}
        presence_old[key] = value
        setPresence(presence_old)
    }


    const handleClick = () => {
        SendMessage("set_presence_data", presence)
    }

    // Contains all the buttons for the segmented control
    const possibleStatus = [
        { label: "Online", value: "online" },
        { label: "Idle", value: "idle" },
        { label: "DnD", value: "dnd" },
        { label: "Invisible", value: "invisible" }
    ]

    console.log(presence)

    return(
        <Paper shadow="sm" radius={"md"} className={classes.papers}>
            <Box className={classes.paper_header}>
                <IconUser color={theme.white} className={classes.app_icon}/>
                <Text  color={theme.white} weight="600">User</Text>
            </Box>
            <Box>
                <ScrollArea type="auto" className={classes.scroll}>
                    <Checkbox readOnly label="Bot is Verified" color="indigo" style={{ marginBottom: 10, fontSize: 16 }} checked={settings.user.verified ?? false}/>
                    <TextInput label="Tag" readOnly className={classes.text_input} value={settings.user.tag}/>
                    <TextInput label="Id" readOnly className={classes.text_input} value={settings.user.id}/>
                    <ImageDisplay label="Avatar URL" value={settings.user.avatarURL}/>
                    <TextInput label="Created At" readOnly className={classes.text_input} value={new Date(settings.user.createdAt)}/>
                    <Accordion  variant="contained" chevronPosition="left" sx={{marginTop:10}}>
                        <Accordion.Item value="presence">
                            <Accordion.Control>Presence</Accordion.Control>
                            <Accordion.Panel>
                                <Text size={14}>Status</Text>
                                <SegmentedControl fullWidth color="indigo" defaultValue={presence.status} data={possibleStatus} onChange={(val) => updatePresence("status", val)}/>
                                <Text size={14} sx={{marginTop:10}}>Device</Text>
                                <SegmentedControl fullWidth color="red" readOnly value={presence.device || "web"} data={[{value:"web",label:"Web"},{value:"mobile",label:"Mobile"},{value:"desktop",label:"Desktop"}]} />
                                <Select 
                                label="Activity Type"
                                data={[
                                    {value:"5", label:"Competing"},
                                    {value:"4", label:"Custom"},
                                    {value:"3", label:"Watching"},
                                    {value:"2", label:"Listening"},
                                    {value:"1", label:"Streaming"},
                                    {value:"0", label:"Playing"},
                                    {value:"-1", label:"None"}
                                ]}
                                color="indigo"
                                sx={{marginTop:10}}
                                defaultValue={presence.type}
                                onChange={(val) => updatePresence("type",val)}
                                />
                                { presence.type !== "-1" && <TextInput label="Name" defaultValue={presence.name} className={classes.text_input} onChange={(e) => updatePresence("name",e.currentTarget.value)} />}
                                <Button fullWidth color="indigo" style={{marginTop:10}} onClick={handleClick}>Update Presence</Button>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </ScrollArea>
            </Box>
        </Paper>
    )
}