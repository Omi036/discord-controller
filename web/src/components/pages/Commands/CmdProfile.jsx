import { Avatar, Box, Text } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { useMantineTheme } from "@mantine/core"

export const CmdProfile = ({name, id, active, setActive}) => {
    const {classes} = useStyles()
    const theme = useMantineTheme()
    return (
        <Box className={active ? classes.sv_profile_active : classes.sv_profile} onClick={setActive}>
            <Text style={{marginLeft:10}}>/{name}</Text>
            <Text style={{marginLeft:"auto", color:theme.colors.gray[7], textOverflow:"ellipsis", overflow: "hidden"}}>{id}</Text>
        </Box>
    )
}
