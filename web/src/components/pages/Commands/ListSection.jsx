import { Paper, Box, Text, ScrollArea } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { useMantineTheme } from "@mantine/core"
import { IconUser } from "@tabler/icons"
import { AddSocketListener, SendMessage } from "../../misc/WebSocket"
import { useEffect, useState } from "react"
import { CmdProfile } from "./CmdProfile"

export const ListSection = ({commandActive, setCommandActive, page}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()
    const [ commands, setCommands ] = useState([])

    useEffect(() => {
        AddSocketListener("commands", (data) => {
            setCommands(data)
        })
    })


    useEffect(() => {
        if(page !== "Commands") return
        SendMessage("get_commands")
    }, [page])


    const commandsEl = []
    for(const cmd of commands) {
        commandsEl.push(<CmdProfile name={cmd.name} id={cmd.id} active={cmd.id === commandActive} setActive={()=>setCommandActive(cmd.id)} key={cmd.key} />)
    }
    return (
        <Paper shadow="sm" radius={"md"} className={classes.papers}>
            {/* Titlebar */}
            <Box className={classes.paper_header}>
                <IconUser color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">Users</Text>
            </Box>

            {/* List */}
            <Box style={{height:"100%"}}>
                <ScrollArea type="auto" className={classes.scroll} >
                    {commandsEl}
                </ScrollArea>
            </Box>
        </Paper>
    )
}