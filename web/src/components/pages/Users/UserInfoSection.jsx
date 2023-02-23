import { Paper, Box, Text } from "@mantine/core"
import { IconInfoCircle } from "@tabler/icons"
import { useStyles } from "../../../styles/Pages.style"
import { useMantineTheme } from "@mantine/core"

export const UserInfoSection = () => {
    const { classes } = useStyles()
    const theme = useMantineTheme()

    return (
    <Paper shadow="sm" radius="md" className={classes.paperswidth}> 
        <Box className={classes.paper_header}>
            <IconInfoCircle color={theme.white} className={classes.app_icon}/>
            <Text color={theme.white} weight="600">User Info</Text>
        </Box>

        <Box style={{height:"100%"}}>
        </Box>
    </Paper>
)
}