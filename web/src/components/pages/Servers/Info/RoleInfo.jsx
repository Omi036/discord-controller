import { Box, ScrollArea, ActionIcon, Text } from "@mantine/core"
import { IconArrowBack } from "@tabler/icons"

export const RoleInfo = ({ roleId, setRole }) => {
    return(
        <>
            <Box sx={(theme) => ({borderBottom: `2px solid ${theme.colors.dark[4]}`, display:"flex", marginBottom:5})}>
                <ActionIcon onClick={()=>{setRole(false)}}>
                    <IconArrowBack />
                </ActionIcon>
                <Text style={{marginLeft:10}}>{"Nose"}</Text>
                <Text sx={(theme) => ({marginLeft:"auto", marginBottom:10, color:theme.colors.dark[3]})}>{roleId}</Text>
            </Box>
        </>
    )
}