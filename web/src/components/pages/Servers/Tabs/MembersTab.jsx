import { ScrollArea, SimpleGrid, TextInput, Box, Text, Avatar, Indicator, LoadingOverlay } from "@mantine/core"
import { useStyles } from "../../../../styles/Pages.style"
import { IconRobot, IconCrown } from "@tabler/icons"
import { useState, useEffect } from "react"
import { customLoader } from "../../../../styles/Settings.style"
import { SendMessage, AddSocketListener } from "../../../misc/WebSocket"

const Member = ({tag, id, avatarUrl, isBot, isOwner}) => {
    return (
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
    })}>
        <Indicator disabled={!(isBot || isOwner)} label={isBot ? <IconRobot  size={19} /> : <IconCrown  size={20} />} color={isBot ? "indigo" : "yellow"} size={17}>
            <Avatar src={avatarUrl}></Avatar>
        </Indicator>
        <Text sx={(theme)=>({marginLeft:10, color:isBot ? theme.colors.blue[4] : isOwner ? theme.colors.yellow[4] : theme.colors.dark[2]})}>{tag}</Text>
        <Text sx={(theme)=>({marginLeft:"auto", color:theme.colors.dark[3]})}>{id}</Text>
    </Box>)
}

export const MembersTab = ({ server, tab }) => {
    const {classes} = useStyles()
    const [ isLarge, setLarge ] = useState(false)
    const [ dataLoaded, setDataLoaded ] = useState(false)
    const [ membersList, setMembersList] = useState([])

    // Adds the listener that adds all the members data
    useEffect(() => {
        AddSocketListener("members", (data) => {
            setLarge(data.isLarge)
            setMembersList(data.members)
            setDataLoaded(true)
        })
    })

    // Requests info data if the tab is pressed
    useEffect(() => {
        if(tab !== "members") return
        SendMessage("get_members", {svId:server})
    }, [tab])

    // When the server is changed, the category will be cleaned
    useEffect(() => {
        if(!server) return
        setMembersList([])
        setLarge(false)
        setDataLoaded(false)

    }, [server])
    
    const usersDom = membersList.map(member => {return <Member avatarUrl={member.avatarUrl} isOwner={member.isOwner} isBot={member.isBot} tag={member.tag} id={member.id} key={member.id} />})

    return (
        <ScrollArea type="auto" style={{height:"90vh"}} className={classes.scroll}>
            { !dataLoaded ? <LoadingOverlay visible overlayBlur={2} loader={customLoader} /> : <></> }
            <SimpleGrid cols={1} spacing={40} verticalSpacing={5}>
                {usersDom}
            </SimpleGrid>
        </ScrollArea>
    )
}