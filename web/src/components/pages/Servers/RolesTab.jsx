import { ScrollArea, SimpleGrid, TextInput, Box, Text } from "@mantine/core"
import { useState } from "react"
import { useStyles } from "../../../styles/Pages.style"

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


export const RolesTab = () => {
    const [role, setRole] = useState(false)
    const {classes} = useStyles()
    
    return (
        <ScrollArea type="auto" className={classes.scroll} style={{height: "88.5vh"}}>
            <SimpleGrid cols={1} spacing={40} verticalSpacing={5}>
                <Role name="Administración" id="000000000000000000" color={"#99aab5"} setRole={setRole} />
                <Role name="Fundador" id="000000000000000000" color={"#ed6f90"} setRole={setRole} />
                <Role name="Admin" id="000000000000000000" color={"#f77e74"} setRole={setRole} />
                <Role name="Moderador" id="000000000000000000" color={"#f7a474"} setRole={setRole} />
                <Role name="Bot" id="000000000000000000" color={"#edc479"} setRole={setRole} />
            </SimpleGrid>
        </ScrollArea>
    )
}