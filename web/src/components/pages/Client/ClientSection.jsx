import { Paper, Box, Text, ScrollArea, PasswordInput, Button, useMantineTheme, TextInput}  from "@mantine/core"
import { IconRobot, IconEye, IconEyeOff } from "@tabler/icons"
import { useStyles } from "../../../styles/Pages.style"
import { TextDisplay } from "../../misc/TextDisplay"


export const ClientSection = ({settings, setInviteModalOpened}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()

    const tokenVisibilityToggleBtn = ({ reveal, size }) => reveal ? (<IconEyeOff size={size} />) : (<IconEye size={size} />)

    return(
        <Paper shadow="sm" radius="md" className={classes.papers}>

            <Box className={classes.paper_header}>
                <IconRobot color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">Discord Client</Text>
            </Box>

            <Box h="100%">
                <ScrollArea type="auto" className={classes.scroll}>

                    <Box className={classes.hbox}>
                        <TextDisplay label="Servers"  value={settings.client.guilds}/>
                        <TextDisplay label="Channels" value={settings.client.channels}/>
                    </Box>

                    <PasswordInput label="Token" readOnly className={classes.text_input} value={settings.client.token} visibilityToggleIcon={tokenVisibilityToggleBtn} />
                    <TextInput label="Initializated At" readOnly className={classes.text_input} value={new Date(settings.client.initializedAt)}/>
                    <Button fullWidth color="indigo" className={classes.button_input} onClick={() => setInviteModalOpened(true)}>Generate Bot Invite</Button>
                </ScrollArea>
            </Box>
        </Paper>
    )
}