import { Paper, Box, Text, Button } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { IconQuestionMark} from "@tabler/icons"
import { useMantineTheme } from "@mantine/core"


export const DestinySelector = ({setPage}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()

    return (
        <Paper shadow="sm" radius={"md"} className={classes.paperfat}>
            <Box className={classes.paper_header}>
                <IconQuestionMark color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">Select a channel or an user to send messages</Text>
            </Box>
            <Box style={{boxSizing:"border-box", height:"75%", padding:20, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
                <Button color="indigo" fullWidth onClick={()=>setPage("Servers")} >Select a channel from a server</Button>
                <Button color="indigo" fullWidth onClick={()=>setPage("Users")}>Select a user</Button>
            </Box>
        </Paper>
    )
}