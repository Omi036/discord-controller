import { SimpleGrid, Box, TextInput, Text, Checkbox, Button, Modal, Slider, CopyButton, NumberInput, Flex} from "@mantine/core"
import { AddSocketListener, SendMessage } from "../../../misc/WebSocket"
import { IconClipboard, IconSend } from "@tabler/icons"
import { useState, useEffect, useRef } from "react"
import { UsesMarks } from "../../../misc/Enums"


export const CreateInviteModal = ({channelID, serverId, opened, setOpened}) => {
    const [infiniteDuration, setInfiniteDuration] = useState(true)
    const [uses, setUses] = useState(0)
    const temporaryEl = useRef()
    const durationEl = useRef()
    const reasonEl = useRef()
    const [ inviteUrl, setInviteUrl ] = useState("")

    
    useEffect(() => {
        AddSocketListener("reply_channel_invite", inv => setInviteUrl(inv))
    })
    
    
    
    const createInvite = () => {
        var duration;
        if(infiniteDuration) duration = 0
        else {duration = durationEl.current.value}

        SendMessage("gen_channel_invite", {
            svId:serverId, 
            id:channelID, 
            settings:{
                temporary: temporaryEl.current.checked,
                reason: reasonEl.current.value,
                maxAge: duration,
                maxUses: uses
            }
        })
    }

    
    return (
        <Modal title="Create Channel Invite"  opened={opened} onClose={() => setOpened(false)}>
            <SimpleGrid cols={1}>
                <Checkbox color="indigo" label="Temporary Invite" ref={temporaryEl}/>
                <Checkbox color="indigo" label="Infinite Duration" checked={infiniteDuration} onChange={(e) => setInfiniteDuration(e.currentTarget.checked)}/>

                <NumberInput min={0} label="Duration" placeholder="Invite duration (In seconds)" disabled={infiniteDuration} ref={durationEl}/>

                <TextInput label="Reason" placeholder="Optional reason" ref={reasonEl}/>
                <Text mb={0}>Uses (0 for unlimited uses)</Text>
                <Slider mt={0} value={uses} onChange={setUses} color="indigo" marks={UsesMarks} />
                <Button mt={15} color="indigo" fullWidth onClick={createInvite}>Create Invite</Button>

            </SimpleGrid>

            <Flex direction="row" justify="space-between" align="center" mt={10}>
                <TextInput readOnly w="65%" value={inviteUrl}/>

                <CopyButton value={inviteUrl}>
                  {({ copied, copy }) => (
                    <Button color={copied ? 'teal' : 'indigo'} onClick={copy}>
                      <IconClipboard />
                    </Button>
                  )}
                </CopyButton>

                <Button color={'indigo'}  m="auto 0" onClick={() => {inviteUrl && window.open(inviteUrl, "_blank")}}>
                    <IconSend />
                </Button>
            </Flex>
        </Modal>
    )
}