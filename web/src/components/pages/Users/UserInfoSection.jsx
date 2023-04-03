import { Paper, Box, Text, ScrollArea, Checkbox, TextInput, SimpleGrid, ColorInput, LoadingOverlay, Accordion, Button } from "@mantine/core"
import { customLoader } from "../../../styles/LogIn.style"
import { IconInfoCircle } from "@tabler/icons"
import { ImageDisplay } from "../../misc/ImageDisplay"
import { useStyles } from "../../../styles/Pages.style"
import { useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"
import { AddSocketListener, SendMessage } from "../../misc/WebSocket"
import { defaultUserData, userFlagsList } from "../../misc/Enums"

export const UserInfoSection = ({userActive, setMsgDestiny, setCurrentPage}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()

    const [userData, setUserData] = useState(defaultUserData)

    useEffect(() => {
        AddSocketListener("user_info", (data) => setUserData(data))
    })
    

    useEffect(() => {
        if(!userActive) return
        SendMessage("get_user_info", {id:userActive})
    },[userActive])


    const flagsElement = userFlagsList.map(flag => (
        <Checkbox 
            readOnly 
            color="indigo"
            label={flag}
            checked={userData.flags.includes(flag)}
            key={flag} 
            />
        )
    )

    return (
        <Paper shadow="sm" radius="md" className={classes.paperswidth}> 
            <Box className={classes.paper_header}>
                <IconInfoCircle color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">User Info</Text>
            </Box>

            <Box h="100%">
                <ScrollArea type="auto" h="90vh" className={classes.scroll}>
                    { userData.id === "000000000000000000" && <LoadingOverlay visible overlayBlur={0} loader={customLoader} />}

                    <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                        <Checkbox color="indigo" readOnly mb={10} fz={16} label="User is System" checked={userData.isSystem}/>
                        <Checkbox color="indigo" readOnly mb={10} fz={16} label="User is Bot" checked={userData.isBot}/>
                    </ SimpleGrid>

                    <SimpleGrid cols={2} spacing={40} verticalSpacing={5} mb={10}>
                        <TextInput readOnly label="Tag" className={classes.text_input} value={userData.tag}/>
                        <TextInput readOnly label="Id" className={classes.text_input} value={userData.id}/>
                        <TextInput readOnly label="Created At" className={classes.text_input} value={new Date(userData.createdAt)}/>
                        
                        { userData.accentColor !== "Default" 
                          ? <ColorInput readOnly label="Accent Color" value={userData.accentColor}/> 
                          : <TextInput readOnly  label="Accent Color" value="Default"/>
                        }

                        <ImageDisplay label="Avatar Url" value={userData.avatarUrl} />
                        {userData.banner && <ImageDisplay label="Banner Url" value={userData.banner} />}
                    </SimpleGrid>


                    <Accordion variant="contained" chevronPosition="left">
                        <Accordion.Item value="flags">
                            <Accordion.Control>Flags</Accordion.Control>
                            <Accordion.Panel>
                                <SimpleGrid cols={2} mb={15}>
                                    {flagsElement}
                                </SimpleGrid>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                    <Box mt={10}>
                        <Button color="indigo" fullWidth onClick={()=>{setMsgDestiny({type:"dm", id:userData.id});setCurrentPage("Messages")}}>Send Message</Button>
                    </Box>
                </ScrollArea>
            </Box>
        </Paper>
    )
}