import { Box } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { SearchSection } from "./SearchSection"
import { UserInfoSection } from "./UserInfoSection"
import { useState } from "react"

export const UsersPage = ({ setCurrentPage, setMsgDestiny}) => {
    const { classes } = useStyles()
    const [userActive, setUserActive] = useState("")

    return (
        <Box className={classes.parent}>
            <SearchSection userActive={userActive} setUserActive={setUserActive}/>
            <UserInfoSection userActive={userActive} setMsgDestiny={setMsgDestiny} setCurrentPage={setCurrentPage}/>
        </Box>
    )
}