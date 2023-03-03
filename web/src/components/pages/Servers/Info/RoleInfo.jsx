import { Box, Flex, ScrollArea, ActionIcon, Text, SimpleGrid, TextInput, Checkbox, LoadingOverlay, ColorInput, Accordion, useMantineTheme } from "@mantine/core"
import { IconArrowBack } from "@tabler/icons"
import { useEffect, useState } from "react"
import { TextDisplay } from "../../../misc/TextDisplay"
import { SendMessage, AddSocketListener } from "../../../misc/WebSocket"
import { customLoader } from "../../../../styles/Settings.style"
import { defaultRoleInfo, permLists as Perms } from "../../../misc/Enums"


export const RoleInfo = ({ serverId, roleId, setRole }) => {
    const theme = useMantineTheme()
    const [roleInfo, setRoleInfo] = useState(defaultRoleInfo)
    const permsChecks = []

    
    useEffect(() => {
        AddSocketListener("role_data", data => {
            setRoleInfo(data)
        })
    })

    

    useEffect(() => {
        SendMessage("get_role_data", {svId:serverId, id:roleId})
    }, [roleId])

    
    
    for(const permission of Perms) {
        permsChecks.push(
            <Checkbox 
                readOnly 
                color={"indigo"}
                label={permission}
                checked={roleInfo.permissions.includes(permission)}
                key={permission} 
            />
        )
    }


    return(
        <>
            { roleInfo.id === "000000000000000000" && <LoadingOverlay visible overlayBlur={0} loader={customLoader} />}
            
            <Flex mb={5} sx={(theme) => ({borderBottom: `2px solid ${theme.colors.dark[4]}`})}>
                <ActionIcon onClick={()=>{setRole(false)}}>
                    <IconArrowBack />
                </ActionIcon>

                <Text ml={10} style={{marginLeft:10}}> {roleInfo.name} </Text>
                <Text ml="auto" mb={10} color={theme.colors.dark[3]}> {roleId} </Text>
            </Flex>

            <ScrollArea>
                <Flex direction="row" w="100%" justify="space-around" mb={10}>
                    <TextDisplay label="Members With this role" value={roleInfo.members} />
                    <TextDisplay label="Role Position" value={roleInfo.position} />
                </Flex>

                <SimpleGrid cols={2} mb={10}>
                    <Checkbox  readOnly color="indigo" label="Show separated" checked={roleInfo.hoist} />
                    <Checkbox  readOnly color="indigo" label="Editable by bot" checked={roleInfo.editable} />
                    <Checkbox  readOnly color="indigo" label="Role managed by a third Service" checked={roleInfo.managed} />
                    <Checkbox  readOnly color="indigo" label="Mentionable" checked={roleInfo.mentionable} />
                </SimpleGrid>
                
                <SimpleGrid cols={2} mb={10}>
                    <TextInput readOnly label="Name" value={roleInfo.name}/>
                    <TextInput readOnly label="Id" value={roleInfo.id}/>
                    
                    <ColorInput readOnly label="Color" defaultValue="#99aab5" value={roleInfo.hexColor === "#000000" ? "#99aab5" : roleInfo.hexColor}/>

                    <TextInput readOnly label="Created At" value={new Date(roleInfo.createdAt)}/>
                    <TextInput readOnly label="Icon" value={roleInfo.icon}/>
                    <TextInput readOnly label="Tags" value={roleInfo.tags}/>
                    <TextInput readOnly label="Emoji" value={roleInfo.unicodeEmoji}/>
                </SimpleGrid>

                <Accordion  variant="contained" chevronPosition="left" defaultValue="customization">
                    <Accordion.Item value="permissions">
                        <Accordion.Control>Permissions</Accordion.Control>
                        <Accordion.Panel>
                            <SimpleGrid cols={2} mb={10} >
                                {permsChecks}
                            </SimpleGrid>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </ScrollArea>
        </>
    )
}