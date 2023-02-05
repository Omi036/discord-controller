import { Box } from "@mantine/core";
import { useEffect,  useState } from "react";
import { useStyles } from "../../../styles/Pages.style";
import { AddSocketListener } from "../../misc/WebSocket";
import { ClientSection } from "./ClientSection";
import { UserSection } from "./UserSection";
import { AppSection } from "./AppSection";
import { InviteModal } from "./InviteModal";

// The page of the Bot Client
export const ClientPage = () => {
    const { classes } = useStyles();
    const [inviteModalOpened, setInviteModalOpened] = useState(false);
    const [settings, setSettings] = useState({
        client: {
            guilds:0,
            channels:0,
            token:"",
            initializedAt:""
        },
        user: {
            verified: false,
            status:"",
            tag:"",
            id:"",
            avatarURL:"",
            createdAt:"",
        },
        app: {
            public: false,
            codeGrant: false,
            name:"",
            description:"",
            owner:"",
            id:"",
            tags:"",
            iconURL:"",
            commands:0,
            createdAt:""
        }
    })

    // We add the listener that will add the bot data
    useEffect(() => {
        AddSocketListener("fill_client_info", (data) => {
            setSettings(data)
        })
    })

    return (
        <>
            <InviteModal opened={inviteModalOpened} setOpened={setInviteModalOpened}/>
            <Box className={classes.parent}>
                <ClientSection settings={settings} setSettings={setSettings} setInviteModalOpened={setInviteModalOpened}/>
                <UserSection settings={settings} setSettings={setSettings}/>
                <AppSection settings={settings} setSettings={setSettings}/>
            </Box>
        </>
    );
};
