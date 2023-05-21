import { useState, useRef, useEffect } from "react";
import { Modal, Button, Box, Text, SimpleGrid, Checkbox, SegmentedControl, LoadingOverlay, PasswordInput, Divider, Flex } from "@mantine/core";
import { AddSocketListener, SendMessage } from "./misc/WebSocket";
import { customLoader } from "../styles/LogIn.style";
import { defaults_intents, setteable_intents } from "./misc/Enums";
import { intentsLayoutScheme } from "./misc/Enums";
import { ProfileSection } from "./misc/ProfileSection"


// login Form at the start of the app interaction
export const LogIn = () => {
    const [modalOpened, setModalOpened] = useState(true);
    const [tokenTextError, setTokenTextError] = useState(false);
    const [intentsLayout, setIntentsLayout] = useState("default");
    const [isLoading, setLoading] = useState(false);
    const tokenInput = useRef();
    const [intents, setIntents] = useState(defaults_intents);
    


    useEffect(() => {

        // Bot login successfully
        AddSocketListener("confirm_auth", () => {
            if(modalOpened) setModalOpened(false);
        })


        // Bot didn't login
        AddSocketListener("deny_auth", (data) => {
            var errorMessages = {
                "Error [DisallowedIntents]":"Server didn't allow to use those intents. Try with less intents",
                "Error [TokenInvalid]":"Server didn't recognize the token"
            }

            if(!modalOpened) return
            setLoading(false)
            setTokenTextError(errorMessages[data.reason])
            tokenInput.current.value = ""
        })
        
        // Bot already logged in
        AddSocketListener("already_login", () => {
            if(modalOpened) setModalOpened(false);
        })

    })


    // Login Button
    const handleSubmitClick = () => {
        setTokenTextError(false)
        setLoading(true)
        
        SendMessage("auth", {
            token:tokenInput.current.value.trim(),
            intents:intents
        })
    }


    // On Checkbox change, updates the list
    const handleIntentCheckChange = (intentName) => {
        var newIntents = { ...intents}
        newIntents[intentName] = !intents[intentName]
        setIntents(newIntents)
    }


    // On Checkbox layout change, check the correct intents
    const handleChangeIntentsLayout = (layoutName) => {
        var newIntents = { ...intents}
        setIntentsLayout(layoutName)

        switch (layoutName) {
            case "minimum":
                for(const key in newIntents) { newIntents[key] = false}
                newIntents.Guilds = true
                break;
        
            case "all":
                for(const key in newIntents) { newIntents[key] = true}
                break;

            case "defaultdisabled":
                for(const key in newIntents) { 
                    if(setteable_intents.includes(key)) newIntents[key] = false 
                    else newIntents[key] = true
                }
                break;

            case "default":
                newIntents = defaults_intents
                break;
        }
        setIntents(newIntents)
    }


    // On Enter btn, login the bot
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') handleSubmitClick()
    }


    // Creates all the checkboxes elements
    const intentCheckboxes = []
    for(const intentName in defaults_intents){
        if(intentName === "Guilds") {
            intentCheckboxes.push(<Checkbox key={intentName} checked={intents.Guilds} readOnly color="teal" label={<Text color="teal">{intentName}</Text>}/>)
        } else if(setteable_intents.includes(intentName)) {
            intentCheckboxes.push(<Checkbox key={intentName} checked={intents[intentName]} color="yellow" onChange={()=>handleIntentCheckChange(intentName)} label={<Text color="yellow">{intentName}</Text>} />)
        } else {
            intentCheckboxes.push(<Checkbox key={intentName} checked={intents[intentName]} color="indigo" onChange={()=>handleIntentCheckChange(intentName)} label={intentName}  />)
        }
    }

    
    
    return (
        <Modal
            opened={modalOpened}
            title="Setting Up"
            size={1000}
            overlayBlur={3}
            withCloseButton={false}
            closeOnEscape={false}
            centered
            closeButtonLabel={false}
            closeOnClickOutside={false}
            onKeyDown={handleKeyDown}
            sx={{height:"100%", overflow:"hidden"}}
            onClose={() => setModalOpened(false)}
        >
            <Flex justify={"space-between"}>

                <Box w="30%">
                    <ProfileSection isLoading={isLoading} input={tokenInput} intents={intentsLayout} setIntents={handleChangeIntentsLayout}/>
                </Box>

                <Divider orientation="vertical" />

                <Box w="67%">
                    <LoadingOverlay visible={isLoading} overlayBlur={2} loader={customLoader} />
                    <PasswordInput label="Bot Token" placeholder="Ntg3K2lm..." required ref={tokenInput} error={tokenTextError} disabled={isLoading} />

                    <Box my={10}>
                        <Text mb={5}> Intents </Text>
                        <SegmentedControl fullWidth radius={"sm"} color="indigo" value={intentsLayout} onChange={handleChangeIntentsLayout} disabled={isLoading} data={intentsLayoutScheme} />

                        <SimpleGrid cols={2} mt={10}>
                            {intentCheckboxes}
                        </SimpleGrid>
                    </Box>

                    <Button fullWidth onClick={handleSubmitClick} disabled={isLoading} mt={10} bg={isLoading ? "#3946D3" : "#5865F2"}> Set Up Bot </Button>
                </Box>
            </Flex>
        </Modal>
    );
};