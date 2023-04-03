import { ScrollArea, SimpleGrid, Box, Text, LoadingOverlay } from "@mantine/core"
import { AddSocketListener, SendMessage } from "../../../misc/WebSocket"
import { useState, useEffect } from "react"
import { useStyles } from "../../../../styles/Pages.style"
import { RoleInfo } from "../Info/RoleInfo"
import { customLoader } from "../../../../styles/LogIn.style"
import { Flex, useMantineTheme } from "@mantine/core"


const Role = ({name, id, color, setRole}) => {
    const theme = useMantineTheme()

    return(
        <Flex 
            direction="row"
            align="center"
            ml={0}
            p={10}
            bg={theme.colors.dark[6]}
            onClick={()=>{setRole(id)}}

            sx={(theme)=>({
                boxSizing:"border-box",
                border:`1px solid ${theme.colors.dark[4]}`,
                borderRadius: 5,
                cursor:"pointer",
                "&:hover":{
                    border:`1px solid ${theme.colors.dark[3]}`,
                    backgroundColor: theme.colors.dark[5],
                }
            })} 
        >
            <Box w={10} h={10} bg={color} ml={5} style={{borderRadius:"100%"}} />
            <Text ml={10} color={theme.colors.dark[2]}> {name} </Text>
            <Text ml="auto" color={theme.colors.dark[3]}> {id} </Text>
        </Flex>
    )
}


export const RolesTab = ({ server, tab, thirdRole, setThirdRole }) => {
    const [actualRole, setActualRole] = useState()
    const [roles, setRoles] = useState([])
    const {classes} = useStyles()

    
    useEffect(() => {
        AddSocketListener("roles", roles => {
            var updatedRoles = roles.map(role => <Role {...role} setRole={setActualRole} key={role.id} />)
            setRoles(updatedRoles)
        })
    })


    useEffect(() => {
        if(tab === "roles") SendMessage("get_roles", {id:server})
    }, [tab])

    
    useEffect(() => {
        if(!server) return
        setActualRole()
        setRoles([])
        setThirdRole()
    }, [server])
    

    
    return (
        <ScrollArea type="auto" className={classes.scroll} h="88.5vh">
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