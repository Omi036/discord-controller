import { ScrollArea, SimpleGrid, TextInput, Box, Text } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { useState } from "react"
import { IconClearAll, IconHash } from "@tabler/icons"

const Channel = ({name, id, type, setChannelSetted}) => {

    var icon;
    switch (type) {
        case "category":
            name = name.toUpperCase();
            icon = <IconClearAll size={18}/>
            break;
        
        case "text":
            icon = <IconHash size={18} />
            break;
    }

    return(
    <Box sx={(theme)=>({
        boxSizing:"border-box",
        padding:10,
        display:"flex",
        flexDirection: "row",
        alignItems:"center",
        marginLeft: type==="category" ? 0 : 20,
        border:`1px solid ${theme.colors.dark[4]}`,
        backgroundColor: theme.colors.dark[6],
        borderRadius: 5,
        cursor:"pointer",
        "&:hover":{
            border:`1px solid ${theme.colors.dark[3]}`,
            backgroundColor: theme.colors.dark[5],
        }
    })} onClick={()=>{setChannelSetted(id)}}>
        {icon}
        <Text sx={(theme)=>({marginLeft:10, color:theme.colors.dark[2]})}>{name}</Text>
        <Text sx={(theme)=>({marginLeft:"auto", color:theme.colors.dark[3]})}>{id}</Text>
    </Box>)
}

export const ChannelsTab = () => {
    const {classes} = useStyles()
    const [channelSetted, setChannelSetted] = useState(false)

    const channels = []
    const channelsList = [
        {name:"TEXTO", id:"1064594706937434122", type:"category"},
        {name:"credenciales", id:"1064594706937434124", type:"text"},
        {name:"invites", id:"1065697538247762000", type:"text"},
        {name:"ids", id:"1066511977763057675", type:"text"}
    ]

    channelsList.forEach(channel => {
        channels.push(<Channel {...channel} setChannelSetted={setChannelSetted} key={channel.id} />)
    })

    return (
        <ScrollArea type="auto" className={classes.scroll}>
            {channelSetted ? 
            <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                <TextInput label="Initializated At" readOnly className={classes.text_input}/>
                <TextInput label="Initializated At" readOnly className={classes.text_input}/>
                <TextInput label="Initializated At" readOnly className={classes.text_input}/>
                <TextInput label="Initializated At" readOnly className={classes.text_input}/>
            </SimpleGrid> : 
            <SimpleGrid cols={1} spacing={40} verticalSpacing={5}>
                {channels}
            </SimpleGrid>
            }
            
        </ScrollArea>
    )
}