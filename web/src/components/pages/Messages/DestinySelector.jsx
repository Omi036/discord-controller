import { Paper, Box, Text, Button, Flex } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { IconQuestionMark} from "@tabler/icons"
import { useMantineTheme } from "@mantine/core"


export const DestinySelector = ({setCurrentPage}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()

    return (
        <Paper shadow="sm" radius={"md"} className={classes.paperfat}>
            <Box className={classes.paper_header}>
                <IconQuestionMark color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">Select a channel or an user to send messages</Text>
            </Box>

            <Flex h="75%" p={20} direction="column" justify="space-between" align="center" style={{boxSizing:"border-box"}}>
                <Button color="indigo" fullWidth onClick={()=>setCurrentPage("Servers")} >Select a channel from a server</Button>
                <Button color="indigo" fullWidth onClick={()=>setCurrentPage("Users")}>Select a user</Button>
            </Flex>
        </Paper>
    )
}