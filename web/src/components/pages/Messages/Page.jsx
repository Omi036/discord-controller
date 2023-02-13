import { Box } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { DestinySelector } from "./DestinySelector"
import { Chat } from "./Chat"


export const MessagesPage = ({msgDestiny, setMsgDestiny, setPage}) => {
    const { classes } = useStyles()

    return (
        <Box className={classes.parent}>
            { msgDestiny 
                ? <Chat destiny={msgDestiny} setDestiny={setMsgDestiny}/> 
                : <DestinySelector setPage={setPage} /> 
            }
        </Box>
    )
}