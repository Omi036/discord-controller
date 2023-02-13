import { Box, Paper, Text, ScrollArea, useMantineTheme } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { IconServer} from "@tabler/icons"

// All the servers are listed here
export const ListSection = ({servers}) => {
    const theme = useMantineTheme()
    const {classes} = useStyles()

    return(
        <Paper shadow="sm" radius={"md"} className={classes.papers}>
            {/* Titlebar */}
            <Box className={classes.paper_header}>
                <IconServer color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">Server List</Text>
            </Box>

            {/* List */}
            <Box style={{height:"100%"}}>
                <ScrollArea type="auto" className={classes.scroll}>
                    { servers }
                </ScrollArea>
            </Box>
        </Paper>
    )
}