import { Flex, Text, Box, ActionIcon, ScrollArea, Checkbox, SimpleGrid, LoadingOverlay, TextInput, ColorInput, Accordion, Button, useMantineTheme } from "@mantine/core"
import { customLoader } from "../../../../styles/Settings.style"
import { IconArrowBack } from "@tabler/icons"
import { useState, useEffect } from "react"
import { ImageDisplay } from "../../../misc/ImageDisplay"
import { SendMessage, AddSocketListener } from "../../../misc/WebSocket"
import { defaultMemberSettings, permLists as Perms } from "../../../misc/Enums"


const RoleButton = ({ name, id, color, setTab, setThirdRole }) => {
    const theme = useMantineTheme()

    return (
        <Flex 
            direction="row"
            align="center"
            p={10}
            ml={0}
            bg={theme.colors.dark[6]}
            onClick={()=> {
                setTab("roles")
                setThirdRole(id)
            }}
            style={{
                boxSizing:"border-box",
                border:`1px solid ${theme.colors.dark[4]}`,
                borderRadius: 5,
                cursor:"pointer",
                "&:hover":{
                    border:`1px solid ${theme.colors.dark[3]}`,
                    backgroundColor: theme.colors.dark[5],
                }
            }}
        >
            <Box w={10} h={10} bg={color} ml={5} style={{borderRadius:"100%"}} />
            <Text ml={10} color={theme.colors.dark[2]}>{name}</Text>
        </Flex>
    )
}



export const MemberInfo = ({ serverId, memberId, setMember, setTab, setThirdRole, setMsgDestiny, setCurrentPage }) => {
    const [ settings, setSettings ] = useState(defaultMemberSettings)
    const theme = useMantineTheme()


    
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
                color="indigo"
                label={permission}
                checked={settings.permissions.includes(permission)}
                key={permission} 
            />
        )
    }


    const rolesElements = []
    for(const role in settings.roles) {
        rolesElements.push(
            <RoleButton 
                key={settings.roles[role].id} 
                color={settings.roles[role].color} 
                name={role} id={settings.roles[role].id} 
                setTab={setTab} 
                setThirdRole={setThirdRole}
            />
        )
    }


    const handleSubmitClick = () => {
        setMsgDestiny({
            type:"dm", 
            id:settings.id
        });
        setCurrentPage("Messages")
    }

    

    return(
        <>
            { settings.id === "000000000000000000" && <LoadingOverlay visible overlayBlur={0} loader={customLoader} />}

            <Flex mb={5}  style={{borderBottom: `2px solid ${theme.colors.dark[4]}`}}>
                <ActionIcon onClick={()=>{setMember()}}>
                    <IconArrowBack />
                </ActionIcon>

                <Text ml={10}>{settings.tag}</Text>
                <Text ml="auto" mb={10} color={theme.colors.dark[3]}> {memberId} </Text>
            </Flex>

            <ScrollArea>
                <SimpleGrid cols={2} mb={10}>
                    <Checkbox  readOnly color="indigo" label="Is Bot" checked={settings.isBot} />
                    <Checkbox  readOnly color="indigo" label="System Verified" checked={settings.isSystem} />
                    <Checkbox  readOnly color="indigo" label="Manageable by Bot" checked={settings.manageable} />
                    <Checkbox  readOnly color="indigo" label="Moderatable by Bot" checked={settings.moderatable} />
                    <Checkbox  readOnly color="indigo" label="Kickable by Bot" checked={settings.kickable} />
                    <Checkbox  readOnly color="indigo" label="Bannable by Bot" checked={settings.bannable} />
                </SimpleGrid>

                <SimpleGrid cols={2} mb={10}>
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

                    { settings.statusDevice && <TextInput readOnly label="Device" value={settings.statusDevice}/>}
                </SimpleGrid>

                <Accordion  variant="contained" chevronPosition="left" defaultValue="customization">
                    <Accordion.Item value="permissions">
                        <Accordion.Control>Permissions</Accordion.Control>
                        <Accordion.Panel>
                            <SimpleGrid cols={2} mb={10}>
                                {permsChecks}
                            </SimpleGrid>
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="roles">
                        <Accordion.Control>Roles</Accordion.Control>
                        <Accordion.Panel>
                            <SimpleGrid cols={2} mb={10}>
                                {rolesElements}
                            </SimpleGrid>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
                <SimpleGrid cols={2} mt={10}>
                    <Button color="indigo" fullWidth onClick={handleSubmitClick}>Send Message</Button>
                </SimpleGrid>
            </ScrollArea>
        </>
    )
}