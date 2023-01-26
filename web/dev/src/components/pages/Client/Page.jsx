import { Box } from "@mantine/core";
import { useEffect,  useState } from "react";
import { useStyles } from "../../../styles/Pages.style";
import { WSocket } from "../../misc/WebSocket";
import { ClientSection } from "./ClientSection";
import { UserSection } from "./UserSection";
import { AppSection } from "./AppSection";
import { InviteModal } from "./InviteModal";

export const ClientPage = () => {
    const { classes } = useStyles();
    const [modalOpened, setModalOpened] = useState(false);
    const [settings, setSettings] = useState({
        client: {
            serverCount:0,
            channelCount:0,
            token:"",
            initializedAt:""
        },
        user: {
            verified: false,
            status:"",
            tag:"",
            id:"",
            avatarURL:"",
            createdAt:""
        },
        app: {
            botPublic: false,
            botCodeGrant: false,
            name:"",
            description:"",
            owner:"",
            id:"",
            tags:"",
            iconURL:"",
            commandsCounter:0,
            createdAt:""
        }
    })


    useEffect(() => {
        WSocket.addEventListener("message", (message) => {
            message = JSON.parse(message.data);

            switch (message.header) {
                case "fill_client_info":
                    const new_settings = { ...settings}

                    const clientSettings = message.content.client;
                    const userSettings = message.content.user;
                    const appSettings = message.content.app;

                    new_settings.client = {
                        serverCount: clientSettings.guilds,
                        channelCount: clientSettings.channels,
                        token: clientSettings.token,
                        initializedAt: clientSettings.initializedAt
                    };
        
                    new_settings.user = {
                        verified: userSettings.verified,
                        status: userSettings.status,
                        tag: userSettings.tag,
                        id: userSettings.id,
                        avatarURL: userSettings.avatarURL,
                        createdAt: userSettings.createdAt
                    };
        
                    new_settings.app = {
                        botPublic: appSettings.public,
                        botCodeGrant: appSettings.codeGrant,
                        name: appSettings.name,
                        description: appSettings.description,
                        owner: appSettings.owner,
                        id: appSettings.id,
                        tags: appSettings.tags,
                        iconURL: appSettings.iconURL,
                        commandsCounter: appSettings.commands,
                        createdAt: appSettings.createdAt
                    };

                    setSettings(new_settings)
                    break;
            }
        });
    });

    return (
        <>
            <InviteModal opened={modalOpened} setOpened={setModalOpened}/>
            <Box className={classes.parent}>
                <ClientSection settings={settings} setSettings={setSettings} setModalOpened={setModalOpened}/>
                <UserSection settings={settings} setSettings={setSettings}/>
                <AppSection settings={settings} setSettings={setSettings}/>
            </Box>
        </>
    );
};
