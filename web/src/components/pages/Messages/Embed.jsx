import { Box, Text, Image } from "@mantine/core"

export const Embed = ({author, color, description, footer, image, thumbnail, timestamp, title, fields}) => {
    return (
        <Box style={{backgroundColor:color || "#242526", borderRadius:10, overflow:"hidden", boxSizing:"border-box", paddingLeft:5, maxWidth:"55%"}}>

            {/* True Embed */}
            <Box style={{backgroundColor:"#2f3136", boxSizing:"border-box", padding:10, width:"100%", display:"flex", flexDirection:"row"}}>

                <Box style={{boxSizing:"border-box", maxWidth:"70%"}}>
                    {/* Upper Section, title, description and thumbnail */}
                    <Text weight="bold" size={14} style={{marginBottom:7}}>{author}</Text>
                    <Text weight="bold" size={18} style={{marginBottom:7}}>{title}</Text>
                    <Text style={{marginBottom:30}}>{description}</Text>

                    {/* Fields */}
                    {fields.map(field => (
                        <Box key={`${field.name}${field.value}`} style={{marginBottom:14}}>
                            <Text weight="bold">{field.name.replaceAll("*","").replaceAll("_","")}</Text>
                            <Text>{field.value.replaceAll("*","").replaceAll("_","")}</Text>
                        </Box>
                    ))}

                    {/* Image */}
                    {image && <Image radius={10} style={{marginTop:10, marginBottom:10}} src={image} />}

                    {/* Footer */}
                    <Box style={{display: 'flex', marginTop:0}}>
                        {footer && <Text size={11} style={{marginTop:0,}} weight="bold">{footer}</Text>}
                        {footer && timestamp && (<Text size={11} style={{marginLeft:5, marginRight:5}} weight="bold">•</Text>)}
                        {timestamp && <Text size={11} weight="bold">{new Date(timestamp).toDateString()}</Text>}
                    </Box>
                </Box>

                {/* Thumbnail Image */}
                <Box style={{width:"fit-content", minWidth:"30%"}}>
                    {thumbnail && <Image radius={10} style={{width:"100%"}} src={thumbnail} />}
                </Box>

            </Box>

        </Box>
    )
}