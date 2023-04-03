import { Paper, Box, Text, ScrollArea, useMantineTheme, TextInput, Checkbox, SegmentedControl, Accordion, Select, Button}  from "@mantine/core"
import { IconUser } from "@tabler/icons"
import { useStyles } from "../../../styles/Pages.style"
import { ImageDisplay } from "../../misc/ImageDisplay"
import { SendMessage, AddSocketListener } from "../../misc/WebSocket"
import { useEffect, useState } from "react"
import { defaultPresence, noActivity, possibleActivityType, possibleDevices, possibleStatus } from "../../misc/Enums"


export const UserSection = ({settings}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()
    const [ presence, setPresence ] = useState(defaultPresence)


    useEffect(() => {
        AddSocketListener("presence_data", data => {
            setPresence(data)
        })
    })


    const updatePresence = (presenceName,value) => {
        var presenceList = {...presence}
        presenceList[presenceName] = value
        setPresence(presenceList)
    }


    const handleUpdateClick = () => {
        SendMessage("set_presence_data", presence)
    }


    return(
        <Paper shadow="sm" radius="md" className={classes.papers}>
            <Box className={classes.paper_header}>
                <IconUser color={theme.white} className={classes.app_icon}/>
                <Text  color={theme.white} weight="600">User</Text>
            </Box>

            <Box>
                <ScrollArea type="auto" className={classes.scroll}>

                    <Checkbox readOnly label="Bot is Verified" color="indigo" mb={10} fz={16} checked={settings.user.verified ?? false}/>
                    <TextInput label="Tag" readOnly className={classes.text_input} value={settings.user.tag}/>
                    <TextInput label="Id" readOnly className={classes.text_input} value={settings.user.id}/>
                    <ImageDisplay label="Avatar URL" value={settings.user.avatarURL}/>
                    <TextInput label="Created At" readOnly className={classes.text_input} value={new Date(settings.user.createdAt)}/>
                    <Accordion  variant="contained" chevronPosition="left" mt={10}>
                        <Accordion.Item value="presence">
                            <Accordion.Control>Presence</Accordion.Control>
                            <Accordion.Panel>

                                <Text size={14}>Status</Text>
                                <SegmentedControl fullWidth color="indigo" defaultValue={presence.status} data={possibleStatus} onChange={(val) => updatePresence("status", val)}/>

                                <Text size={14} mt={10}>Device</Text>
                                <SegmentedControl fullWidth color="red" readOnly value={presence.device || "web"} data={possibleDevices} />

                                <Select 
                                    label="Activity Type"
                                    data={possibleActivityType}
                                    color="indigo"
                                    mt={10}
                                    value={presence.type.toString()}
                                    onChange={(val) => updatePresence("type",val)}
                                />
                                
                                { presence.type !== noActivity &&
                                    <TextInput label="Name" defaultValue={presence.name} className={classes.text_input} onChange={(e) => updatePresence("name",e.currentTarget.value)} />
                                }

                                <Button fullWidth color="indigo" mt={10} onClick={handleUpdateClick}>Update Presence</Button>

                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>

                </ScrollArea>
            </Box>
        </Paper>
    )
}