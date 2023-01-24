import { Box, Paper, Text, ScrollArea, useMantineTheme, TextInput, Avatar, SimpleGrid } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { IconServer, IconInfoCircle } from "@tabler/icons"
import { TextDisplay } from "../../misc/TextDisplay"
import { useState } from "react"


const AvatarProfile = ({avatarUrl, name, id, active, setActive}) => {
    const {cx, classes} = useStyles()
    const theme = useMantineTheme()
    return (
        <Box className={active === id ? classes.sv_profile_active : classes.sv_profile} onClick={()=>setActive(id)}>
            <Avatar src={avatarUrl} />
            <Text style={{marginLeft:10}}>{name}</Text>
            <Text style={{marginLeft:"auto", color:theme.colors.gray[7], textOverflow:"ellipsis", overflow: "hidden"}}>{id}</Text>
        </Box>
    )
}


export const ServerPage = () => {
    const [actualSv, setActualSv] = useState()
    const theme = useMantineTheme()
    const {classes} = useStyles()

    return (
        <Box className={classes.parent}>
            <Paper shadow="sm" radius={"md"} className={classes.papers}>
                <Box className={classes.paper_header}>
                    <IconServer color={theme.white} className={classes.app_icon}/>
                    <Text color={theme.white} fontWeight="bold">Server List</Text>
                </Box>
                <Box style={{height:"100%"}}>
                    <ScrollArea type="auto" className={classes.scroll}>
                        <AvatarProfile active={actualSv} setActive={setActualSv} avatarUrl={"https://cdn.discordapp.com/icons/1019672644834037773/4fac0f826312509df6e242ab49d8bf6e.png?size=2048"} name="OmiPlace" id={"1019672644834037773"} />
                        <AvatarProfile active={actualSv} setActive={setActualSv} avatarUrl={"https://cdn.discordapp.com/icons/1019672644834037773/4fac0f826312509df6e242ab49d8bf6e.png?size=2048"} name="OmiPlace" id={"1019672644834037772"} />
                    </ScrollArea>
                </Box>
            </Paper>
            <Paper shadow="sm" radius={"md"} className={classes.paperswidth}>
                <Box className={classes.paper_header}>
                    <IconInfoCircle color={theme.white} className={classes.app_icon}/>
                    <Text color={theme.white} fontWeight="bold">Server Info</Text>
                </Box>
                <Box style={{height:"100%"}}>
                    <ScrollArea type="auto" className={classes.scroll}>
                        <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                            <TextInput label="Initializated At" readOnly className={classes.text_input}/>
                            <TextInput label="Initializated At" readOnly className={classes.text_input}/>
                            <TextInput label="Initializated At" readOnly className={classes.text_input}/>
                            <TextInput label="Initializated At" readOnly className={classes.text_input}/>

                        </SimpleGrid>
                    </ScrollArea>
                </Box>
            </Paper>
        </Box>
    )
}