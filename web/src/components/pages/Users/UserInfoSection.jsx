import { Paper, Box, Text, ScrollArea, Checkbox, TextInput, SimpleGrid, ColorInput, LoadingOverlay, Accordion, Button } from "@mantine/core"
import { customLoader } from "../../../styles/Settings.style"
import { IconInfoCircle } from "@tabler/icons"
import { ImageDisplay } from "../../misc/ImageDisplay"
import { useStyles } from "../../../styles/Pages.style"
import { useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"
import { AddSocketListener, SendMessage } from "../../misc/WebSocket"

export const UserInfoSection = ({userActive, setMsgDestiny, setCurrentPage}) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()
    const defaultData = {
        isSystem:false, 
        isBot:false, 
        tag: "",
        id: "000000000000000000", 
        createdAt: "", 
        accentColor: "Default",
        avatarUrl: "",
        banner: "",
        flags:[],
    }
    const [userData, setUserData] = useState(defaultData)
    const flagsList = [
        "ActiveDeveloper",
        "BotHTTPInteractions",
        "BugHunterLevel1",
        "BugHunterLevel2",
        "CertifiedModerator",
        "HypeSquadOnlineHouse1",
        "HypeSquadOnlineHouse2",
        "HypeSquadOnlineHouse3",
        "Hypesquad",
        "Partner",
        "PremiumEarlySupporter",
        "Quarantined",
        "Spammer",
        "Staff",
        "TeamPseudoUser",
        "VerifiedBot",
        "VerifiedDeveloper"
    ]


    useEffect(() => {
        AddSocketListener("user_info", (data) => {
            setUserData(data)
        })
    })
    
    useEffect(() => {
        if(!userActive) return
        SendMessage("get_user_info", {id:userActive})
    },[userActive])

    var flagsElement = []
    for(const flag of flagsList){
        flagsElement.push(
            <Checkbox 
            readOnly 
            color={"indigo"}
            label={flag}
            checked={userData.flags.includes(flag)}
            key={flag} 
            />
        )
    }
    return (
        <Paper shadow="sm" radius="md" className={classes.paperswidth}> 
            <Box className={classes.paper_header}>
                <IconInfoCircle color={theme.white} className={classes.app_icon}/>
                <Text color={theme.white} weight="600">User Info</Text>
            </Box>

            <Box style={{height:"100%"}}>
                <ScrollArea type="auto" style={{height:"90vh"}} className={classes.scroll}>
                    { userData.id === "000000000000000000" && <LoadingOverlay visible overlayBlur={0} loader={customLoader} />}
                    <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                        <Checkbox label="User is System" color="indigo" readOnly style={{ marginBottom: 10, fontSize: 16 }} checked={userData.isSystem}/>
                        <Checkbox label="User is Bot" color="indigo" readOnly style={{ marginBottom: 10, fontSize: 16 }} checked={userData.isBot}/>
                    </ SimpleGrid>

                    <SimpleGrid cols={2} spacing={40} verticalSpacing={5} style={{marginBottom: 10}}>
                        <TextInput label="Tag" readOnly className={classes.text_input} value={userData.tag}/>
                        <TextInput label="Id" readOnly className={classes.text_input} value={userData.id}/>
                        <TextInput label="Created At" readOnly className={classes.text_input} value={new Date(userData.createdAt)}/>
                        { userData.accentColor !== "Default" ?  <ColorInput readOnly label="Accent Color" value={userData.accentColor}/> : <TextInput readOnly label="Accent Color" value="Default"/>}
                        <ImageDisplay label="Avatar Url" value={userData.avatarUrl} />
                        {userData.banner && <ImageDisplay label="Banner Url" value={userData.banner} />}
                    </SimpleGrid>
                    <Accordion variant="contained" chevronPosition="left">
                        <Accordion.Item value="flags">
                            <Accordion.Control>Flags</Accordion.Control>
                            <Accordion.Panel>
                                <SimpleGrid cols={2} style={{marginBottom: 15}}>
                                    {flagsElement}
                                </SimpleGrid>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                    <Box style={{marginTop:10}}>
                        <Button color="indigo" fullWidth onClick={()=>{setMsgDestiny({type:"dm", id:userData.id});setCurrentPage("Messages")}}>Send Message</Button>
                    </Box>
                </ScrollArea>
            </Box>
        </Paper>
)
}