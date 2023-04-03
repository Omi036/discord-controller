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
            <Flex h="37rem" direction="row" >

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

                        <Flex w="80%" direction="row" mih="10%" style={{borderRadius:5, overflow:"hidden"}}>
                            <Box bg={color} h="100%" w="1%"></Box>

                            <Flex bg="#2f3136" w="99%" h="100%" p={10}>
                                <Box maw={thumbnail ? "70%" : "100%"}>
                                    <Text weight="bold" size={14} mb={7}>{author}</Text>
                                    <Text weight="bold" size={18} mb={7}>{title}</Text>
                                    <Text>{description}</Text>

                                    {image && <Image radius={10} my={10} src={image} />}

                                    {footer && <Text size={11} mt={image ? 0 : 5} weight="bold">{footer}</Text>}
                                </Box>

                                <Box w="30%" ml={5}>
                                    {thumbnail && <Image radius={10} w="100%" src={thumbnail} />}
                                </Box>
                            </Flex>
                        </Flex>
                        
                    </Flex>
                </Box>
            </Flex>
        </Modal>
    )
}