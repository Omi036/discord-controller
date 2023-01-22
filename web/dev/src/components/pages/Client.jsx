import { Paper, Box, ScrollArea, Text, TextInput } from "@mantine/core"
import { IconRobot, IconUser, IconApps } from "@tabler/icons"
import { useMantineTheme } from "@mantine/core"
import { useStyles } from "../styles/Client.style"
import { useState } from "react"

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
                        <TextInput label="Nº of Servers" readOnly className={classes.text_input}/>
                        <TextInput label="Nº of Channels" readOnly className={classes.text_input}/>
                        <TextInput label="Nº of Users" readOnly className={classes.text_input}/>
                        <TextInput label="Token" readOnly className={classes.text_input}/>
                        <TextInput label="Initialized at" readOnly className={classes.text_input}/>
                    </ScrollArea>
                </Box>
            </Paper>

            <Paper shadow="sm" radius={"md"} className={classes.papers}>
                <Box className={classes.paper_header}>
                    <IconUser color={theme.white} className={classes.app_icon}/>
                    <Text color={theme.white} fontWeight="bold">User</Text>
                </Box>
                <Box>
                    <ScrollArea type="auto">

                    </ScrollArea>
                </Box>
            </Paper>

            <Paper shadow="sm" radius={"md"} className={classes.papers}>
                <Box className={classes.paper_header}>
                    <IconApps color={theme.white} className={classes.app_icon}/>
                    <Text color={theme.white} fontWeight="bold">Application</Text>
                </Box>
                <Box>
                    <ScrollArea type="auto">

                    </ScrollArea>   
                </Box>
            </Paper>
        </Box>
    )
}