import { useState, useEffect } from "react";
import { Navbar, Group, Code, Avatar, Text, Box,  ActionIcon, useMantineTheme } from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { useStyles } from "../styles/Sidebar.style";
import { AddSocketListener } from "./misc/WebSocket";
import { LogoutModal } from "./misc/LogoutModal";
import { version } from "../../../package.json"
import { sidebarLinks } from "./misc/Enums";
import { defaultProfile } from "./misc/Enums";


// Sidebar Component
export function Sidebar({currentPage , setCurrentPage}) {
    const theme = useMantineTheme()
    const { classes, cx } = useStyles();
    const [botProfile, setBotProfile] = useState(defaultProfile);
    const [logoutModalOpened, setLogoutModalOpened] = useState(false);


    useEffect(() => {
        AddSocketListener("basic_profile", data => setBotProfile(data))
    })

    

    const sideLinks = []
    for(const linkItem of sidebarLinks){
        sideLinks.push(
            <a
                key={linkItem.label}
                className={cx(classes.link, {[classes.linkActive]: linkItem.label === currentPage})}
                onClick={(event) => {
                    event.preventDefault();
                    setCurrentPage(linkItem.label);
                }}
            >
                <linkItem.icon className={classes.linkIcon} stroke={1.5}/>
                <span>{linkItem.label}</span>
            </a>
        )
    }


    return (
        <>  
            <LogoutModal opened={logoutModalOpened} setOpened={setLogoutModalOpened} />

            <Navbar height="100vh" width={{base: 280 }} p="md">
                <Navbar.Section grow>
                    <Group className={classes.header} position="apart" fw={700}>

                        <Text sx={ (theme) => ({color: theme.colors.discord[0]}) }> Discord RC </Text>
                        <Code> {version} </Code>

                    </Group>
                    {sideLinks}
                </Navbar.Section>

                <Navbar.Section className={classes.footer}>
                    <Box sx={{display:"flex", alignItems:"center"}}>

                        <Avatar src={botProfile.avatar} />
                        <Text ml={10}> {botProfile.username} </Text>

                        <ActionIcon ml="auto" p={3} onClick={() => setLogoutModalOpened(true)}>
                            <IconLogout color={"#ED4245"} stroke={1.5} />
                        </ActionIcon>

                    </Box>
                </Navbar.Section>
            </Navbar>
        </>
    );
}
