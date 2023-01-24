import { Paper, Box, Text, ScrollArea, PasswordInput, Button, useMantineTheme, TextInput}  from "@mantine/core"
import { IconRobot, IconEye, IconEyeOff } from "@tabler/icons"
import { useStyles } from "../../../styles/Pages.style"
import { TextDisplay } from "../../misc/TextDisplay"

export const ClientSection = ({refs, serverCount, channelCount, setModalOpened}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()

    return(
        <Paper shadow="sm" radius={"md"} className={classes.papers}>
            <Box className={classes.paper_header}>
                <IconRobot color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} fontWeight="bold">Discord Client</Text>
            </Box>
            <Box style={{ height: "100%" }}>
                <ScrollArea type="auto" className={classes.scroll}>
                    <Box className={classes.hbox}>
                        <TextDisplay label={"Servers"} value={serverCount}/>
                        <TextDisplay label={"Channels"} value={channelCount}/>
                    </Box>
                    <PasswordInput ref={refs.client.token} readOnly label={"Token"} className={classes.text_input}
                        visibilityToggleIcon={({ reveal, size }) => reveal ? (<IconEyeOff size={size} />) : (<IconEye size={size} />)}
                    />
                    <TextInput label="Initializated At" readOnly className={classes.text_input} ref={refs.client.initializedAt}/>
                    <Button fullWidth color={"indigo"} className={classes.button_input} onClick={() => setModalOpened(true)}>Generate Bot Invite</Button>
                </ScrollArea>
            </Box>
        </Paper>
    )
}