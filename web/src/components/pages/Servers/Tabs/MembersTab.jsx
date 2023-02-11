import { ScrollArea, SimpleGrid, TextInput, Box, Text, Avatar, Indicator, LoadingOverlay, Badge } from "@mantine/core"
import { useStyles } from "../../../../styles/Pages.style"
import { MemberInfo } from "../Info/MemberInfo"
import { useState, useEffect } from "react"
import { customLoader } from "../../../../styles/Settings.style"
import { SendMessage, AddSocketListener } from "../../../misc/WebSocket"

const Member = ({tag, id, avatarUrl, isBot, isOwner, setMember}) => {
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
    })} onClick={() => setMember(id)}>
        <Avatar src={avatarUrl}></Avatar>
        <Text sx={(theme)=>({marginLeft:10, color:isBot ? theme.colors.blue[4] : isOwner ? theme.colors.yellow[4] : theme.colors.dark[2]})}>{tag}</Text>
        {isBot && <Badge sx={{marginLeft:"auto"}} variant="filled" color="indigo">Bot</Badge>}
        {isOwner && <Badge sx={{marginLeft:"auto"}} variant="filled" color="yellow">Owner</Badge>}
        <Text sx={(theme)=>({marginLeft:isBot||isOwner? 10 : "auto", color:theme.colors.dark[3]})}>{id}</Text>
    </Box>)
}

export const MembersTab = ({ server, tab }) => {
    const {classes} = useStyles()
    const [ isLarge, setLarge ] = useState(false)
    const [ member, setMember ] = useState()
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
    
    // Transforms all the users to React Elements
    const usersDom = membersList.map(member => {return <Member setMember={setMember} avatarUrl={member.avatarUrl} isOwner={member.isOwner} isBot={member.isBot} tag={member.tag} id={member.id} key={member.id} />})

    return (
        <ScrollArea type="auto" style={{height:"90vh"}} className={classes.scroll}>
            { !dataLoaded ? <LoadingOverlay visible overlayBlur={2} loader={customLoader} /> : <></> }
            { member ? <MemberInfo memberId={member} serverId={server} setMember={setMember} /> :
            <SimpleGrid cols={1} spacing={40} verticalSpacing={5}>
                {usersDom}
            </SimpleGrid>
            }
        </ScrollArea>
    )
}