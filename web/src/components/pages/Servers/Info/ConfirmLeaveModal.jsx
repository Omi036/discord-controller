import { Modal, Text, TextInput, SimpleGrid, Button, Flex } from "@mantine/core"
import { useState } from "react" 
import { SendMessage } from "../../../misc/WebSocket" 

export const ConfirmLeaveModal = ({opened, setOpened, svid}) => {
    const [ text, setText ] = useState("")

    const leaveServer = () => {
        SendMessage("leave_server", {
            svId: svid
        })

        setOpened(false)
        setText("")
    }

    return (
        <Modal title="Confirm Server Leave" opened={opened} onClose={()=>{setOpened(false);setText("")}}>
            <SimpleGrid cols={1}>
                <Text>Type "I LEAVE" to confirm.</Text>
                <TextInput placeholder="I LEAVE" value={text} onChange={e => setText(e.currentTarget.value)}/>
            </SimpleGrid>
            <Flex direction="row" justify="space-between" align="center" mt={10}>
                <Button fullWidth color="gray" mr={5} onClick={()=>setOpened(false)}>Cancel</Button>
                <Button fullWidth color="red"  ml={5} onClick={leaveServer}  disabled={!(text.toUpperCase()=="I LEAVE")}>Leave</Button>
            </Flex>
        </Modal>
    )
}