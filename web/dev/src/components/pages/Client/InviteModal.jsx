import { Modal, SegmentedControl } from "@mantine/core"
import { useState } from "react";

export const InviteModal = ({ opened, setOpened }) => {
    const [inviteLayout, setInviteLayout] = useState("default");
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
    
    return(
        <Modal title="Generate Bot Invite" opened={opened} onClose={() => setOpened(false)}>
            <SegmentedControl fullWidth color={"indigo"} value={inviteLayout} onChange={handleInviteChange}
                data={[
                    { label: "None", value: "none" },
                    { label: "Default", value: "default" },
                    { label: "All", value: "all" },
                ]}
            />
        </Modal>
    )
}