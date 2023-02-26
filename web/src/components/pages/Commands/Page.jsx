import { Box } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { ListSection } from "./ListSection"
import { useState } from "react"
import { CmdInfoSection } from "./CmdInfoSection"

export const CommandsPage = ({page, setPage}) => {
    const { classes } = useStyles()
    const [commandActive, setCommandActive] = useState("")

    return (
        <Box className={classes.parent}>
            <ListSection commandActive={commandActive} setCommandActive={setCommandActive} page={page}/>
            <CmdInfoSection commandActive={commandActive} setCommandActive={setCommandActive}/>
        </Box>
    )
}