import { useState, useRef, useEffect } from "react";
import { Modal, TextInput, Button, Box } from "@mantine/core";
import { WSocket } from "./WebSocket";

// Main component
// This is the component that asks you for the token at the start
// TODO: Ask the user for intents, bc not all the application allows the same intents
export const Settings = () => {
    const [opened, setOpened] = useState(true);
    const tokenInput = useRef();

    // We wait till the server tell us it's OK
    // TODO: Check if it isn't OK
    useEffect(() => {
        WSocket.addEventListener("message", (message) => {
            message = JSON.parse(message.data);

            switch (message.header) {
                case "confirm_auth":
                    setOpened(false);
                    break;
            }
        });
    });

    // When we click, we notify the server with the token
    // TODO: Check if its a valid token
    const handleClick = () => {
        WSocket.send(
            JSON.stringify({
                header: "auth",
                content: tokenInput.current.value,
            })
        );
    };

    return (
        <Box sx={{position:"relative",zIndex:100}}>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Setting Up"
                withCloseButton={false}
                closeOnEscape={false}
                closeButtonLabel={false}
                closeOnClickOutside={false}
            >
                <TextInput
                    label="Bot Token"
                    placeholder="Ntg3K2lm..."
                    required
                    ref={tokenInput}
                />
                <Button
                    style={{
                        backgroundColor: "#5865F2",
                        width: "100%",
                        marginTop: 10,
                    }}
                    onClick={handleClick}
                >
                    Set Up Bot
                </Button>
            </Modal>
        </Box>
    );
};
