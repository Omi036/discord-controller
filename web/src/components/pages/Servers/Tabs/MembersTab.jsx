import { ScrollArea, SimpleGrid, Box, Text, Avatar, LoadingOverlay, Badge, useMantineTheme, Flex } from "@mantine/core"
import { useStyles } from "../../../../styles/Pages.style"
import { MemberInfo } from "../Info/MemberInfo"
import { useState, useEffect } from "react"
import { customLoader } from "../../../../styles/LogIn.style"
import { SendMessage, AddSocketListener } from "../../../misc/WebSocket"


// One of the many User elements showed in the list
const Member = ({tag, id, avatarUrl, isBot, isOwner, setMember}) => {
    const theme = useMantineTheme()

    const color = isBot 
                    ? theme.colors.blue[4] 
                    : isOwner 
                        ? theme.colors.yellow[4] 
                        : theme.colors.dark[2]


    return (
        <Flex p={10} direction="row" align="center" ml={0} sx={{
        boxSizing:"border-box", 
        border:`1px solid ${theme.colors.dark[4]}`,
        borderRadius: 5,
        cursor:"pointer",
        "&:hover":{
            border:`1px solid ${theme.colors.dark[3]}`,
            backgroundColor: theme.colors.dark[5]}}
        } onClick={() => setMember(id)}>

            <Avatar src={avatarUrl}></Avatar>
            <Text ml={10} color={color}>{tag}</Text>
            {isBot   && <Badge ml="auto" variant="filled" color="indigo"> Bot </Badge>}
            {isOwner && <Badge ml="auto" variant="filled" color="yellow"> Owner </Badge>}
            <Text ml={isBot||isOwner? 10 : "auto"}  color={theme.colors.dark[3]}>{id}</Text>
        </Flex> 
    )
}


export const MembersTab = ({ server, tab, setTab, setThirdRole, setCurrentPage, setMsgDestiny }) => {
    const { classes } = useStyles()
    const [ actualMember, setActualMember ] = useState()
    const [ dataLoaded, setDataLoaded ] = useState(false)
    const [ membersList, setMembersList] = useState([])


    useEffect(() => {
        AddSocketListener("members", (data) => {
            setMembersList(data.members)
            setDataLoaded(true)
        })
    })

    
    useEffect(() => {
        if(tab !== "members") {
            setActualMember()
            return
        }
        SendMessage("get_members", {svId:server})
    }, [tab])


    useEffect(() => {
        if(!server) return
        setMembersList([])
        setDataLoaded(false)
    }, [server])
    

    const usersDom = membersList.map(member => (
        <Member setMember={setActualMember} avatarUrl={member.avatarUrl} isOwner={member.isOwner} isBot={member.isBot} tag={member.tag} id={member.id} key={member.id} />
    ))

    
    return (
        <ScrollArea type="auto" h="90vh" className={classes.scroll}>
            { !dataLoaded && <LoadingOverlay visible overlayBlur={2} loader={customLoader} />}
            { actualMember 
                ? <MemberInfo memberId={actualMember} serverId={server} setMember={setActualMember} setTab={setTab} setThirdRole={setThirdRole} setCurrentPage={setCurrentPage} setMsgDestiny={setMsgDestiny}/> 
                : <SimpleGrid cols={1} spacing={40} verticalSpacing={5}> {usersDom} </SimpleGrid>
            }
        </ScrollArea>
    )
}