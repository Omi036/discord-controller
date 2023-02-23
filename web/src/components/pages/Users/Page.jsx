import { Box } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { useMantineTheme } from "@mantine/core"
import { SearchSection } from "./SearchSection"
import { UserInfoSection } from "./UserInfoSection"

export const UsersPage = ({page, setPage, setMgsDestiny}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()

    return (
        <Box className={classes.parent}>
            <SearchSection />
            <UserInfoSection />
        </Box>
    )
}