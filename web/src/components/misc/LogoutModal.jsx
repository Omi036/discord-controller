import { Modal, Button } from "@mantine/core"
import { SendMessage } from "./WebSocket"


const handleLogout = () => {
    SendMessage("logout")
    window.location.reload()
}


export const LogoutModal = ({opened, setOpened}) => {
    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Are you sure you want to log out?"
            size="sm"
        >
            <Button fullWidth bg="#ED4245" onClick={handleLogout}>Yes, I'm sure</Button>
        </Modal>
    )
}