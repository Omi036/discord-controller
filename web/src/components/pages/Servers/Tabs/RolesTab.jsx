import { ScrollArea, SimpleGrid, Box, Text, LoadingOverlay } from "@mantine/core"
import { AddSocketListener, SendMessage } from "../../../misc/WebSocket"
import { useState, useEffect } from "react"
import { useStyles } from "../../../../styles/Pages.style"
import { RoleInfo } from "../Info/RoleInfo"
import { customLoader } from "../../../../styles/Settings.style"

// One of the many role elements showed in the roles list
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
        <Box style={{width:10, height:10, borderRadius:"100%", backgroundColor: color, marginLeft:5}} />
        <Text sx={(theme)=>({marginLeft:10, color:theme.colors.dark[2]})}>{name}</Text>
        <Text sx={(theme)=>({marginLeft:"auto", color:theme.colors.dark[3]})}>{id}</Text>
    </Box>)
}

// Lists all the roles and their information
export const RolesTab = ({ server, tab, thirdRole, setThirdRole }) => {
    const [actualRole, setActualRole] = useState()
    const [roles, setRoles] = useState([])
    const {classes} = useStyles()

    // Adds the Socket listener that will add all the roles to the list
    useEffect(() => {
        AddSocketListener("roles", roles => {
            var new_roles = [];
            new_roles = roles.map(role => <Role {...role} setRole={setActualRole} key={role.id} />)
            setRoles(new_roles)
        })
    })

    // If the tab is pressed, will request all the roles of the server
    useEffect(() => {
        if(tab !== "roles") return
        SendMessage("get_roles", {id:server})
    }, [tab])

    // On server change, will clean the section
    useEffect(() => {
        if(!server) return
        setActualRole()
        setRoles([])
        setThirdRole()
    }, [server])
    

    // React Element (Note the two nested ternary operators)
    return (
        <ScrollArea type="auto" className={classes.scroll} style={{height: "88.5vh"}}>
            { roles.length === 0 && <LoadingOverlay visible overlayBlur={2} loader={customLoader} />}
            { actualRole 
                ? <RoleInfo roleId={actualRole} serverId={server} setRole={setActualRole} /> 
                : thirdRole 
                    ? <RoleInfo roleId={thirdRole} serverId={server} setRole={() => setThirdRole()} /> 
                    : <SimpleGrid cols={1} spacing={40} verticalSpacing={5}>{ roles }</SimpleGrid>
            }
        </ScrollArea>
    )
}