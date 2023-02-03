import { Modal, SegmentedControl, SimpleGrid, Text, Button, TextInput, Box, CopyButton } from "@mantine/core"
import { InviteCheckbox } from "./InviteCheckbox";
import { IconClipboard, IconSend } from "@tabler/icons";
import { WSocket } from "../../misc/WebSocket";
import { useState } from "react";
import { useEffect } from "react";

export const InviteModal = ({ opened, setOpened }) => {
    const [inviteLayout, setInviteLayout] = useState("default");
    const [invite, setInvite] = useState("");
    const default_invites = {
        AddReactions: true,
        Administrator: false,
        AttachFiles: false,
        BanMembers: false,
        ChangeNickname: false,
        Connect: true,
        CreateInstantInvite: false,
        CreatePrivateThreads: false,
        CreatePublicThreads: false,
        DeafenMembers: false,
        EmbedLinks: false,
        KickMembers: false,
        ManageChannels: true,
        ManageEmojisAndStickers: false,
        ManageEvents: false,
        ManageGuild: false,
        ManageMessages: true,
        ManageNicknames: false,
        ManageRoles: true,
        ManageThreads: false,
        ManageWebhooks: false,
        MentionEveryone: true,
        ModerateMembers: false,
        MoveMembers: false,
        MuteMembers: false,
        PrioritySpeaker: false,
        ReadMessageHistory: true,
        RequestToSpeak: false,
        SendMessages: true,
        SendMessagesInThreads: false,
        SendTTSMessages: false,
        Speak: true,
        Stream: false,
        UseApplicationCommands: true,
        UseEmbeddedActivities: false,
        UseExternalEmojis: true,
        UseExternalStickers: true,
        UseVAD: false,
        ViewAuditLog: false,
        ViewChannel: true,
        ViewGuildInsights: false
    }
    const [permissions, setPermissions] = useState(default_invites)
    const handleInviteChange = (layout) => {
        switch (layout){
            case "none":
                var new_permissions = {...permissions}
                Object.keys(new_permissions).forEach(key => new_permissions[key] = false)
                setPermissions(new_permissions)
                break;

            case "all":
                var new_permissions = {...permissions}
                Object.keys(new_permissions).forEach(key => new_permissions[key] = true)
                setPermissions(new_permissions)
                break;


            case "admin":
                var new_permissions = {...permissions}
                Object.keys(new_permissions).forEach(key => new_permissions[key] = false)
                new_permissions.Administrator = true
                setPermissions(new_permissions)
                break;

            case "default":
                setPermissions(default_invites)
                break

        }
        setInviteLayout(layout)
    }

    useEffect(() => {
        WSocket.addEventListener("message", (message) => {
            message = JSON.parse(message.data);

            if(message.header !== "reply_invite") return
            setInvite(message.content)
        })
    })

    const handleClick = () => {

        const fac_keys = []
        Object.keys(permissions).forEach(key => {
            if(permissions[key]) fac_keys.push(key)
        })
        
        WSocket.send(JSON.stringify({
            header:"gen_invite",
            content:fac_keys
        }))
    }


    const checkBoxes = []
    Object.keys(permissions).forEach(key => {
        checkBoxes.push(<InviteCheckbox permissions={permissions} setPermissions={setPermissions} property={key} key={key} />)
    })
    
    return(
        <Modal title="Generate Bot Invite" opened={opened} size={"xll"} onClose={() => setOpened(false)}>
            <Text>Permissions</Text>
            <SegmentedControl fullWidth color={"indigo"} value={inviteLayout} onChange={handleInviteChange}
                data={[
                    { label: "None", value: "none" },
                    { label: "Default", value: "default" },
                    { label: "All", value: "all" },
                    { label: "Admin", value: "admin"}
                ]}
            />
            <SimpleGrid cols={4} style={{marginTop:5}}>
                { checkBoxes }
            </SimpleGrid>
            <Button fullWidth color={"indigo"} style={{marginTop:10}} onClick={handleClick}>Generate Invite</Button>
            <Box style={{display:"flex", flexDirection:"row", justifyContent: "space-around", alignItems: "center", marginTop:10}}>
                <TextInput readOnly style={{ width: "80%"}} value={invite}/>
                <CopyButton value={invite}>
                    {({ copied, copy }) => (
                      <Button color={copied ? 'teal' : 'indigo'} style={{width:"8%", margin:"auto 0"}} onClick={copy}>
                        <IconClipboard />
                      </Button>
                    )}
                </CopyButton>
                <Button color={'indigo'} style={{width:"8%", margin:"auto 0"}} onClick={invite.length > 1 ? () => window.open(invite, "_blank") : () => {}}>
                    <IconSend />
                </Button>
            </Box>
        </Modal>
    )
}