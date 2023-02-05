import { ScrollArea, SimpleGrid, Box, Text, LoadingOverlay } from "@mantine/core"
import { AddSocketListener, SendMessage } from "../../../misc/WebSocket"
import { useState, useEffect } from "react"
import { useStyles } from "../../../../styles/Pages.style"
import { RoleInfo } from "../Info/RoleInfo"
import { customLoader } from "../../../../styles/Settings.style"

const Role = ({name, id, color, setRole}) => {
    return(
    <Box sx={(theme)=>({
        boxSizing:"border-box",
        padding:10,
        display:"flex",
        flexDirection: "row",
        alignItems:"center",
        marginLeft: 0,
        border:`1px solid ${theme.colors.dark[4]}`,
        backgroundColor: theme.colors.dark[6],
        borderRadius: 5,
        cursor:"pointer",
        "&:hover":{
            border:`1px solid ${theme.colors.dark[3]}`,
            backgroundColor: theme.colors.dark[5],
        }
    })} onClick={()=>{setRole(id)}}>
        <Box style={{width:10, height:10, borderRadius:"100%", backgroundColor: color, marginLeft:5}}></Box>
        <Text sx={(theme)=>({marginLeft:10, color:theme.colors.dark[2]})}>{name}</Text>
        <Text sx={(theme)=>({marginLeft:"auto", color:theme.colors.dark[3]})}>{id}</Text>
    </Box>)
}


export const RolesTab = ({ server, tab }) => {
    const [role, setRole] = useState(false)
    const [roles, setRoles] = useState([])
    const {classes} = useStyles()

    useEffect(() => {
        AddSocketListener("roles", roles => {
            var new_roles = [];

            roles.forEach(role => {
                new_roles.push(<Role {...role} setRole={setRole} key={role.id} />)
            })

            setRoles(new_roles)
        })
    })

    useEffect(() => {
        if(tab !== "roles") return
        SendMessage("get_roles", {id:server})
    }, [tab])

    useEffect(() => {
        if(!server) return
        setRole(false)
        setRoles([])

    }, [server])
    
    return (
        <ScrollArea type="auto" className={classes.scroll} style={{height: "88.5vh"}}>
            { roles.length === 0 ? <LoadingOverlay visible overlayBlur={2} loader={customLoader} /> : <></> }
            { role ? <RoleInfo roleId={role} serverId={server} setRole={setRole} /> :
            <SimpleGrid cols={1} spacing={40} verticalSpacing={5}>
                { roles }
            </SimpleGrid>
             }
        </ScrollArea>
    )
}