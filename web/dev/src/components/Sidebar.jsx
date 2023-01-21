//! NOTE!!!!
// Part of the code is "borrowed" from the mantine ui library:
// https://ui.mantine.dev/component/navbar-simple

import { useState, useEffect } from "react";
import { Navbar, Group, Code, Avatar, Text, Box } from "@mantine/core";
import { IconRobot, IconHash, IconMessage, IconCode, IconServer, IconUser, IconDots} from "@tabler/icons";
import { useStyles } from "./Sidebar.style";
import { WSocket } from "./WebSocket";

// We define a placeholder for the sidebar categories
const sidebarLinks = [
    {label: "Client", icon: IconRobot},
    {label: "Servers", icon: IconServer },
    {label: "Channels", icon: IconHash },
    {label: "Messages", icon: IconMessage },
    {label: "Users", icon: IconUser },
    {label: "Commands", icon: IconCode },
    {label: "Misc", icon: IconDots },
];


// Main Component
export function Sidebar({setPage}) {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState("Client");
    const [avatar, setAvatar] = useState(undefined);
    const [username, setUsername] = useState("Dummy#0000");

    useEffect(() => {
        // When we receive data from the server with basic info
        WSocket.addEventListener("message", (message) => {
            message = JSON.parse(message.data)

            if(message.header !== "basic_profile") return
            setAvatar(message.content.avatar)
            setUsername(message.content.username)
        })
    })

    // We create the sidelink for every item previously defined
    const sideLinks = sidebarLinks.map((item) => (
        <a
            className={cx(classes.link, {[classes.linkActive]: item.label === active})}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
                setPage(item.label);
                // TODO: Change Page of the dashboard
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <Navbar height={"100vh"} width={{ sm: 300 }} p="md">
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <Text sx={(theme)=>({fontWeight:700, color:theme.colors.discord[0]})}>Discord RC</Text>
                    <Code sx={{ fontWeight: 700 }}>v0.1.0</Code>
                </Group>
                {sideLinks}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <Box sx={{display:"flex",  alignItems:"center"}}>
                    <Avatar src={avatar}/>
                    <Text sx={{marginLeft:10}}>{username}</Text>
                </Box>
            </Navbar.Section>
        </Navbar>
    );
}
