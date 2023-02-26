import { Paper, Box, Text, ScrollArea, Checkbox, TextInput, SimpleGrid, Accordion, Divider } from "@mantine/core"
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
        name:"",
        id:"000000000000000000", 
        description:"",
        createdAt:"",
        isNsfw:false,
        isAvailableInDm:false,
        type:"",
        guild:"",
        options:[],
        localizations:{name:{},description:{}}
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


    var optionsEl = []
    for(const opt of commandData.options){
        optionsEl.push(
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
                marginBottom:10,
                "&:hover":{
                    border:`1px solid ${theme.colors.dark[3]}`,
                    backgroundColor: theme.colors.dark[5],
                }
            })}>
                <SimpleGrid cols={4} spacing={20}>
                    <TextInput label="Name" readOnly className={classes.text_input} value={opt.name}/>
                    <TextInput label="Desc" readOnly className={classes.text_input} value={opt.description}/>
                    <TextInput label="Type" readOnly className={classes.text_input} value={opt.type}/>
                    <Checkbox label="Required" color="indigo" readOnly style={{ margin:"auto 0", fontSize: 16 }} checked={opt.required}/>
                </SimpleGrid>
            </Box>
        )
    }

    var test={"en-US":"En INglaterra", "bg":"Bulgaro","hr":"Croata"}

    var nameLocales = []
    for(const locale in commandData.localizations.name){
        nameLocales.push(<TextInput label={locale} key={locale} readOnly className={classes.text_input} value={commandData.localizations.name[locale]}/>)
    }

    var descLocales = []
    for(const locale in commandData.localizations.description){
        descLocales.push(<TextInput label={locale} key={locale} readOnly className={classes.text_input} value={commandData.localizations.description[locale]}/>)
    }

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
                    <Accordion  variant="contained" chevronPosition="left" sx={{marginTop:10}}>
                        <Accordion.Item value="options">
                            <Accordion.Control>Options</Accordion.Control>
                            <Accordion.Panel>
                                {optionsEl}
                            </Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item value="localizations">
                            <Accordion.Control>Localizations</Accordion.Control>
                            <Accordion.Panel>
                                <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                                    <Box>
                                        <Text align="center" color={theme.colors.dark[3]}>Name Localizations</Text>
                                        {nameLocales}
                                    </Box>

                                    <Box>
                                        <Text align="center" color={theme.colors.dark[3]}>Description Localizations</Text>
                                        {descLocales}
                                    </Box>
                                </SimpleGrid>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </ScrollArea>
            </Box>
        </Paper>
)
}