import { Text, Box, ActionIcon, ScrollArea, Checkbox, SimpleGrid, LoadingOverlay, TextInput, ColorInput, Accordion } from "@mantine/core"
import { customLoader } from "../../../../styles/Settings.style"
import { IconArrowBack } from "@tabler/icons"
import { useState, useEffect } from "react"
import { ImageDisplay } from "../../../misc/ImageDisplay"
import { SendMessage, AddSocketListener } from "../../../misc/WebSocket"
import { perms as Perms } from "./PermissionsList.json"

export const MemberInfo = ({ serverId, memberId, setMember }) => {
    const defaultMemberSettings = {
        bannable: false,
        kickable: false,
        manageable: false,
        moderatable: false,
        isSystem: false,
        isBot: false,
        tag:"Dummy#0000",
        nickname: "Dumi", 
        id: "000000000000000000", 
        avatar:"https://img.img", 
        banner: "https://img.img",
        accentColor: "#000000",
        createdAt: "",
        joinedAt: "",
        status: "offline",
        statusDevice: "desktop",
        roles: [],
        badges: [],
        permissions: [],
    }
    const [ settings, setSettings ] = useState(defaultMemberSettings)


    useEffect(() => {
        AddSocketListener("member_data", (data) => {
            setSettings(data)
        })
    })

    useEffect(() => {
        SendMessage("get_member_data", {svId: serverId, id: memberId})
    },[memberId])


    const permsChecks = []
    for(const permission of Perms) {
        permsChecks.push(
            <Checkbox 
            readOnly 
            color={"indigo"}
            label={permission}
            checked={settings.permissions.includes(permission)}
            key={permission} />
        )
    }


    const rolesElements = []
    for(const role in settings.roles) {
        rolesElements.push(
            <Box sx={(theme)=>({
                boxSizing:"border-box",
                padding:10,
                display:"flex",
                flexDirection: "row",
                alignItems:"center",
                marginLeft: 0,
                border:`1px solid ${theme.colors.dark[4]}`,
                backgroundColor: theme.colors.dark[6],
                borderRadius: 5,
            })} key={role}>
                <Box style={{width:10, height:10, borderRadius:"100%", backgroundColor: settings.roles[role], marginLeft:5}} />
                <Text sx={(theme)=>({marginLeft:10, color:theme.colors.dark[2]})}>{role}</Text>
            </Box>
        )
    }

    return(
        <>
            { settings.id === "000000000000000000" ? <LoadingOverlay visible overlayBlur={0} loader={customLoader} /> : <></> }
            <Box sx={(theme) => ({borderBottom: `2px solid ${theme.colors.dark[4]}`, display:"flex", marginBottom:5})}>
                <ActionIcon onClick={()=>{setMember()}}>
                    <IconArrowBack />
                </ActionIcon>
                <Text style={{marginLeft:10}}>{settings.tag}</Text>
                <Text sx={(theme) => ({marginLeft:"auto", marginBottom:10, color:theme.colors.dark[3]})}>{memberId}</Text>
            </Box>
            <ScrollArea>
                <SimpleGrid cols={2} style={{marginBottom: 10}}>
                    <Checkbox  readOnly color={"indigo"} label="Is Bot" checked={settings.isBot} />
                    <Checkbox  readOnly color={"indigo"} label="System Verified" checked={settings.isSystem} />
                    <Checkbox  readOnly color={"indigo"} label="Manageable by Bot" checked={settings.manageable} />
                    <Checkbox  readOnly color={"indigo"} label="Moderatable by Bot" checked={settings.moderatable} />
                    <Checkbox  readOnly color={"indigo"} label="Kickable by Bot" checked={settings.kickable} />
                    <Checkbox  readOnly color={"indigo"} label="Bannable by Bot" checked={settings.bannable} />
                </SimpleGrid>
                <SimpleGrid cols={2} style={{marginBottom: 10}}>
                    <TextInput readOnly label="Tag" value={settings.tag}/>
                    <TextInput readOnly label="Nickname" value={settings.nickname}/>
                    <TextInput readOnly label="Id" value={settings.id}/>
                    <TextInput readOnly label="Badges" value={settings.badges}/>
                    <ImageDisplay label="Avatar" value={settings.avatar}/>
                    <ImageDisplay label="Banner" value={settings.banner}/>
                    { settings.accentColor !== "Default" ?  <ColorInput readOnly label="Accent Color" value={settings.accentColor}/> : <TextInput readOnly label="Accent Color" value="Default"/>}
                    <TextInput readOnly label="Created At" value={new Date(settings.createdAt)}/>
                    <TextInput readOnly label="Joined At" value={new Date(settings.joinedAt)}/>
                    <TextInput readOnly label="Current Status" value={settings.status}/>
                    { settings.statusDevice ? <TextInput readOnly label="Device" value={settings.statusDevice}/> : <></>}
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
                    <Accordion.Item value="roles">
                        <Accordion.Control>Roles</Accordion.Control>
                        <Accordion.Panel>
                            <SimpleGrid cols={2} style={{marginBottom: 10}}>
                            {rolesElements}
                            </SimpleGrid>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </ScrollArea>
        </>
    )
}