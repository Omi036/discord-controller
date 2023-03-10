import { Box, Modal, Textarea , TextInput, ColorInput, Divider, Text, Button, Image, Flex} from "@mantine/core"
import { useState } from "react"

export const AddEmbedModal = ({opened, setOpened, setEmbed}) => {
    const [color, setColor] = useState("#ffffff")
    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [description, setDescription] = useState("")
    const [author, setAuthor] = useState("")
    const [image, setImage] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [footer, setFooter] = useState("")


    const handleSubmitClick = () =>{
        if(!title) {setTitleError("A title is required"); return}
        if(!description) {setDescriptionError("A description is required"); return}

        setEmbed({
            title: title,
            json: {
                color: parseInt(color.replace(/^#/,""),16),
                title: title,
                url:"",
                author: {
                    name: author,
                    icon_url: '',
                    url: '',
                },
                description: description,
                thumbnail: { url: thumbnail },
                fields: [],
                image: {url: image},
                timestamp: "",
                footer: {
                    text: footer,
                    icon_url: '',
                },
            }
        })
        setOpened(false)
    }


    return (
        <Modal opened={opened} title="Create Embed" size={1100} onClose={()=>setOpened(false)}>
            <Box h="37rem" style={{display: 'flex', flexDirection: 'row'}}>

                <Box w="30%">
                    <TextInput label="Title" required value={title} error={titleError} onChange={(event) => setTitle(event.currentTarget.value)}/>
                    <Textarea  label="Description" required value={description} error={descriptionError} onChange={(event) => setDescription(event.currentTarget.value)}/>
                    <ColorInput label="Embed Color" maxLength={7} value={color} onChange={setColor}/>
                    <TextInput label="Author" value={author} onChange={(event) => setAuthor(event.currentTarget.value)}/>
                    <TextInput label="Footer" value={footer} onChange={(event) => setFooter(event.currentTarget.value)}/>
                    <TextInput label="Thumbnail URL" value={thumbnail} onChange={(event) => setThumbnail(event.currentTarget.value)}/>
                    <TextInput label="Image URL" value={image} onChange={(event) => setImage(event.currentTarget.value)}/>
                    <Button color="indigo" fullWidth mt={10} onClick={handleSubmitClick}>Add Embed</Button>
                </Box>
                <Divider orientation="vertical" variant="dashed" mx={10}/>
                <Box w="69%" h="100%">
                    <Flex direction="column" justify="center" align="center" h="100%">

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
                        
                    </Flex>
                </Box>
            </Box>
        </Modal>
    )
}