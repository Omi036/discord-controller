import { Modal, Button } from "@mantine/core"
import { SendMessage } from "./WebSocket"

// Will logout the discord bot and refresh the page
const handleLogout = () => {
    SendMessage("logout")
    window.location.reload()
}

// The logout Bot Modal
export const LogoutModal = ({opened, setOpened}) => {
    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Are you sure you want to log out?"
            size="sm"
        >
            <Button fullWidth style={{ backgroundColor:"#ED4245"}} onClick={handleLogout}>Yes, I'm sure</Button>
        </Modal>
    )
}