import { Box, Paper, Text, ScrollArea, useMantineTheme } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { IconServer} from "@tabler/icons"


export const ListSection = ({servers}) => {
    const theme = useMantineTheme()
    const {classes} = useStyles()

    return(
        <Paper shadow="sm" radius="md" className={classes.papers}>
            
            <Box className={classes.paper_header}>
                <IconServer color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">Server List</Text>
            </Box>

            
            <Box h="100%">
                <ScrollArea type="auto" className={classes.scroll}>
                    { servers }
                </ScrollArea>
            </Box>
        </Paper>
    )
}