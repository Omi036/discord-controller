import { useState, useRef, useEffect } from "react";
import { Modal, TextInput, Button, Box, Text, SimpleGrid, Checkbox, SegmentedControl, LoadingOverlay } from "@mantine/core";
import { AddSocketListener, SendMessage } from "./misc/WebSocket";
import { customLoader } from "../styles/Settings.style";

// This component that asks you for the token and the Intents at the start
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
        "MessageContent": false,
        "AutoModerationConfiguration": true,
        "AutoModerationExecution": true
    }
    const [intents, setIntents] = useState(defaults_intents);
    

    // We add the responses for every server message
    useEffect(() => {
        AddSocketListener("confirm_auth", () => {
            if(!opened) return
            setOpened(false);
        })

        // When the server denies our connection, we will reply with the reason
        AddSocketListener("deny_auth", (data) => {
            var errorMessages = {
                "Error [DisallowedIntents]":"Server didn't allow to use those intents. Try with less intents",
                "Error [TokenInvalid]":"Server didn't recognize the token"
            }

            if(!opened) return
            setDisabled(false)
            setError(errorMessages[data.reason])
            tokenInput.current.value = ""
        })
        
        // When the App has already a bot connected
        AddSocketListener("already_login", () => {
            if(!opened) return
            setOpened(false);
        })
    })

    // Login Button Click, we notify the server with the token
    const handleLoginClick = () => {
        setError(false)
        setDisabled(true)

        //!NOTE, this is giving problems on older bots token
        // We check if its a valid token 
        // const token_validation_regex = /[M-Z][A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/g
        // if(!tokenInput.current.value.match(token_validation_regex)){
        //     setDisabled(false)
        //     setError("Provide a valid token")
        //     return
        // }

        // Then we request the login to the server
        SendMessage("auth", {
            token:tokenInput.current.value,
            intents:intents
        })
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
            case "minimum":
                // We set every key to false
                for(const key in newIntents) { newIntents[key] = false}
                newIntents.Guilds = true
                break;
        
            case "all":
                // We set every key to true
                for(const key in newIntents) { newIntents[key] = true}
                break;

            case "default":
                // We set it to the default intents
                newIntents = defaults_intents
                break;

        }
        setIntents(newIntents)
    }


    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Setting Up"
            withCloseButton={false}
            closeOnEscape={false}
            closeButtonLabel={false}
            closeOnClickOutside={false}
            size="lg"
            overlayBlur={3}
        >
            {/* This overlay will be shown meanwhile we receive the server approvation */}
            <LoadingOverlay visible={disabled} overlayBlur={2} loader={customLoader} />

            {/* Token Input */}
            <TextInput label="Bot Token" placeholder="Ntg3K2lm..." required ref={tokenInput} error={error} disabled={disabled}/>

            {/* HUGE Container of the intents */}
            <Box style={{marginTop:10, marginBottom:10}}>
                <Text style={{marginBottom:5}}>Intents</Text>

                {/* Layout selector */}
                <SegmentedControl fullWidth radius={"sm"} color="indigo" value={layout} onChange={handleChangeLayout} disabled={disabled}
                data={[
                    {label:"Minimum", value:"minimum"},
                    {label:"Default", value:"default"},
                    {label:"All", value:"all"}
                ]} />

                {/* If you see this, please, for your our own sake, don't take notice of the following 21 lines of code */}
                <SimpleGrid cols={2} style={{marginTop:10}}>
                    <Checkbox  checked={intents.Guilds} readOnly color="teal" label="Guilds"/>
                    <Checkbox  checked={intents.GuildMembers}  onChange={()=>handleCheckChange("GuildMembers")} color="indigo" label="GuildMembers"/>
                    <Checkbox  checked={intents.GuildBans}  onChange={()=>handleCheckChange("GuildBans")} color="indigo" label="GuildBans"/>
                    <Checkbox  checked={intents.GuildIntegrations}  onChange={()=>handleCheckChange("GuildIntegrations")} color="indigo" label="GuildIntegrations"/>
                    <Checkbox  checked={intents.GuildEmojisAndStickers} onChange={()=>handleCheckChange("GuildEmojisAndStickers")} color="indigo" label="GuildEmojisAndStickers"/>
                    <Checkbox  checked={intents.GuildWebhooks}  onChange={()=>handleCheckChange("GuildWebhooks")} color="indigo" label="GuildWebhooks"/>
                    <Checkbox  checked={intents.GuildInvites}  onChange={()=>handleCheckChange("GuildInvites")} color="indigo" label="GuildInvites"/>
                    <Checkbox  checked={intents.GuildVoiceStates}  onChange={()=>handleCheckChange("GuildVoiceStates")} color="indigo" label="GuildVoiceStates"/>
                    <Checkbox  checked={intents.GuildPresences}   onChange={()=>handleCheckChange("GuildPresences")} color="indigo" label="GuildPresences"/>
                    <Checkbox  checked={intents.GuildMessages}  onChange={()=>handleCheckChange("GuildMessages")} color="indigo" label="GuildMessages"/>
                    <Checkbox  checked={intents.GuildMessageReactions}  onChange={()=>handleCheckChange("GuildMessageReactions")} color="indigo" label="GuildMessageReactions"/>
                    <Checkbox  checked={intents.GuildMessageTyping}  onChange={()=>handleCheckChange("GuildMessageTyping")} color="indigo" label="GuildMessageTyping"/>
                    <Checkbox  checked={intents.GuildScheduledEvents}  onChange={()=>handleCheckChange("GuildScheduledEvents")} color="indigo" label="GuildScheduledEvents"/>
                    <Checkbox  checked={intents.DirectMessages}  onChange={()=>handleCheckChange("DirectMessages")} color="indigo" label="DirectMessages"/>
                    <Checkbox  checked={intents.DirectMessageReactions}  onChange={()=>handleCheckChange("DirectMessageReactions")} color="indigo" label="DirectMessageReactions"/>
                    <Checkbox  checked={intents.DirectMessageTyping}  onChange={()=>handleCheckChange("DirectMessageTyping")} color="indigo" label="DirectMessageTyping"/>
                    <Checkbox  checked={intents.MessageContent}  onChange={()=>handleCheckChange("MessageContent")} color="indigo" label="MessageContent"/>
                    <Checkbox  checked={intents.AutoModerationConfiguration}  onChange={()=>handleCheckChange("AutoModerationConfiguration")} color="indigo" label="AutoModerationConfiguration"/>
                    <Checkbox  checked={intents.AutoModerationExecution}  onChange={()=>handleCheckChange("AutoModerationExecution")} color="indigo" label="AutoModerationExecution"/>
                </SimpleGrid>
            </Box>
            
            {/* Login Button */}
            <Button fullWidth onClick={handleLoginClick} disabled={disabled}
                style={{
                    backgroundColor: disabled ? "#3946D3" : "#5865F2",
                    marginTop: 10,
                }}
            >Set Up Bot</Button>
        </Modal>
    );
};
