import { Paper, Box, Text, ScrollArea, useMantineTheme, TextInput, Checkbox, SegmentedControl}  from "@mantine/core"
import { IconApps } from "@tabler/icons"
import { useStyles } from "../../../styles/Pages.style"
import { ImageDisplay } from "../../misc/ImageDisplay"

export const AppSection = ({settings}) => {
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
                    <Checkbox label="Bot is Public" color="indigo" readOnly style={{ marginBottom: 10, fontSize: 16 }} checked={settings.app.public ?? false}/>
                    <Checkbox label="Bot require Code Grant to invite" readOnly color="indigo" style={{marginBottom: 10, marginTop: 10, fontSize: 16, }} checked={settings.app.codeGrant ?? false}/>
                    <TextInput label="Name" readOnly className={classes.text_input} value={settings.app.name} />
                    <TextInput label="Description" readOnly className={classes.text_input} value={settings.app.description} />
                    <TextInput label="Owner" readOnly className={classes.text_input} value={settings.app.owner} />
                    <TextInput label="Id" readOnly className={classes.text_input} value={settings.app.id} />
                    <TextInput label="Tags" readOnly className={classes.text_input} value={settings.app.tags}/>
                    <ImageDisplay label="Icon URL" value={settings.app.iconURL} />
                    <TextInput label="Slash Commands" readOnly className={classes.text_input} value={settings.app.commands}/>
                    <TextInput label="Created At" readOnly className={classes.text_input} value={new Date(settings.app.createdAt)}/>
                </ScrollArea>
            </Box>
        </Paper>
    )
}