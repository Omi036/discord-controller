import { Modal, SegmentedControl, SimpleGrid,  Button, TextInput, CopyButton, Flex, Title } from "@mantine/core"
import { InviteCheckbox } from "./InviteCheckbox";
import { IconClipboard, IconSend } from "@tabler/icons";
import { SendMessage, AddSocketListener } from "../../misc/WebSocket";
import { useState } from "react";
import { useEffect } from "react";
import { defaultPermissions, possibleLayouts } from "../../misc/Enums";


export const InviteModal = ({ opened, setOpened }) => {
    const [inviteLayout, setInviteLayout] = useState("default");
    const [inviteUrl, setInviteUrl] = useState("");
    const [permissions, setPermissions] = useState(defaultPermissions)



    const handleInviteLayoutChange = (permsLayout) => {
        switch (permsLayout){
            case "none":
                var new_permissions = {}
                for(const key in defaultPermissions){ new_permissions[key] = false }
                setPermissions(new_permissions) 
                break;


            case "all":
                var new_permissions = {}
                for(const key in defaultPermissions){ new_permissions[key] = true }
                setPermissions(new_permissions) 
                break;


            case "admin":
                var new_permissions = {}
                for(const key in defaultPermissions){ new_permissions[key] = false }
                new_permissions.Administrator = true
                setPermissions(new_permissions) 
                break;


            case "default":
                setPermissions(defaultPermissions)
                break

        }
        setInviteLayout(permsLayout)
    }



    useEffect(() => {
        AddSocketListener("reply_invite", (data) => {
            setInviteUrl(data)
        })
    })



    const handleInviteClick = () => {
        const permissions_names = []
        for(const key in permissions) { if(permissions[key]) permissions_names.push(key) }
        SendMessage("gen_invite", permissions_names)
    }




    const permsCheckBoxes = []
    for(const key in permissions) {
        permsCheckBoxes.push(<InviteCheckbox permissions={permissions} setPermissions={setPermissions} property={key} key={key} />)
    }


    
    return(
        <Modal title="Generate Bot Invite" opened={opened} size="xll" onClose={() => setOpened(false)}>
            <Title>Permissions</Title>

            <SegmentedControl fullWidth color="indigo" value={inviteLayout} onChange={handleInviteLayoutChange} data={possibleLayouts}/>

            <SimpleGrid cols={4} mt={5}> { permsCheckBoxes } </SimpleGrid>

            <Button fullWidth color="indigo" mt={10} onClick={handleInviteClick}>Generate Invite</Button>

            <Flex mt={10} direction="row" justify="space-between" align="center">
                <TextInput readOnly w="80%" value={inviteUrl}/>

                <CopyButton value={inviteUrl}>
                    {({ copied, copy }) => (
                      <Button color={copied ? 'teal' : 'indigo'}  w="8%" m="auto 0" onClick={copy}>
                        <IconClipboard />
                      </Button>
                    )}
                </CopyButton>

                <Button color="indigo" w="8%" m="auto 0" onClick={() => inviteUrl && window.open(inviteUrl, "_blank")}>
                    <IconSend />
                </Button>

            </Flex>
        </Modal>
    )
}