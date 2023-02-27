import { Box, Text, ActionIcon, Image, useMantineTheme } from "@mantine/core"
import { IconDownload, IconFile } from "@tabler/icons"

export const Attachment = ({type,name,url}) => {
    const theme = useMantineTheme()
    if(!type || type.startsWith("application/") || type.startsWith("audio/") || type.startsWith("video/")){
        return (
            <Box style={{display:"flex", flexDirection:"row", alignItems:"center", boxSizing:"border-box", padding:7, backgroundColor:theme.colors.dark[4], borderRadius:10, marginBottom:10}}>
                <IconFile style={{marginRight:5}}/>
                <Text style={{color:theme.colors.blue[6], cursor: "pointer"}}onClick={() => window.open(url, "_blank")}>{name}</Text>
                <ActionIcon onClick={() => window.open(url, "_blank")} style={{marginLeft:"auto"}}>
                    <IconDownload />
                </ActionIcon>
            </Box>
        )
    } else if(type.startsWith("image/")){
        return <Image radius={10} style={{width:"50%", marginBottom:5}} src={url} />
    }
}