import { useMantineTheme, Paper, Box, ScrollArea, Text, TextInput, Checkbox } from "@mantine/core"
import { IconRobot, IconUser, IconApps } from "@tabler/icons"
import { useStyles } from "../styles/Pages.style"
import { TextDisplay } from "../TextDisplay"

export const ClientPage = () => {
    const theme = useMantineTheme()
    const {classes} = useStyles()

    return (
        <Box className={classes.parent}>
            <Paper shadow="sm" radius={"md"} className={classes.papers}>
                <Box className={classes.paper_header}>
                    <IconRobot color={theme.white} className={classes.app_icon}/>
                    <Text color={theme.white} fontWeight="bold">Discord Client</Text>
                </Box>
                <Box style={{height:"100%"}}>
                    <ScrollArea type="auto" className={classes.scroll}>
                        <Box className={classes.hbox}>
                            <TextDisplay label={"Servers"} value={32} />
                            <TextDisplay label={"Channels"} value={32} />
                        </Box>
                        <Box className={classes.hbox}>
                            <TextDisplay label={"Users"} value={32} />
                        </Box>
                        
                        <TextInput label="Token" readOnly className={classes.text_input}/>
                        <TextInput label="Initializated At" readOnly className={classes.text_input}/>
                        <TextInput label="Bot invite" readOnly className={classes.text_input}/>
                    </ScrollArea>
                </Box>
            </Paper>

            <Paper shadow="sm" radius={"md"} className={classes.papers}>
                <Box className={classes.paper_header}>
                    <IconUser color={theme.white} className={classes.app_icon}/>
                    <Text color={theme.white} fontWeight="bold">User</Text>
                </Box>
                <Box>
                    <ScrollArea type="auto" className={classes.scroll}>
                        <TextInput label="Avatar URL" readOnly className={classes.text_input}/>
                        <TextInput label="Created At" readOnly className={classes.text_input}/>
                        <TextInput label="Description" readOnly className={classes.text_input}/>
                        <TextInput label="Tag" readOnly className={classes.text_input}/>
                        <TextInput label="Id" readOnly className={classes.text_input}/>
                        <TextInput label="Status" readOnly className={classes.text_input}/>
                        <TextInput label="Client Status" readOnly className={classes.text_input}/>
                    </ScrollArea>
                </Box>
            </Paper>

            <Paper shadow="sm" radius={"md"} className={classes.papers}>
                <Box className={classes.paper_header}>
                    <IconApps color={theme.white} className={classes.app_icon}/>
                    <Text color={theme.white} fontWeight="bold">Application</Text>
                </Box>
                <Box>
                    <ScrollArea type="auto" className={classes.scroll}>
                        <Checkbox label="Bot is Public" readOnly checked={true} color="indigo" style={{marginBottom:10,fontSize:16}}/>
                        <Checkbox label="Bot require Code Grant to invite" readOnly checked={true} color="indigo" style={{marginBottom:10,marginTop:10,fontSize:16}}/>
                        <TextInput label="Slash Commands" readOnly className={classes.text_input}/>
                        <TextInput label="Created At" readOnly className={classes.text_input}/>
                        <TextInput label="Description" readOnly className={classes.text_input}/>
                        <TextInput label="Icon URL" readOnly className={classes.text_input}/>
                        <TextInput label="Id" readOnly className={classes.text_input}/>
                        <TextInput label="Name" readOnly className={classes.text_input}/>
                        <TextInput label="Owner" readOnly className={classes.text_input}/>
                        <TextInput label="Tags" readOnly className={classes.text_input}/>
                    </ScrollArea>
                </Box>
            </Paper>
        </Box>
    )
}