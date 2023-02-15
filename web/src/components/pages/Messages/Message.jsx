import { useMantineTheme, Accordion, Box, Avatar, Text } from "@mantine/core"
import { Embed } from "./Embed"
import { Attachment } from "./Attachment"

export const Message = ({ user, avatar, content, attachments, embeds, id }) => {
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
            <Accordion.Control>Embeds</Accordion.Control>
            <Accordion.Panel>{embedsEl}</Accordion.Panel>
        </Accordion.Item>)
    }

    if(attachments.length >= 1){
        accordionEls.push(
        <Accordion.Item value="attachments" key="attach">
            <Accordion.Control>Attachments</Accordion.Control>
            <Accordion.Panel>{attachments.map(attach => <Attachment key={`attachment_${id}_${attach.url}`} type={attach.type} name={attach.name} url={attach.url} />)}</Accordion.Panel>
        </Accordion.Item>)
    }


    return (
        <Box style={{display:"flex", flexDirection:"column", boxSizing:"border-box", padding:7, backgroundColor:"#2c2e33", marginBottom:10, borderRadius:10, marginRight:20}}>
            <Box style={{display:"flex", alignItems:"center"}}>
                <Avatar src={avatar} style={{marginLeft:5, marginRight:10}} />
                <Box>
                    <Text weight={600}>{user}</Text>
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