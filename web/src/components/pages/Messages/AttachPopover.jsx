import { Box, Text, ActionIcon, Popover, Button, FileButton, Indicator, Flex } from "@mantine/core"
import { IconPlus, IconPaperclip, IconFile, IconLayoutSidebar } from "@tabler/icons"
import { defaultEmbed } from "../../misc/Enums"


export const AttachPopover = ({ files, setFiles, embed, setEmbedModalOpened }) => {

    const removeFile = (index) => {
        var updatedFiles = [...files];
        updatedFiles.splice(index,1);
        setFiles(updatedFiles)
    }


    const filesElements = []
    for(const file of files) {
        filesElements.push(
            <Flex key={file.name} 
                w="90%" 
                direction="column" 
                align="center" 
                m={5} p={7} 
                bg="#2c2e33" 
                onClick={() => removeFile(files.indexOf(file))}
                sx={{
                    borderRadius:7, 
                    boxSizing:"border-box", 
                    cursor:"pointer", 
                    "&:hover":{
                        backgroundColor:"#a61e4d"
                    }
                }} 
            >
                <IconFile color="#4dabf7"/>
                <Text w="80%" ta="center" style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}> {file.name} </Text>
            </Flex>
        )
    }
    return (
        <Popover width={500} position="top" withArrow shadow="md">

            <Popover.Target>
                <ActionIcon mr={10}>
                    <Indicator color="indigo" size={16} showZero label={`${files.length + (embed.title ? 1 :0)}`}>
                        <IconPaperclip />
                    </Indicator>
                </ActionIcon>
            </Popover.Target>
            
            <Popover.Dropdown >
                <Box display="grid" w="100%" style={{gridTemplateColumns: "repeat(3, 33%)"}}>

                {filesElements}

                {embed.title && (
                    <Flex 
                        w="90%" 
                        bg="#2c2e33" 
                        m={5} 
                        p={7} 
                        direction="column" 
                        align="center"
                        onClick={()=>setEmbed(defaultEmbed)}
                        sx={{
                            borderRadius:7, 
                            boxSizing:"border-box",
                            cursor:"pointer", 
                            "&:hover":{
                                backgroundColor:"#a61e4d"
                            }
                        }} 
                    >
                        <IconLayoutSidebar color="#ffa94d"/>
                        <Text w="80%" ta="center" style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}> {embed.title} </Text>
                    </Flex>
                )}
                </Box>

                <Flex mt={8} direction="row" justify="space-between">

                    <Button color="indigo" w="48%" leftIcon={<IconPlus />} onClick={()=>setEmbedModalOpened(true)}> Set Embed </Button>
                    
                    <FileButton onChange={setFiles} multiple>
                        {(props) => <Button  {...props} color="indigo" w="48%" leftIcon={<IconPlus />}> Set Files </Button>}
                    </FileButton>

                </Flex>
            </Popover.Dropdown>
        </Popover>
    )
}