import { useState, useRef, useEffect } from "react" 
import { Button, useMantineTheme, Box, Text, Flex, Modal, TextInput, PasswordInput, SegmentedControl, ColorSwatch, ScrollArea, ActionIcon } from "@mantine/core"
import { intentsLayoutScheme } from "./Enums";
import { CheckIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons"

const Profile = ({ title, description, token, intents, color, input, setIntents, reload }) => {
    const theme = useMantineTheme()

    return (
        <Box sx={{
            border:`1px solid ${theme.colors.dark[4]}`,
            borderRadius:"4px",
            backgroundColor:theme.colors.dark[6],
            boxSizing: "border-box",
            padding: "0 .5rem",
            height: "4rem",
            marginBottom:"10px",
            cursor:"pointer",
            marginRight:"13px",
        }} onClick={() => {
            input.current.value = token
            setIntents(intents)
        }}>
            <Flex h="100%" align="center">
                <Box mr="10px" w="5px" h="90%" bg={theme.colors[color][5]} sx={{borderRadius:5}} ></Box>
                <Box>
                    <Text fz={20} sx={{textOverflow:"ellipsis", width:"14rem",whiteSpace: "nowrap",overflow: "hidden"}}>{title}</Text>
                    <Text fz={15} sx={{textOverflow:"ellipsis", width:"14rem",whiteSpace: "nowrap",overflow: "hidden", color:theme.colors.gray[6]}} >{description}</Text>
                </Box>
                <Box w="10px" h="100%" >
                    <ActionIcon ml="auto" p={3} onClick={() => {
                        var profiles = JSON.parse(localStorage.getItem("profiles"))
                        profiles = profiles.filter(el => { return el.token != token; });
                        localStorage.setItem("profiles", JSON.stringify(profiles))
                        reload()
                    }}>
                        <IconTrash color={theme.colors.dark[4]} stroke={1.5} />
                    </ActionIcon>
                </Box>
            </Flex>
        </Box>
    )
}


const CreateProfileModal = ({ opened, setIntents, setOpened, reload }) => {
    const theme = useMantineTheme()
    const tokenInput = useRef()
    const titleInput = useRef()
    const descriptionInput = useRef()
    const [ intentsLayout, setIntentsLayout ] = useState("default")
    const [ profileColor, setProfileColor ] = useState("dark")

    const swatches_colors = Object.keys(theme.colors)
    swatches_colors.pop()
    const swatches = swatches_colors.map((color) => (
        <ColorSwatch size={20} key={color} color={theme.colors[color][6]} onClick={() =>setProfileColor(color)} sx={{cursor:"pointer"}}>
            { color === profileColor && <CheckIcon width={10} />}
        </ColorSwatch>
    ));


    const createNewProfile = () => {
        if(!titleInput.current.value) return

       const profiles_list = JSON.parse(localStorage.getItem("profiles") ?? "[]")

       const new_profile = {
            title: titleInput.current.value,
            description: descriptionInput.current.value,
            token: tokenInput.current.value,
            intents: intentsLayout,
            color: profileColor
       }

       profiles_list.push(new_profile);
       localStorage.setItem("profiles", JSON.stringify(profiles_list));
       setOpened(false)
       reload()
    }


    return (
        <Modal opened={opened} onClose={() => setOpened(false)} title="Set Up New Profile">
            <TextInput label="Title" required ref={titleInput}/>
            <TextInput label="Description" ref={descriptionInput}/>
            <PasswordInput label="Bot Token" placeholder="Ntg3K2lm..." required ref={tokenInput} />
            <Text my={5}> Intents </Text>
            <SegmentedControl fullWidth radius="sm" color="indigo" value={intentsLayout} onChange={setIntentsLayout} data={intentsLayoutScheme} />
            <Text my={5}> Color </Text>
            <Flex direction="row" justify="space-around" mt={5}>
                {swatches}
            </Flex>
            <Button mt={10} fullWidth bg="#5865F2" onClick={createNewProfile}>Create New Profile</Button>
        </Modal>
    )
}


export const ProfileSection = ({ isLoading, input, intents, setIntents }) => {
    const [ modalOpened, setModalOpened ] = useState(false)
    const [ profiles, setProfiles ] = useState([])

    const reloadProfiles = () => {

        setProfiles(JSON.parse(localStorage.getItem("profiles") ?? "[]").map(profile => (<Profile
            title={profile.title} 
            description={profile.description}
            token={profile.token}
            intents={profile.intents} 
            key={profile.token + profile.title}
            input={input}
            setIntents={setIntents}
            reload={reloadProfiles}
            color={profile.color} />
        )))
    }

    useEffect(() => {
        reloadProfiles()
    }, [])


    return (
        <>
            <CreateProfileModal opened={modalOpened} setOpened={setModalOpened} setIntents={setIntents} reload={reloadProfiles}/>
            <Button mb={10} fullWidth disabled={isLoading} bg={isLoading ? "#3946D3" : "#5865F2"} onClick={()=>setModalOpened(true)}>Create New Profile</Button>
            <ScrollArea type="auto" h="500px" pt={10} style={{boxSizing:"border-box"}}>
                { profiles }
            </ScrollArea>
        </>
    )
}