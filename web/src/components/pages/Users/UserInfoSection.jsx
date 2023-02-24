import { Paper, Box, Text, ScrollArea, Checkbox, TextInput, SimpleGrid, ColorInput, LoadingOverlay } from "@mantine/core"
import { customLoader } from "../../../styles/Settings.style"
import { IconInfoCircle } from "@tabler/icons"
import { ImageDisplay } from "../../misc/ImageDisplay"
import { useStyles } from "../../../styles/Pages.style"
import { useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"
import { AddSocketListener, SendMessage } from "../../misc/WebSocket"

export const UserInfoSection = ({userActive, setUserActive}) => {
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


    useEffect(() => {
        AddSocketListener("user_info", (data) => {
            setUserData(data)
        })
    })
    
    useEffect(() => {
        if(!userActive) return
        SendMessage("get_user_info", {id:userActive})
    },[userActive])

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

                    <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                        <TextInput label="Tag" readOnly className={classes.text_input} value={userData.tag}/>
                        <TextInput label="Id" readOnly className={classes.text_input} value={userData.id}/>
                        <TextInput label="Created At" readOnly className={classes.text_input} value={new Date(userData.createdAt)}/>
                        { userData.accentColor !== "Default" ?  <ColorInput readOnly label="Accent Color" value={userData.accentColor}/> : <TextInput readOnly label="Accent Color" value="Default"/>}
                        <ImageDisplay label="Avatar Url" value={userData.avatarUrl} />
                        {userData.banner && <ImageDisplay label="Banner Url" value={userData.banner} />}
                    </SimpleGrid>
                </ScrollArea>
            </Box>
        </Paper>
)
}