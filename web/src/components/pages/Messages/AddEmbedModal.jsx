import { Box, Modal, Textarea , TextInput, ColorInput, Divider} from "@mantine/core"

export const AddEmbedModal = ({opened, setOpened}) => {
    return (
        <Modal opened={opened} onClose={()=>setOpened(false)} size={900} title="Create Embed">
            <Box style={{display: 'flex', flexDirection: 'row'}}>
                <Box style={{width:"30%"}}>
                    <TextInput label="Title" required />
                    <Textarea label="Description" required />
                    <ColorInput label="Embed Color"/>
                    <TextInput label="Author" />
                    <TextInput label="Footer" />
                    <TextInput label="Thumbnail URL" />
                    <TextInput label="Image URL" />
                </Box>
                <Divider orientation="vertical" variant="dashed" style={{marginLeft: 10, marginRight:10}}/>
                <Box>

                </Box>
            </Box>
        </Modal>
    )
}