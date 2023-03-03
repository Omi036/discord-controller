import { Paper, Box, Text, ScrollArea, useMantineTheme, TextInput, Checkbox}  from "@mantine/core"
import { IconApps } from "@tabler/icons"
import { useStyles } from "../../../styles/Pages.style"
import { ImageDisplay } from "../../misc/ImageDisplay"

export const AppSection = ({settings}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()

    return(
        <Paper shadow="sm" radius="md" className={classes.papers}>
            <Box className={classes.paper_header}>
                
                <IconApps color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">Application</Text>

            </Box>

            <Box>
                <ScrollArea type="auto" className={classes.scroll}>

                    <Checkbox readOnly color="indigo" mb={10} fz={16} label="Bot is Public"  checked={settings.app.public ?? false}/>
                    <Checkbox readOnly color="indigo" my={10} fz={16} label="Bot require Code Grant to invite" checked={settings.app.codeGrant ?? false}/>

                    <TextInput readOnly className={classes.text_input} label="Name" value={settings.app.name} />
                    <TextInput readOnly className={classes.text_input} label="Description" value={settings.app.description} />
                    <TextInput readOnly className={classes.text_input} label="Owner" value={settings.app.owner} />
                    <TextInput readOnly className={classes.text_input} label="Id" value={settings.app.id} />
                    <TextInput readOnly className={classes.text_input} label="Tags" value={settings.app.tags}/>

                    <ImageDisplay value={settings.app.iconURL} label="Icon URL" />
                    
                    <TextInput readOnly className={classes.text_input} label="Slash Commands" value={settings.app.commands}/>
                    <TextInput readOnly className={classes.text_input} label="Created At" value={new Date(settings.app.createdAt)}/>

                </ScrollArea>
            </Box>
        </Paper>
    )
}