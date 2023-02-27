import { useState, useEffect } from "react";
import { Navbar, Group, Code, Avatar, Text, Box, UnstyledButton, Tooltip, ActionIcon } from "@mantine/core";
import { IconRobot, IconMessage, IconCode, IconServer, IconUser, IconDots, IconLogout } from "@tabler/icons";
import { useStyles } from "../styles/Sidebar.style";
import { AddSocketListener } from "./misc/WebSocket";
import { LogoutModal } from "./misc/LogoutModal";

// Gets the version from the upper main package.json
import { version } from "../../../package.json"

// We define a placeholder for the sidebar categories
const sidebarLinks = [
    {label: "Client", icon: IconRobot},
    {label: "Servers", icon: IconServer },
    {label: "Users", icon: IconUser },
    {label: "Commands", icon: IconCode },
    {label: "Messages", icon: IconMessage },
];


// Sidebar Component
export function Sidebar({page , setPage}) {
    const { classes, cx } = useStyles();
    const [profile, setProfile] = useState({avatar:undefined, username:"Dummy#0000"});
    const [logoutModalOpened, setLogoutModalOpened] = useState(false);

    useEffect(() => {
        // When we receive data from the server with basic info
        AddSocketListener("basic_profile", data => setProfile(data))
    })

    // We create the sidelink for every item previously defined
    // Note: Code borrowed from mantine.dev
    const sideLinks = sidebarLinks.map((item) => (
        <a
            className={cx(classes.link, {[classes.linkActive]: item.label === page})}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setPage(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <>  
            {/* Logout Modal */}
            <LogoutModal opened={logoutModalOpened} setOpened={setLogoutModalOpened} />

            {/* Main Sidebar */}
            <Navbar height={"100vh"} width={{ sm: 230 }} p="md">
                {/* Top section of the sidebar */}
                <Navbar.Section grow>
                    <Group className={classes.header} position="apart">
                        <Text sx={(theme)=>({fontWeight:700, color:theme.colors.discord[0]})}>Discord RC</Text>
                        <Code sx={{ fontWeight: 700 }}>{`v${version}`}</Code>
                    </Group>
                    {sideLinks}
                </Navbar.Section>

                {/* Bottom section of the sidebar */}
                <Navbar.Section className={classes.footer}>
                    <Box sx={{display:"flex",  alignItems:"center"}}>
                        <Avatar src={profile.avatar}/>
                        <Text sx={{marginLeft:10}}>{profile.username}</Text>
                        <ActionIcon style={{marginLeft:"auto", padding:3}} onClick={() => setLogoutModalOpened(true)}>
                            <IconLogout color={"#ED4245"} stroke={1.5} />
                        </ActionIcon>
                    </Box>
                </Navbar.Section>
            </Navbar>
        </>
    );
}
