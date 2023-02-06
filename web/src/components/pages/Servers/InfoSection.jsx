import { Box, Paper, Text, useMantineTheme, Tabs } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { IconInfoCircle } from "@tabler/icons"
import { useState, useEffect } from "react"

import { GeneralTab } from "./Tabs/GeneralTab"
import { RolesTab } from "./Tabs/RolesTab"
import { ChannelsTab } from "./Tabs/ChannelsTab"
import { MembersTab } from "./Tabs/MembersTab"

// Contains info about a server
export const InfoSection = ({server}) => {
    const [tab, setTab] = useState("general")
    const theme = useMantineTheme()
    const {classes} = useStyles()

    // When the server is changed, the tab will return to general
    useEffect(() => {
        setTab("general")
    }, [server])

    
    return(<Paper shadow="sm" radius={"md"} className={classes.paperswidth}>
        <Tabs variant="pills" color={"dark"} defaultValue="general" value={tab} onTabChange={setTab} style={{height:"50%"}}>
        <Box className={classes.paper_header}>
            <IconInfoCircle color={theme.white} className={classes.app_icon}/>
            <Text color={theme.white} fontWeight="bold">Server Info</Text>
            <Tabs.List defaultValue="general"  style={{marginLeft:"auto",marginRight:5}}>
                <Tabs.Tab value="general">General</Tabs.Tab>
                <Tabs.Tab value="channels">Channels</Tabs.Tab>
                <Tabs.Tab value="roles">Roles</Tabs.Tab>
                <Tabs.Tab value="members">Members</Tabs.Tab>
            </Tabs.List>
        </Box>
        <Box style={{height:"100%"}}>
            <Tabs.Panel value="general"><GeneralTab server={server} /></Tabs.Panel>
            <Tabs.Panel value="channels"><ChannelsTab tab={tab} server={server} /></Tabs.Panel>
            <Tabs.Panel value="roles"><RolesTab tab={tab} server={server} /></Tabs.Panel>
            <Tabs.Panel value="members"><MembersTab tab={tab} server={server} /></Tabs.Panel>
        </Box>
        </Tabs>
    </Paper>)
}