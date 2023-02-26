import { Paper, Box, Text, ScrollArea, Checkbox, TextInput, SimpleGrid, ColorInput, LoadingOverlay, Accordion, Button } from "@mantine/core"
import { customLoader } from "../../../styles/Settings.style"
import { IconInfoCircle } from "@tabler/icons"
import { ImageDisplay } from "../../misc/ImageDisplay"
import { useStyles } from "../../../styles/Pages.style"
import { useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"
import { AddSocketListener, SendMessage } from "../../misc/WebSocket"


export const CmdInfoSection = ({commandActive, setCommandActive}) => {
    const theme = useMantineTheme()
    const { classes } = useStyles()
    const defaultCommandData = {
        name:"", //command.name
        id:"000000000000000000", //command.id
        description:"",//command.description
        createdAt:"",//command.createdAt
        isNsfw:false,//command.nsfw
        isAvailableInDm:false,//command.dmPermission
        type:"",//command.type
        guild:"",//command.guild.name?
        options:[],//command.options
    }
    const [ commandData, setCommandData ] = useState(defaultCommandData)



    useEffect(() => {
        AddSocketListener("command_info", (data) => {
            setCommandData(data)
        })
    })

    useEffect(() => {
        if(!commandActive) return
        SendMessage("get_command_info", {id:commandActive})
    }, [commandActive])

    return (
        <Paper shadow="sm" radius="md" className={classes.paperswidth}> 
            <Box className={classes.paper_header}>
                <IconInfoCircle color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">Command Info</Text>
            </Box>

            <Box style={{height:"100%"}}>
                <ScrollArea type="auto" style={{height:"90vh"}} className={classes.scroll}>
                    <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                        <Checkbox label="Available on Dms" color="indigo" readOnly style={{ marginBottom: 10, fontSize: 16 }} checked={commandData.isAvailableInDm}/>
                        <Checkbox label="Command is NSFW" color="indigo" readOnly style={{ marginBottom: 10, fontSize: 16 }} checked={commandData.isNsfw}/>
                    </ SimpleGrid>
                    <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                        <TextInput label="Name" readOnly className={classes.text_input} value={commandData.name}/>
                        <TextInput label="Id" readOnly className={classes.text_input} value={commandData.id}/>
                        <TextInput label="Description" readOnly className={classes.text_input} value={commandData.description}/>
                        <TextInput label="Created At" readOnly className={classes.text_input} value={new Date(commandData.createdAt)}/>
                        <TextInput label="Type" readOnly className={classes.text_input} value={commandData.type}/>
                        <TextInput label="Guild Exclusive" readOnly className={classes.text_input} value={commandData.guild}/>
                    </SimpleGrid>
                </ScrollArea>
            </Box>
        </Paper>
)
}