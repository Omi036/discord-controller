import { Paper, Box, Text, ScrollArea, useMantineTheme, TextInput, Checkbox, SegmentedControl}  from "@mantine/core"
import { IconUser } from "@tabler/icons"
import { useStyles } from "../../../styles/Pages.style"
import { ImageDisplay } from "../../misc/ImageDisplay"
import { SendMessage } from "../../misc/WebSocket"

// Contains info about the discord user
export const UserSection = ({settings, setSettings}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()

    // Handles the segmented control of the status
    const handleStatusChange = (status) => {
        // Tells the server to change it
        SendMessage("change_status", status)

        // Updates the gui
        const new_settings = {...settings}
        new_settings.user.status = status
        setSettings(new_settings);
    };

    // Contains all the buttons for the segmented control
    const possibleStatus = [
        { label: "Online", value: "online" },
        { label: "Idle", value: "idle" },
        { label: "DnD", value: "dnd" },
        { label: "Invisible", value: "invisible" }
    ]

    return(
        <Paper shadow="sm" radius={"md"} className={classes.papers}>
            <Box className={classes.paper_header}>
                <IconUser color={theme.white} className={classes.app_icon}/>
                <Text  color={theme.white} fontWeight="bold">User</Text>
            </Box>
            <Box>
                <ScrollArea type="auto" className={classes.scroll}>
                    <Checkbox readOnly label="Bot is Verified" color="indigo" style={{ marginBottom: 10, fontSize: 16 }} checked={settings.user.verified ?? false}/>
                    <Text size={14}>Status</Text>
                    <SegmentedControl fullWidth color="indigo" value={settings.user.status} onChange={handleStatusChange} data={possibleStatus}  />
                    <TextInput label="Tag" readOnly className={classes.text_input} value={settings.user.tag}/>
                    <TextInput label="Id" readOnly className={classes.text_input} value={settings.user.id}/>
                    <ImageDisplay label="Avatar URL" value={settings.user.avatarURL}/>
                    <TextInput label="Created At" readOnly className={classes.text_input} value={new Date(settings.user.createdAt)}/>
                </ScrollArea>
            </Box>
        </Paper>
    )
}