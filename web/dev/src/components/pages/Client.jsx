import { useMantineTheme, Paper, Box, ScrollArea, Text, TextInput, Checkbox, Button, SegmentedControl, PasswordInput, Modal,} from "@mantine/core";
import { IconRobot, IconUser, IconApps, IconEye, IconEyeOff,} from "@tabler/icons";
import { useRef, useEffect, forwardRef, useState } from "react";
import { useStyles } from "../styles/Pages.style";
import { TextDisplay } from "../TextDisplay";
import { ImageDisplay } from "../ImageDisplay";
import { WSocket } from "../WebSocket";

export const ClientPage = () => {
    const theme = useMantineTheme();
    const [serverCount, setServerCount] = useState(0);
    const [channelsCount, setChannelsCount] = useState(0);
    const [userAvatar, setUserAvatar] = useState("");
    const [appAvatar, setAppAvatar] = useState("");
    const [botPublic, setBotPublic] = useState(false);
    const [codeGrant, setCodeGrant] = useState(false);
    const [userVerified, setUserVerified] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
    const [inviteLayout, setInviteLayout] = useState("default");
    const [status, setStatus] = useState("online");

    const { classes } = useStyles();
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

    const handleStatusChange = (status) => {
        WSocket.send(
            JSON.stringify({
                header: "change_status",
                content: status,
            })
        );
        console.log(status);
        setStatus(status);
    };

    const handleInviteChange = (layout) => {
        /*
        CreateInstantInvite
        KickMembers
        BanMembers
        Administrator
        ManageChannels
        ManageGuild
        AddReactions
        ViewAuditLog
        PrioritySpeaker
        Stream
        ViewChannel
        SendMessages
        SendTTSMessages
        ManageMessages
        EmbedLinks
        AttachFiles
        ReadMessageHistory
        MentionEveryone
        UseExternalEmojis
        ViewGuildInsights
        Connect
        Speak
        MuteMembers
        DeafenMembers
        MoveMembers
        UseVAD
        ChangeNickname
        ManageNicknames
        ManageRoles
        ManageWebhooks
        ManageEmojisAndStickers
        UseApplicationCommands
        RequestToSpeak
        ManageEvents
        ManageThreads
        CreatePublicThreads
        CreatePrivateThreads
        UseExternalStickers
        SendMessagesInThreads
        UseEmbeddedActivities
        ModerateMembers
        */
        setInviteLayout(layout)
    }

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
                    refs.client.initializedAt.current.value =
                        clientSettings.initializedAt;
                    refs.user.tag.current.value = userSettings.tag;
                    refs.user.id.current.value = userSettings.id;
                    refs.user.createdAt.current.value = userSettings.createdAt;
                    refs.app.name.current.value = appSettings.name;
                    refs.app.description.current.value =
                        appSettings.description;
                    refs.app.owner.current.value = appSettings.owner ?? "Team";
                    refs.app.id.current.value = appSettings.id;
                    refs.app.tags.current.value = appSettings.tags;
                    refs.app.commandsCounter.current.value =
                        appSettings.commands;
                    refs.app.createdAt.current.value = appSettings.createdAt;
                    break;
            }
        });
    });

    return (
        <>
            <Modal
                title="Generate Bot Invite"
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
            >
                <SegmentedControl fullWidth color={"indigo"} value={inviteLayout} onChange={handleInviteChange}
                    data={[
                        { label: "None", value: "none" },
                        { label: "Default", value: "default" },
                        { label: "All", value: "all" },
                    ]}
                />
            </Modal>
            <Box className={classes.parent}>
                <Paper shadow="sm" radius={"md"} className={classes.papers}>
                    <Box className={classes.paper_header}>
                        <IconRobot
                            color={theme.white}
                            className={classes.app_icon}
                        />
                        <Text color={theme.white} fontWeight="bold">
                            Discord Client
                        </Text>
                    </Box>
                    <Box style={{ height: "100%" }}>
                        <ScrollArea type="auto" className={classes.scroll}>
                            <Box className={classes.hbox}>
                                <TextDisplay
                                    label={"Servers"}
                                    value={serverCount}
                                />
                                <TextDisplay
                                    label={"Channels"}
                                    value={channelsCount}
                                />
                            </Box>
                            <PasswordInput
                                ref={refs.client.token}
                                readOnly
                                label={"Token"}
                                className={classes.text_input}
                                visibilityToggleIcon={({ reveal, size }) =>
                                    reveal ? (
                                        <IconEyeOff size={size} />
                                    ) : (
                                        <IconEye size={size} />
                                    )
                                }
                            />
                            <TextInput
                                label="Initializated At"
                                readOnly
                                className={classes.text_input}
                                ref={refs.client.initializedAt}
                            />
                            <Button
                                fullWidth
                                color={"indigo"}
                                className={classes.button_input}
                                onClick={() => setModalOpened(true)}
                            >
                                Generate Bot Invite
                            </Button>
                        </ScrollArea>
                    </Box>
                </Paper>

                <Paper shadow="sm" radius={"md"} className={classes.papers}>
                    <Box className={classes.paper_header}>
                        <IconUser
                            color={theme.white}
                            className={classes.app_icon}
                        />
                        <Text color={theme.white} fontWeight="bold">
                            User
                        </Text>
                    </Box>
                    <Box>
                        <ScrollArea type="auto" className={classes.scroll}>
                            <Checkbox
                                readOnly
                                label="Bot is Verified"
                                color="indigo"
                                style={{ marginBottom: 10, fontSize: 16 }}
                                checked={userVerified}
                            />
                            <Text>Status</Text>
                            <SegmentedControl
                                fullWidth
                                color="indigo"
                                value={status}
                                onChange={handleStatusChange}
                                data={[
                                    { label: "Online", value: "online" },
                                    { label: "Idle", value: "idle" },
                                    { label: "DnD", value: "dnd" },
                                    { label: "Invisible", value: "invisible" },
                                ]}
                            />
                            <TextInput
                                label="Tag"
                                readOnly
                                className={classes.text_input}
                                ref={refs.user.tag}
                            />
                            <TextInput
                                label="Id"
                                readOnly
                                className={classes.text_input}
                                ref={refs.user.id}
                            />
                            <ImageDisplay
                                label="Avatar URL"
                                value={userAvatar}
                            />
                            <TextInput
                                label="Created At"
                                readOnly
                                className={classes.text_input}
                                ref={refs.user.createdAt}
                            />
                        </ScrollArea>
                    </Box>
                </Paper>

                <Paper shadow="sm" radius={"md"} className={classes.papers}>
                    <Box className={classes.paper_header}>
                        <IconApps
                            color={theme.white}
                            className={classes.app_icon}
                        />
                        <Text color={theme.white} fontWeight="bold">
                            Application
                        </Text>
                    </Box>
                    <Box>
                        <ScrollArea type="auto" className={classes.scroll}>
                            <Checkbox
                                label="Bot is Public"
                                color="indigo"
                                readOnly
                                style={{ marginBottom: 10, fontSize: 16 }}
                                checked={botPublic}
                            />
                            <Checkbox
                                label="Bot require Code Grant to invite"
                                readOnly
                                color="indigo"
                                style={{
                                    marginBottom: 10,
                                    marginTop: 10,
                                    fontSize: 16,
                                }}
                                checked={codeGrant}
                            />
                            <TextInput
                                label="Name"
                                readOnly
                                className={classes.text_input}
                                ref={refs.app.name}
                            />
                            <TextInput
                                label="Description"
                                readOnly
                                className={classes.text_input}
                                ref={refs.app.description}
                            />
                            <TextInput
                                label="Owner"
                                readOnly
                                className={classes.text_input}
                                ref={refs.app.owner}
                            />
                            <TextInput
                                label="Id"
                                readOnly
                                className={classes.text_input}
                                ref={refs.app.id}
                            />
                            <TextInput
                                label="Tags"
                                readOnly
                                className={classes.text_input}
                                ref={refs.app.tags}
                            />
                            <ImageDisplay label="Icon URL" value={appAvatar} />
                            <TextInput
                                label="Slash Commands"
                                readOnly
                                className={classes.text_input}
                                ref={refs.app.commandsCounter}
                            />
                            <TextInput
                                label="Created At"
                                readOnly
                                className={classes.text_input}
                                ref={refs.app.createdAt}
                            />
                        </ScrollArea>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};
