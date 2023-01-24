import { Box } from "@mantine/core";
import { useRef, useEffect,  useState } from "react";
import { useStyles } from "../../../styles/Pages.style";
import { WSocket } from "../../misc/WebSocket";
import { ClientSection } from "./ClientSection";
import { UserSection } from "./UserSection";
import { AppSection } from "./AppSection";
import { InviteModal } from "./InviteModal";

export const ClientPage = () => {
    const [serverCount, setServerCount] = useState(0);
    const [channelsCount, setChannelsCount] = useState(0);
    const [userAvatar, setUserAvatar] = useState("");
    const [appAvatar, setAppAvatar] = useState("");
    const [botPublic, setBotPublic] = useState(false);
    const [codeGrant, setCodeGrant] = useState(false);
    const [userVerified, setUserVerified] = useState(false);
    const [status, setStatus] = useState("online");
    const [modalOpened, setModalOpened] = useState(false);

    const { classes } = useStyles();

    // TODO: Convert this to use-state as an object.
    const refs = {
        client: {
            token: useRef(),
            initializedAt: useRef(),
        },
        user: {
            status: useRef(),
            tag: useRef(),
            id: useRef(),
            avatarURL: useRef(),
            createdAt: useRef(),
        },
        app: {
            botPublic: useRef(),
            botCodeGrant: useRef(),
            name: useRef(),
            description: useRef(),
            owner: useRef(),
            id: useRef(),
            tags: useRef(),
            iconURL: useRef(),
            commandsCounter: useRef(),
            createdAt: useRef(),
        },
    };

    useEffect(() => {
        WSocket.addEventListener("message", (message) => {
            message = JSON.parse(message.data);

            switch (message.header) {
                case "fill_client_info":
                    const clientSettings = message.content.client;
                    const userSettings = message.content.user;
                    const appSettings = message.content.app;

                    setServerCount(clientSettings.guilds);
                    setChannelsCount(clientSettings.channels);
                    setUserAvatar(userSettings.avatarURL);
                    setAppAvatar(appSettings.iconURL);
                    setBotPublic(appSettings.public);
                    setCodeGrant(appSettings.codeGrant);
                    setUserVerified(userSettings.verified);
                    setStatus(userSettings.status);
                    refs.client.token.current.value = clientSettings.token;
                    refs.client.initializedAt.current.value = clientSettings.initializedAt;
                    refs.user.tag.current.value = userSettings.tag;
                    refs.user.id.current.value = userSettings.id;
                    refs.user.createdAt.current.value = userSettings.createdAt;
                    refs.app.name.current.value = appSettings.name;
                    refs.app.description.current.value = appSettings.description;
                    refs.app.owner.current.value = appSettings.owner ?? "Team";
                    refs.app.id.current.value = appSettings.id;
                    refs.app.tags.current.value = appSettings.tags;
                    refs.app.commandsCounter.current.value = appSettings.commands;
                    refs.app.createdAt.current.value = appSettings.createdAt;
                    break;
            }
        });
    });

    return (
        <>
            <InviteModal opened={modalOpened} setOpened={setModalOpened}/>
            <Box className={classes.parent}>
                <ClientSection refs={refs} serverCount={serverCount} channelCount={channelsCount} setModalOpened={setModalOpened}/>
                <UserSection refs={refs} userAvatar={userAvatar} userVerified={userVerified} status={status} setStatus={setStatus}/>
                <AppSection refs={refs} appAvatar={appAvatar} botPublic={botPublic} codeGrant={codeGrant} />
            </Box>
        </>
    );
};
