import { Paper, Box, Text, ScrollArea, Checkbox, TextInput, SimpleGrid, Accordion, Flex } from "@mantine/core"
import { IconInfoCircle } from "@tabler/icons"
import { useStyles } from "../../../styles/Pages.style"
import { useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"
import { AddSocketListener, SendMessage } from "../../misc/WebSocket"
import { defaultCommandData } from "../../misc/Enums"

export const CmdInfoSection = ({commandActive}) => {
    const theme = useMantineTheme()
    const { classes } = useStyles()
    const [ commandData, setCommandData ] = useState(defaultCommandData)


    useEffect(() => {
        AddSocketListener("command_info", (data) => {
            setCommandData(data)
        })
    })


    useEffect(() => {
        if(commandActive) SendMessage("get_command_info", {id:commandActive})
    }, [commandActive])



    var optionsEl = []
    for(const opt of commandData.options){
        optionsEl.push(
            <Flex direction="row" align="center" ml={0} p={10} mb={10} bg={theme.colors.dark[6]}
            sx={{
                boxSizing:"border-box",
                border:`1px solid ${theme.colors.dark[4]}`,
                borderRadius: 5,
                "&:hover":{
                    border:`1px solid ${theme.colors.dark[3]}`,
                    backgroundColor: theme.colors.dark[5],
                }
            }}
            >
                <SimpleGrid cols={4} spacing={20}>
                    <TextInput readOnly label="Name"  className={classes.text_input} value={opt.name}/>
                    <TextInput readOnly label="Description" className={classes.text_input} value={opt.description}/>
                    <TextInput readOnly label="Type"  className={classes.text_input} value={opt.type}/>
                    <Checkbox  readOnly label="Required" color="indigo" m="auto 0" fz={16} checked={opt.required}/>
                </SimpleGrid>
            </Flex>
        )
    }


    var nameLocales = []
    for(const locale in commandData.localizations.name){
        nameLocales.push(<TextInput label={locale} key={`name_${locale}`} readOnly className={classes.text_input} value={commandData.localizations.name[locale]}/>)
    }

    var descLocales = []
    for(const locale in commandData.localizations.description){
        descLocales.push(<TextInput label={locale} key={`desc_${locale}`} readOnly className={classes.text_input} value={commandData.localizations.description[locale]}/>)
    }

    return (
        <Paper shadow="sm" radius="md" className={classes.paperswidth}> 

            <Box className={classes.paper_header}>
                <IconInfoCircle color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">Command Info</Text>
            </Box>

            <Box h="100%">
                <ScrollArea type="auto" h="90vh"  className={classes.scroll}>
                    <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                        <Checkbox color="indigo" readOnly mb={10} fz={16} label="Available on Dms" checked={commandData.isAvailableInDm}/>
                        <Checkbox color="indigo" readOnly mb={10} fz={16} label="Command is NSFW"  checked={commandData.isNsfw}/>
                    </ SimpleGrid>

                    <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                        <TextInput readOnly label="Name"  className={classes.text_input} value={commandData.name}/>
                        <TextInput readOnly label="Id"  className={classes.text_input} value={commandData.id}/>
                        <TextInput readOnly label="Description"  className={classes.text_input} value={commandData.description}/>
                        <TextInput readOnly label="Created At"  className={classes.text_input} value={new Date(commandData.createdAt)}/>
                        <TextInput readOnly label="Type"  className={classes.text_input} value={commandData.type}/>
                        <TextInput readOnly label="Guild Exclusive" className={classes.text_input} value={commandData.guild}/>
                    </SimpleGrid>

                    <Accordion  variant="contained" chevronPosition="left" mt={10}>

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
                                        <Text align="center" color={theme.colors.dark[3]}> Name Localizations </Text>
                                        {nameLocales}
                                    </Box>

                                    <Box>
                                        <Text align="center" color={theme.colors.dark[3]}> Description Localizations </Text>
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