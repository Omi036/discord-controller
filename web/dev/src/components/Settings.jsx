import { useState, useRef, useEffect } from "react";
import { Modal, TextInput, Button, Box, Text, SimpleGrid, Checkbox, SegmentedControl, LoadingOverlay } from "@mantine/core";
import { WSocket } from "./misc/WebSocket";
import { customLoader } from "../styles/Settings.style";

// Main component
// This is the component that asks you for the token and the Intents at the start
export const Settings = () => {
    const [opened, setOpened] = useState(true);
    const [error, setError] = useState(false);
    const [layout, setLayout] = useState("default");
    const [disabled, setDisabled] = useState(false);
    const tokenInput = useRef();
    const defaults_intents = {
        "Guilds":true,
        "GuildMembers": true,
        "GuildBans": true,
        "GuildIntegrations": true,
        "GuildEmojisAndStickers": true,
        "GuildWebhooks": true ,
        "GuildInvites": true,
        "GuildVoiceStates": false,
        "GuildPresences": false,
        "GuildMessages": true,
        "GuildMessageReactions": false,
        "GuildMessageTyping": false,
        "GuildScheduledEvents": false,
        "DirectMessages": true,
        "DirectMessageReactions": false,
        "DirectMessageTyping": false,
        "MessageContent": true,
        "AutoModerationConfiguration": true,
        "AutoModerationExecution": true
    }
    const [intents, setIntents] = useState(defaults_intents);
    

    // We add the responses for every server message
    useEffect(() => {
        WSocket.addEventListener("message", (message) => {
            if(!opened) return
            message = JSON.parse(message.data);

            switch (message.header) {
                // When the server confirms the connection
                case "confirm_auth":
                    setOpened(false);
                    break;

                // When the server denies our connection
                case "deny_auth":
                    setDisabled(false)
                    setError("Server didn't like token")
                    tokenInput.current.value = ""
                    break;

                // When the App has already a bot connected
                case "already_login":
                    setOpened(false);
                    break;
            }
        });
    });

    // When we click, we notify the server with the token
    const handleClick = () => {
        setError(false)
        setDisabled(true)

        // We check if its a valid token 
        // If its causing trouble to you, consider commenting the following lines
        const validation_regex = /[M-Z][A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/g
        if(!tokenInput.current.value.match(validation_regex)){
            setDisabled(false)
            setError("Provide a valid token")
            return
        }

        // Then we request the login to the server
        WSocket.send(
            JSON.stringify({
                header: "auth",
                content: {
                    token:tokenInput.current.value,
                    intents:intents
                }
            })
        );
    };

    // This handles the check event on the intents
    const handleCheckChange = (intentName) => {
        var newIntents = { ...intents}
        newIntents[intentName] = !intents[intentName]
        setIntents(newIntents)
    }

    // This handles the layout selector for the intents
    const handleChangeLayout = (value) => {
        var newIntents = { ...intents}
        setLayout(value)

        switch (value) {
            case "none":
                // We set every key to false
                Object.keys(newIntents).forEach(key => { newIntents[key] = false })
                break;
        
            case "all":
                // We set every key to true
                Object.keys(newIntents).forEach(key => { newIntents[key] = true })
                break;

            case "default":
                // We set it to the default intents
                newIntents = defaults_intents
                break;

        }   
            setIntents(newIntents)
    }

    return (
        <>
        <Box sx={{position:"relative",zIndex:100}}>
            
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Setting Up"
                withCloseButton={false}
                closeOnEscape={false}
                closeButtonLabel={false}
                closeOnClickOutside={false}
                size="lg"
            >
                <LoadingOverlay visible={disabled} overlayBlur={2} loader={customLoader} />
                <TextInput label="Bot Token" placeholder="Ntg3K2lm..." required ref={tokenInput} error={error} disabled={disabled}
                />
                <Box style={{marginTop:10, marginBottom:10}}>
                    <Text style={{marginBottom:5}}>Intents</Text>
                    <SegmentedControl fullWidth  radius={"sm"}  color="indigo"  value={layout}  onChange={handleChangeLayout} disabled={disabled}
                    data={[
                        {label:"None", value:"none"},
                        {label:"Default", value:"default"},
                        {label:"All", value:"all"}
                    ]} />

                    {/* If you see this, please, for your our own sake, don't take notice of the following 21 lines of code */}
                    <SimpleGrid cols={2} style={{marginTop:10}}>
                        <Checkbox  checked={intents.Guilds}  onChange={()=>handleCheckChange("Guilds")} color="indigo" label="Guilds"/>
                        <Checkbox  checked={intents.GuildMembers}  onChange={()=>handleCheckChange("GuildMembers")} color="indigo" label="GuildMembers"/>
                        <Checkbox  checked={intents.GuildBans} onChange={()=>handleCheckChange("GuildBans")} color="indigo" label="GuildBans"/>
                        <Checkbox  checked={intents.GuildIntegrations}   onChange={()=>handleCheckChange("GuildIntegrations")} color="indigo" label="GuildIntegrations"/>
                        <Checkbox  checked={intents.GuildEmojisAndStickers}  onChange={()=>handleCheckChange("GuildEmojisAndStickers")} color="indigo" label="GuildEmojisAndStickers"/>
                        <Checkbox  checked={intents.GuildWebhooks}   onChange={()=>handleCheckChange("GuildWebhooks")} color="indigo" label="GuildWebhooks"/>
                        <Checkbox  checked={intents.GuildInvites}  onChange={()=>handleCheckChange("GuildInvites")} color="indigo" label="GuildInvites"/>
                        <Checkbox  checked={intents.GuildVoiceStates}  onChange={()=>handleCheckChange("GuildVoiceStates")} color="indigo" label="GuildVoiceStates"/>
                        <Checkbox  checked={intents.GuildPresences}   onChange={()=>handleCheckChange("GuildPresences")} color="indigo" label="GuildPresences"/>
                        <Checkbox  checked={intents.GuildMessages}  onChange={()=>handleCheckChange("GuildMessages")} color="indigo" label="GuildMessages"/>
                        <Checkbox  checked={intents.GuildMessageReactions}   onChange={()=>handleCheckChange("GuildMessageReactions")} color="indigo" label="GuildMessageReactions"/>
                        <Checkbox  checked={intents.GuildMessageTyping}  onChange={()=>handleCheckChange("GuildMessageTyping")} color="indigo" label="GuildMessageTyping"/>
                        <Checkbox  checked={intents.GuildScheduledEvents}   onChange={()=>handleCheckChange("GuildScheduledEvents")} color="indigo" label="GuildScheduledEvents"/>
                        <Checkbox  checked={intents.DirectMessages}   onChange={()=>handleCheckChange("DirectMessages")} color="indigo" label="DirectMessages"/>
                        <Checkbox  checked={intents.DirectMessageReactions}  onChange={()=>handleCheckChange("DirectMessageReactions")} color="indigo" label="DirectMessageReactions"/>
                        <Checkbox  checked={intents.DirectMessageTyping}  onChange={()=>handleCheckChange("DirectMessageTyping")} color="indigo" label="DirectMessageTyping"/>
                        <Checkbox  checked={intents.MessageContent}   onChange={()=>handleCheckChange("MessageContent")} color="indigo" label="MessageContent"/>
                        <Checkbox  checked={intents.AutoModerationConfiguration}   onChange={()=>handleCheckChange("AutoModerationConfiguration")} color="indigo" label="AutoModerationConfiguration"/>
                        <Checkbox  checked={intents.AutoModerationExecution}  onChange={()=>handleCheckChange("AutoModerationExecution")} color="indigo" label="AutoModerationExecution"/>
                    </SimpleGrid>
                </Box>
                
                <Button fullWidth onClick={handleClick} disabled={disabled}
                    style={{
                        backgroundColor: disabled ? "#3946D3" : "#5865F2",
                        marginTop: 10,
                    }}
                >Set Up Bot</Button>
            </Modal>
        </Box>
        </>
    );
};
