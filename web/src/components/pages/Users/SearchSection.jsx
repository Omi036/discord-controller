import { Paper, Box, Text, TextInput, ScrollArea, Divider, LoadingOverlay, Flex } from "@mantine/core"
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


    const keyHandler = (event) => {
        if(event.key !== "Enter") return
        if(queryRef.current.value.length === 0) return

        event.preventDefault()
        SendMessage("query_user", {query:queryRef.current.value})
        setLoading(true)
    }


    var UsersElement = []
    for(const user of users) {
        UsersElement.push(<SideUser id={user.id} key={user.id} active={user.id === userActive} name={user.name} avatarUrl={user.avatarUrl} setActive={() => setUserActive(user.id)}></SideUser>)
    }


    
    return (
        <Paper shadow="sm" radius={"md"} className={classes.papers}>

            <Box className={classes.paper_header}>
                <IconUser color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">Users</Text>
            </Box>
            
            <Box h="100%">
                <Box p={10} style={{boxSizing:"border-box"}}>
                    <TextInput ref={queryRef} placeholder="Enter name or id to search" disabled={loading} onKeyDown={keyHandler} rightSection={<IconSearch size={15} />}/>
                    <Divider mt={15}/>
                </Box>

                <ScrollArea type="auto" className={classes.scroll} >
                    { loading && <LoadingOverlay visible overlayBlur={0} loader={customLoader}/>}
                    { UsersElement }
                    { UsersElement.length === 0 && !loading &&
                        <Flex align="center" justify="center" h="100%">
                            <Text color={theme.colors.dark[3]}> Search a user to start </Text> 
                        </Flex>
                    }
                </ScrollArea>

            </Box>
        </Paper>
    )
}