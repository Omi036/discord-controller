import { Paper, Box, Text, ScrollArea, useMantineTheme, TextInput, Checkbox, SegmentedControl}  from "@mantine/core"
import { IconApps } from "@tabler/icons"
import { useStyles } from "../../../styles/Pages.style"
import { ImageDisplay } from "../../misc/ImageDisplay"
import { WSocket } from "../../misc/WebSocket"

export const AppSection = ({refs, botPublic, codeGrant, appAvatar}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()

    return(
        <Paper shadow="sm" radius={"md"} className={classes.papers}>
            <Box className={classes.paper_header}>
                <IconApps color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} fontWeight="bold">Application</Text>
            </Box>
            <Box>
                <ScrollArea type="auto" className={classes.scroll}>
                    <Checkbox label="Bot is Public" color="indigo" readOnly style={{ marginBottom: 10, fontSize: 16 }} checked={botPublic}/>
                    <Checkbox label="Bot require Code Grant to invite" readOnly color="indigo" style={{     marginBottom: 10,     marginTop: 10,     fontSize: 16, }} checked={codeGrant}/>
                    <TextInput label="Name" readOnly className={classes.text_input} ref={refs.app.name}/>
                    <TextInput label="Description" readOnly className={classes.text_input} ref={refs.app.description}/>
                    <TextInput label="Owner" readOnly className={classes.text_input} ref={refs.app.owner}/>
                    <TextInput label="Id" readOnly className={classes.text_input} ref={refs.app.id}/>
                    <TextInput label="Tags" readOnly className={classes.text_input} ref={refs.app.tags}/>
                    <ImageDisplay label="Icon URL" value={appAvatar} />
                    <TextInput label="Slash Commands" readOnly className={classes.text_input} ref={refs.app.commandsCounter}/>
                    <TextInput label="Created At" readOnly className={classes.text_input} ref={refs.app.createdAt}/>
                </ScrollArea>
            </Box>
        </Paper>
    )
}