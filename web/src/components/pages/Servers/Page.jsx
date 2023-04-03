import { Box,  Text, useMantineTheme, Avatar } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { useState, useEffect } from "react"
import { AddSocketListener, SendMessage } from "../../misc/WebSocket"
import { ListSection } from "./ListSection"
import { InfoSection } from "./InfoSection"



const ServerProfile = ({avatarUrl, name, id, active, setActive}) => {
    const {classes} = useStyles()
    const theme = useMantineTheme()

    return (
        <Box className={active ? classes.sv_profile_active : classes.sv_profile} onClick={()=>setActive(id)}>
            <Avatar src={avatarUrl} />
            <Text ml={10}> {name} </Text>
            <Text ml="auto" color={theme.colors.gray[7]} style={{ textOverflow:"ellipsis", overflow: "hidden"}}> {id} </Text>
        </Box>
    )
}



export const ServerPage = ({currentPage, setMsgDestiny, setCurrentPage}) => {
    const [actualSv, setActualSv] = useState()
    const [serverList, setServerList] = useState([])
    const {classes} = useStyles()
    
    
    useEffect(() => {
        AddSocketListener("servers_info", (data) => setServerList(data))
    })
    
    
    useEffect(() => {
        if(currentPage === "Servers") SendMessage("get_servers")
    }, [currentPage])
    
    
    
    useEffect(() => {
        if(actualSv) SendMessage("get_server_data", {id:actualSv})
    },[actualSv])
    
    
    
    const servers = serverList.map(server => (
        <ServerProfile active={actualSv === server.id} setActive={setActualSv} avatarUrl={server.avatar} name={server.name} id={server.id} key={server.id}/>
    ))

    
    return (
        <Box className={classes.parent}>
            <ListSection servers={servers} />
            <InfoSection server={actualSv} setMsgDestiny={setMsgDestiny} setCurrentPage={setCurrentPage}/>
        </Box>
    )
}