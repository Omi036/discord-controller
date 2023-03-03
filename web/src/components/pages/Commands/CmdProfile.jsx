import { Box, Text } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { useMantineTheme } from "@mantine/core"

export const CmdProfile = ({name, id, active, setActive}) => {
    const {classes} = useStyles()
    const theme = useMantineTheme()
    
    return (
        <Box className={active ? classes.sv_profile_active : classes.sv_profile} onClick={setActive}>
            <Text ml={10}> {name} </Text>
            <Text ml="auto" color={theme.colors.gray[7]} style={{textOverflow:"ellipsis", overflow: "hidden"}}> {id} </Text>
        </Box>
    )
}
