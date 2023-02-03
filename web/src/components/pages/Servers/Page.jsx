import { Box,  Text, useMantineTheme, Avatar } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { useState, useEffect } from "react"
import { WSocket, AddSocketListener, SendMessage } from "../../misc/WebSocket"
import { ListSection } from "./ListSection"
import { InfoSection } from "./InfoSection"


const AvatarProfile = ({avatarUrl, name, id, active, setActive}) => {
    const {classes} = useStyles()
    const theme = useMantineTheme()
    return (
        <Box className={active === id ? classes.sv_profile_active : classes.sv_profile} onClick={()=>setActive(id)}>
            <Avatar src={avatarUrl} />
            <Text style={{marginLeft:10}}>{name}</Text>
            <Text style={{marginLeft:"auto", color:theme.colors.gray[7], textOverflow:"ellipsis", overflow: "hidden"}}>{id}</Text>
        </Box>
    )
}


export const ServerPage = ({page}) => {
    const [actualSv, setActualSv] = useState()
    const [serverList, setServerList] = useState([])
    const {classes} = useStyles()

    useEffect(() => {
        AddSocketListener("servers_info", (data) => {
            setServerList(data)
        })
    })

    // This executes when the serverPage is loaded
    useEffect(() => {
        if(page !== "Servers") return

        SendMessage("get_servers",{})
    }, [page])

    
    // This executes when the server is changed
    useEffect(() => {
        if(!actualSv) return

        SendMessage("get_server_data", {id:actualSv})
    },[actualSv])

    const servers = []
    serverList.forEach(server => {
        servers.push(<AvatarProfile active={actualSv} setActive={setActualSv} avatarUrl={server.avatar} name={server.name} id={server.id} key={server.id}/>)
    })

    return (
        <Box className={classes.parent}>
            <ListSection servers={servers} />
            <InfoSection />
        </Box>
    )
}