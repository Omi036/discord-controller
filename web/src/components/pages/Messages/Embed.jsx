import { Box, Text, Image } from "@mantine/core"

export const Embed = ({author, color, description, footer, image, thumbnail, timestamp, title, fields}) => {


    const fieldElement = []
    for(const field of fields) {
        fieldElement.push(
            <Box key={`${field.name}${field.value}`} mb={14}>
                <Text weight="bold"> {field.name.replaceAll("*","").replaceAll("_","")} </Text>
                <Text> {field.value.replaceAll("*","").replaceAll("_","")} </Text>
            </Box>
        )
    }
    
    return (
        <Box pl={5} maw="55%" bg={color || "#242526"} style={{borderRadius:10, overflow:"hidden", boxSizing:"border-box"}}>


            <Box bg="#2f3136" p={10} w="100%" style={{boxSizing:"border-box",  display:"flex", flexDirection:"row"}}>

                <Box maw="70%" style={{boxSizing:"border-box"}}>
                    
                    <Text weight="bold" size={14} mb={7}> {author} </Text>
                    <Text weight="bold" size={18} mb={7}> {title} </Text>
                    <Text mb={30}> {description} </Text>

                    {fieldElement}
                    {image && <Image radius={10} my={10} src={image} />}

                    <Box mt={0} style={{display: 'flex'}}>
                        {footer && <Text size={11} mt={0} weight="bold">{footer}</Text>}
                        {footer && timestamp && (<Text size={11} mx={5} weight="bold">•</Text>)}
                        {timestamp && <Text size={11} weight="bold">{new Date(timestamp).toDateString()}</Text>}
                    </Box>
                </Box>

                <Box w="fit-content" miw="30%" >
                    {thumbnail && <Image radius={10} w="100%" src={thumbnail} />}
                </Box>

            </Box>

        </Box>
    )
}