import { Paper, Box, Text, TextInput, ScrollArea, Divider, LoadingOverlay } from "@mantine/core"
import { customLoader } from "../../../styles/Settings.style"
import { useStyles } from "../../../styles/Pages.style"
import { useMantineTheme } from "@mantine/core"
import { IconSearch, IconUser } from "@tabler/icons"
import { SendMessage, AddSocketListener } from "../../misc/WebSocket"
import { SideUser } from "./SideUser"
import { useRef, useEffect, useState } from "react"

export const SearchSection = ({userActive, setUserActive}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()
    const queryRef = useRef()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        AddSocketListener("return_query_user", (data) => {
            setLoading(false)
            setUsers(data)
        })
    })


    const keyHandler = (e) => {
        if(e.key !== "Enter") return
        if(queryRef.current.value.length === 0) return

        e.preventDefault()
        SendMessage("query_user", {query:queryRef.current.value})
        setLoading(true)
    }

    var UsersElement = []
    for(const user of users) {
        UsersElement.push(<SideUser id={user.id} key={user.id} active={user.id === userActive} name={user.name} avatarUrl={user.avatarUrl} setActive={() => setUserActive(user.id)}></SideUser>)
    }
    return (
        <Paper shadow="sm" radius={"md"} className={classes.papers}>
            {/* Titlebar */}
            <Box className={classes.paper_header}>
                <IconUser color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">Users</Text>
            </Box>
            {/* List */}
            <Box style={{height:"100%"}}>
                <Box style={{boxSizing:"border-box",padding:10}}>
                    <TextInput ref={queryRef} placeholder="Enter name or id to search" disabled={loading} onKeyDown={keyHandler} rightSection={<IconSearch size={15} />}/>
                    <Divider style={{marginTop:15}}/>
                </Box>
                <ScrollArea type="auto" className={classes.scroll} >
                    { UsersElement }
                    { UsersElement.length === 0 && !loading &&
                    <Box sx={{display: 'flex', alignItems:"center", justifyContent: 'center', height: '100%'}}>
                        <Text color={theme.colors.dark[3]}>Search a user to start</Text> 
                    </Box>
                    }
                    { loading && <LoadingOverlay visible overlayBlur={0} loader={customLoader}/>}
                </ScrollArea>
            </Box>
        </Paper>
    )
}