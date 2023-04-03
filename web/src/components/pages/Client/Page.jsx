import { Box } from "@mantine/core";
import { useEffect,  useState } from "react";
import { useStyles } from "../../../styles/Pages.style";
import { AddSocketListener } from "../../misc/WebSocket";
import { ClientSection } from "./ClientSection";
import { UserSection } from "./UserSection";
import { AppSection } from "./AppSection";
import { InviteModal } from "./InviteModal";
import { defaultSettings } from "../../misc/Enums";


export const ClientPage = () => {
    const { classes } = useStyles();
    const [inviteModalOpened, setInviteModalOpened] = useState(false);
    const [settings, setSettings] = useState(defaultSettings)

    
    useEffect(() => {
        AddSocketListener("fill_client_info", (data) => setSettings(data))
    })

    return (
        <>
            <InviteModal opened={inviteModalOpened} setOpened={setInviteModalOpened}/>
            <Box className={classes.parent}>
                <ClientSection settings={settings} setSettings={setSettings} setInviteModalOpened={setInviteModalOpened}/>
                <UserSection settings={settings} />
                <AppSection settings={settings} setSettings={setSettings}/>
            </Box>
        </>
    );
};
