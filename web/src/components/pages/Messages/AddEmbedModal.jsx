import { Box, Modal, Textarea , TextInput, ColorInput, Divider, Text, Button, Image} from "@mantine/core"
import { useState, useRef } from "react"

export const AddEmbedModal = ({opened, setOpened}) => {
    const [color, setColor] = useState("#fff")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [author, setAuthor] = useState("")
    const [image, setImage] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [footer, setFooter] = useState("")

    return (
        <Modal opened={opened} onClose={()=>setOpened(false)} size={1100}  title="Create Embed">
            <Box style={{display: 'flex', flexDirection: 'row', height:"37rem"}}>
                <Box style={{width:"30%"}}>
                    <TextInput label="Title" required value={title} onChange={(event) => setTitle(event.currentTarget.value)}/>
                    <Textarea label="Description" required value={description} onChange={(event) => setDescription(event.currentTarget.value)}/>
                    <ColorInput label="Embed Color" maxLength={7} value={color} onChange={setColor}/>
                    <TextInput label="Author" value={author} onChange={(event) => setAuthor(event.currentTarget.value)}/>
                    <TextInput label="Footer" value={footer} onChange={(event) => setFooter(event.currentTarget.value)}/>
                    <TextInput label="Thumbnail URL" value={thumbnail} onChange={(event) => setThumbnail(event.currentTarget.value)}/>
                    <TextInput label="Image URL" value={image} onChange={(event) => setImage(event.currentTarget.value)}/>
                    <Button color="indigo" fullWidth style={{marginTop:10}}>Add Embed</Button>
                </Box>
                <Divider orientation="vertical" variant="dashed" style={{marginLeft: 10, marginRight:10}}/>
                <Box style={{width:"69%", height:"100%"}}>
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems: "center", height:"100%"}}>

                        {/* Embed Preview */}
                        <Box style={{width:"80%", borderRadius:5,overflow: "hidden",minHeight:"10%", display:"flex", flexDirection:"row"}}>
                            {/* Color */}
                            <Box style={{backgroundColor:color,height:"100%", width:"1%"}}></Box>
                            {/* Content */}
                            <Box style={{backgroundColor:"#2f3136", width:"99%", height:"100%", padding:10, display:"flex", flexDirection:"row"}}>
                                <Box style={{maxWidth:thumbnail ? "70%" : "100%"}}>
                                    <Text weight="bold" size={14} style={{marginBottom:7}}>{author}</Text>
                                    <Text weight="bold" size={18} style={{marginBottom:7}}>{title}</Text>
                                    <Text>{description}</Text>

                                    {image && <Image radius={10} style={{marginTop:10, marginBottom:10}} src={image} />}

                                    {footer && <Text size={11} style={{marginTop:image ? 0 : 5}} weight="bold">{footer}</Text>}
                                </Box>
                                {/* Thumbnail */}
                                <Box style={{width:"30%", marginLeft:5}}>
                                    {thumbnail && <Image radius={10} style={{width:"100%"}} src={thumbnail} />}
                                </Box>
                            </Box>
                        </Box>
                        
                    </Box>


                </Box>
            </Box>
        </Modal>
    )
}