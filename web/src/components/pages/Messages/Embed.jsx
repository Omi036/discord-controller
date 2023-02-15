import { Box, Text, Image } from "@mantine/core"

export const Embed = ({author, color, description, footer, image, thumbnail, timestamp, title, fields}) => {
    return (
        <Box style={{backgroundColor:color || "#242526", width:"90%", borderRadius:10, overflow:"hidden", boxSizing:"border-box", paddingLeft:5, maxWidth:"60%"}}>

            {/* True Embed */}
            <Box style={{backgroundColor:"#2f3136", boxSizing:"border-box", paddingLeft:10, paddingRight:10, paddingBottom:10, paddingTop:10}}>

                {/* Upper Section, title, description and thumbnail */}
                <Box style={{display:"flex"}}>
                    <Box>
                        <Text weight="bold" size={14} style={{marginBottom:7}}>{author}</Text>
                        <Text weight="bold" size={18} style={{marginBottom:7}}>{title}</Text>
                        <Text style={{marginBottom:7}}>{description}</Text>
                    </Box>
                    {thumbnail && <Image radius={10} style={{marginTop:10, marginLeft:10, marginBottom:10}} src={thumbnail} />}
                </Box>

                {/* Fields */}
                {fields.map(field => (
                <Box key={`${field.name}${field.value}`} style={{marginBottom:14}}>
                    <Text weight="bold">{field.name}</Text>
                    <Text>{field.value}</Text>
                </Box>
                ))}

                {/* Image */}
                {image && <Image radius={10} style={{marginTop:10, marginBottom:10}} src={image} />}

                {/* Footer */}
                <Box style={{display: 'flex'}}>
                    <Text size={11} weight="bold">{footer}</Text>
                    {footer && timestamp && (<Text size={11} style={{marginLeft:5, marginRight:5}}weight="bold">•</Text>)}
                    <Text size={11} weight="bold">{new Date(timestamp).toDateString()}</Text>
                </Box>

            </Box>

        </Box>
    )
}