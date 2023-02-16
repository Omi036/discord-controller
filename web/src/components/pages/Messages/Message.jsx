import { useMantineTheme, Accordion, Box, Avatar, Text } from "@mantine/core"
import { Embed } from "./Embed"
import { Attachment } from "./Attachment"
import { IconFile, IconLayoutSidebar, IconTrash } from "@tabler/icons"
import { SendMessage } from "../../misc/WebSocket"

export const Message = ({ user, avatar, content, attachments, embeds, id, channelId, svId }) => {
    const theme = useMantineTheme()
    var accordionEls = []
    const embedsEl = embeds.map(embed => 
    <Embed 
        key={`embed_${id}_${embed.description}`} 
        author={embed.author} 
        color={embed.color} 
        description={embed.description} 
        footer={embed.footer} 
        image={embed.image}
        thumbnail={embed.thumbnail} 
        timestamp={embed.timestamp} 
        title={embed.title} 
        fields={embed.fields}
    />)

    if(embeds.length >= 1){
        accordionEls.push(
        <Accordion.Item value="embeds" key="embed">
            <Accordion.Control icon={<IconLayoutSidebar />}>Embeds</Accordion.Control>
            <Accordion.Panel>{embedsEl}</Accordion.Panel>
        </Accordion.Item>)
    }

    if(attachments.length >= 1){
        accordionEls.push(
        <Accordion.Item value="attachments" key="attach">
            <Accordion.Control icon={<IconFile />}>Attachments</Accordion.Control>
            <Accordion.Panel>{attachments.map(attach => <Attachment key={`attachment_${id}_${attach.url}`} type={attach.type} name={attach.name} url={attach.url} />)}</Accordion.Panel>
        </Accordion.Item>)
    }


    const handleDelete = () => {
        SendMessage("delete_message", {svId:svId, chId:channelId, id:id})
    }


    return (
        <Box style={{display:"flex", flexDirection:"column", boxSizing:"border-box", padding:7, backgroundColor:"#2c2e33", marginBottom:10, borderRadius:10, marginRight:20}}>
            <Box style={{display:"flex", alignItems:"center"}}>
                <Avatar src={avatar} style={{marginLeft:5, marginRight:10}} />
                <Box style={{width:"100%"}}>
                    <Box style={{display:"flex", alignItems:"center"}}>
                        <Text weight={600}>{user}</Text>
                        <IconTrash color={theme.colors.dark[3]} onClick={handleDelete} size={20} style={{marginLeft:"auto", marginRight:10, cursor:"pointer"}} />
                    </Box>
                    <Text style={{color:theme.colors.gray[6]}}>{content}</Text>
                </Box>
            </Box>
            {(attachments.length >=1 || embeds.length >=1) && 
            <Accordion variant="">
                {accordionEls}
            </Accordion>
            }
        </Box>
    )
}