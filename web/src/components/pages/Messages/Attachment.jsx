import { Text, ActionIcon, Image, useMantineTheme, Flex } from "@mantine/core"
import { IconDownload, IconFile } from "@tabler/icons"


export const Attachment = ({type,name,url}) => {
    const theme = useMantineTheme()

    if(!type || type.startsWith("application/") || type.startsWith("audio/") || type.startsWith("video/")){
        return (
            <Flex direction="row" align="center" p={7} bg={theme.colors.dark[4]} mb={10} style={{boxSizing:"border-box", borderRadius:10}}>
                <IconFile mr={5}/>
                <Text color={theme.colors.blue[6]} onClick={() => window.open(url, "_blank")} style={{cursor: "pointer"}}> {name} </Text>

                <ActionIcon ml="auto" onClick={() => window.open(url, "_blank")}>
                    <IconDownload />
                </ActionIcon>
            </Flex>
        )

    } else if(type.startsWith("image/")){
        return <Image radius={10} style={{width:"50%", marginBottom:5}} src={url} />
    }
}