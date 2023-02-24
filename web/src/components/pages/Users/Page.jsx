import { Box } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { SearchSection } from "./SearchSection"
import { UserInfoSection } from "./UserInfoSection"
import { useState } from "react"

export const UsersPage = ({page, setPage, setMgsDestiny}) => {
    const { classes } = useStyles()
    const [userActive, setUserActive] = useState("")

    return (
        <Box className={classes.parent}>
            <SearchSection userActive={userActive} setUserActive={setUserActive}/>
            <UserInfoSection userActive={userActive} setActive={setUserActive}/>
        </Box>
    )
}