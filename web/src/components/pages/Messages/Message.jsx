import { useMantineTheme, Accordion, Box, Avatar, Text, Flex } from "@mantine/core"
import { Embed } from "./Embed"
import { Attachment } from "./Attachment"
import { IconFile, IconLayoutSidebar, IconTrash } from "@tabler/icons"
import { SendMessage } from "../../misc/WebSocket"

export const Message = ({ user, avatar, content, attachments, embeds, id, channelId, svId, channelType }) => {
    const theme = useMantineTheme()
    var accordionEls = []
    

    const embedsEl = []
    for(const embed of embeds) {
        embedsEl.push(
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
            />
        )
    }

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
            </Accordion.Item>
        )
    }


    const handleMessageDelete = () => {
        SendMessage("delete_message", {
            svId:svId, 
            chId:channelId, 
            id:id,
            channelType: channelType,
        })
    }


    return (
        <Flex direction="column" p={7} bg="#2c2e33" mb={10} mr={20} style={{ boxSizing:"border-box", borderRadius:10}}>
            <Flex align="center">

                <Avatar src={avatar} ml={5} mr={10} />
                <Box w="100%">
                    <Flex w="100%" align="center">
                        <Text weight={600}> {user} </Text>
                        <IconTrash color={theme.colors.dark[3]} onClick={handleMessageDelete} size={20} ml="auto" mr={10} style={{cursor:"pointer"}} />
                    </Flex>
                    <Text color={theme.colors.gray[6]}> {content} </Text>
                </Box>

            </Flex>

            {(attachments.length >=1 || embeds.length >=1) && 
                <Accordion variant="">
                    {accordionEls}
                </Accordion>
            }

        </Flex>
    )
}