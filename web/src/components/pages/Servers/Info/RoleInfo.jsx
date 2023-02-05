import { Box, ScrollArea, ActionIcon, Text, SimpleGrid, TextInput, Checkbox, LoadingOverlay, ColorInput, Accordion } from "@mantine/core"
import { IconArrowBack } from "@tabler/icons"
import { useEffect, useState } from "react"
import { TextDisplay } from "../../../misc/TextDisplay"
import { SendMessage, AddSocketListener } from "../../../misc/WebSocket"
import { customLoader } from "../../../../styles/Settings.style"

export const RoleInfo = ({ serverId, roleId, setRole }) => {
    const defaultRoleInfo = {
        name: "Role",
        id: "000000000000000000",
        hexColor: "#99aab5",
        hoist: false,
        editable: false,
        managed: false,
        mentionable: false,
        createdAt: "",
        icon: "",
        members: 0,
        position: 0,
        tags: [],
        unicodeEmoji:"",
        permissions:""
    }
    const defaultPerms = {
        AddReactions: false,
        Administrator: false,
        AttachFiles: false,
        BanMembers: false,
        ChangeNickname: false,
        Connect: false,
        CreateInstantInvite: false,
        CreatePrivateThreads: false,
        CreatePublicThreads: false,
        DeafenMembers: false,
        EmbedLinks: false,
        KickMembers: false,
        ManageChannels: false,
        ManageEmojisAndStickers: false,
        ManageEvents: false,
        ManageGuild: false,
        ManageMessages: false,
        ManageNicknames: false,
        ManageRoles: false,
        ManageThreads: false,
        ManageWebhooks: false,
        MentionEveryone: false,
        ModerateMembers: false,
        MoveMembers: false,
        MuteMembers: false,
        PrioritySpeaker: false,
        ReadMessageHistory: false,
        RequestToSpeak: false,
        SendMessages: false,
        SendMessagesInThreads: false,
        SendTTSMessages: false,
        Speak: false,
        Stream: false,
        UseApplicationCommands: false,
        UseEmbeddedActivities: false,
        UseExternalEmojis: false,
        UseExternalStickers: false,
        UseVAD: false,
        ViewAuditLog: false,
        ViewChannel: false,
        ViewGuildInsights: false
    }
    const [roleInfo, setRoleInfo] = useState(defaultRoleInfo)
    const [permissions, setPermissions] = useState(defaultPerms)

    // We add the listener for all the data
    useEffect(() => {
        AddSocketListener("role_data", data => {
            setRoleInfo(data)

            for(const perm of data.permissions) {
                defaultPerms[perm] = true
            }
        })
    })

    // When the tab is pressed, we request the data
    useEffect(() => {
        SendMessage("get_role_data", {svId:serverId, id:roleId})
    }, [roleId])


    const permsChecks = []
    for(const key in defaultPerms) {
        permsChecks.push(<Checkbox readOnly color={"indigo"} label={key} checked={permissions[key]} key={key} />)
    }

    return(
        <>
            { roleInfo.id === "000000000000000000" ? <LoadingOverlay visible overlayBlur={0} loader={customLoader} /> : <></> }
            <Box sx={(theme) => ({borderBottom: `2px solid ${theme.colors.dark[4]}`, display:"flex", marginBottom:5})}>
                <ActionIcon onClick={()=>{setRole(false)}}>
                    <IconArrowBack />
                </ActionIcon>
                <Text style={{marginLeft:10}}>{roleInfo.name}</Text>
                <Text sx={(theme) => ({marginLeft:"auto", marginBottom:10, color:theme.colors.dark[3]})}>{roleId}</Text>
            </Box>
            <ScrollArea>
                <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginBottom:10}}>
                    <TextDisplay label={"Members With this role"} value={roleInfo.members} />
                    <TextDisplay label={"Role Position"} value={roleInfo.position} />
                </Box>
                <SimpleGrid cols={2} style={{marginBottom: 10}}>
                    <Checkbox  readOnly color={"indigo"} label="Show separated" checked={roleInfo.hoist} />
                    <Checkbox  readOnly color={"indigo"} label="Editable by bot" checked={roleInfo.editable} />
                    <Checkbox  readOnly color={"indigo"} label="Role managed by a third Service" checked={roleInfo.managed} />
                    <Checkbox  readOnly color={"indigo"} label="Mentionable" checked={roleInfo.mentionable} />
                </SimpleGrid>
                <SimpleGrid cols={2} style={{marginBottom: 10}}>
                    <TextInput readOnly label="Name" value={roleInfo.name}/>
                    <TextInput readOnly label="Id" value={roleInfo.id}/>
                    <ColorInput readOnly label="Color" defaultValue="#99aab5" value={roleInfo.hexColor === "#000000" ? "#99aab5" : roleInfo.hexColor}/>
                    <TextInput readOnly label="Created At" value={roleInfo.createdAt}/>
                    <TextInput readOnly label="Icon" value={roleInfo.icon}/>
                    <TextInput readOnly label="Tags" value={roleInfo.tags}/>
                    <TextInput readOnly label="Emoji" value={roleInfo.unicodeEmoji}/>
                </SimpleGrid>
                <Accordion  variant="contained" chevronPosition="left" defaultValue="customization">
                    <Accordion.Item value="permissions">
                        <Accordion.Control>Permissions</Accordion.Control>
                        <Accordion.Panel>
                            <SimpleGrid cols={2} style={{marginBottom: 10}}>
                            {permsChecks}
                            </SimpleGrid>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </ScrollArea>
        </>
    )
}