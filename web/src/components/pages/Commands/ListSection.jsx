import { Paper, Box, Text, ScrollArea } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { useMantineTheme } from "@mantine/core"
import { IconCode } from "@tabler/icons"
import { AddSocketListener, SendMessage } from "../../misc/WebSocket"
import { useEffect, useState } from "react"
import { CmdProfile } from "./CmdProfile"

export const ListSection = ({commandActive, setCommandActive, currentPage}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()
    const [ commands, setCommands ] = useState([])


    useEffect(() => {
        AddSocketListener("commands", (data) => {
            setCommands(data)
        })
    })


    useEffect(() => {
        if(currentPage !== "Commands") return
        SendMessage("get_commands")
    }, [currentPage])


    const commandsEl = []
    for(const cmd of commands) {
        commandsEl.push(<CmdProfile name={cmd.name} id={cmd.id} active={cmd.id === commandActive} setActive={()=>setCommandActive(cmd.id)} key={cmd.id} />)
    }

    
    return (
        <Paper shadow="sm" radius={"md"} className={classes.papers}>
            
            <Box className={classes.paper_header}>
                <IconCode color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">Commands</Text>
            </Box>

            
            <Box h="100%">
                <ScrollArea type="auto" className={classes.scroll} >
                    {commandsEl}
                </ScrollArea>
            </Box>
        </Paper>
    )
}