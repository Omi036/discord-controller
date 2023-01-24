//! NOTE!!!!
// Part of the code is "borrowed" from the mantine ui library:
// https://ui.mantine.dev/component/navbar-simple

import { useState, useEffect } from "react";
import { Navbar, Group, Code, Avatar, Text, Box, UnstyledButton, Tooltip, Modal, Button } from "@mantine/core";
import { IconRobot, IconHash, IconMessage, IconCode, IconServer, IconUser, IconDots, IconLogout } from "@tabler/icons";
import { useStyles } from "../styles/Sidebar.style";
import { WSocket } from "./misc/WebSocket";

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
    const [openedModal, setOpenedModal] = useState(false);
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
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));


    // Will logout the discord bot and refresh the page
    const handleLogout = () => {
        WSocket.send(JSON.stringify({
            header:"logout",
            content:{}
        }))
        window.location.reload()
    }


    return (
        <>
        <Modal
            opened={openedModal}
            onClose={() => setOpenedModal(false)}
            title="Are you sure you want to log out?"
            size="sm"
        >
            <Button fullWidth style={{ backgroundColor:"#ED4245"}} onClick={handleLogout}>Yes, I'm sure</Button>
        </Modal>
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
                    <Tooltip label="Logout" position="top" withArrow >
                      <UnstyledButton
                        style={{marginLeft:"auto"}}
                        onClick={() => setOpenedModal(true)}
                      >
                        <IconLogout color={"#ED4245"} stroke={1.5} />
                      </UnstyledButton>
                    </Tooltip>
                </Box>
            </Navbar.Section>
        </Navbar>
        </>
    );
}
