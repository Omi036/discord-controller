import { ScrollArea, SimpleGrid, TextInput,  Checkbox, Box } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { ImageDisplay } from "../../misc/ImageDisplay"
import { TextDisplay } from "../../misc/TextDisplay"
import { useEffect, useState } from "react"
import { AddSocketListener } from "../../misc/WebSocket"


export const GeneralTab = () => {
    const {classes} = useStyles()
    const [data, setData] = useState({
        users: 0,
        channels: 0,
        roles: 0,
        bans: 0,
        commands: 0,
        invites: 0,
        emojis: 0,
        stickers: 0,
        isVerified: false,
        isPartenered: false,
        name: "Dummy",
        description: "You haven't selected a server yet",
        id:"000000000000000000",
        owner:"Dummy#0000",
        iconUrl:"",
        language:"",
        createdAt:"",
        joinedAt:"",
        verificationLevel: 0,
        boostTier: 0,
        explicitFilter: 0,
        nsfwLevel: 0
    })

    useEffect(() => {
        AddSocketListener("server_data", (data) => {
            setData({...data})
        })
    })

    return (
        <ScrollArea type="auto" style={{height:"90vh"}} className={classes.scroll}>
            <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginBottom:10}}>
                <TextDisplay label="Users" value={data.users} />
                <TextDisplay label="Channels" value={data.channels} />
            </Box>
            <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginBottom:10}}>
                <TextDisplay label="Roles" value={data.roles} />
                <TextDisplay label="Bans" value={data.bans} />
            </Box>
            <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginBottom:10}}>
                <TextDisplay label="Commands" value={data.commands} />
                <TextDisplay label="Invites" value={data.invites} />
            </Box>
            <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginBottom:10}}>
                <TextDisplay label="Emojis" value={data.emojis} />
                <TextDisplay label="Stickers" value={data.stickers} />
            </Box>
            <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                <Checkbox label="Server is Verifired" color="indigo" readOnly style={{ marginBottom: 10, fontSize: 16 }} checked={data.isVerified}/>
                <Checkbox label="Server is Partnered" color="indigo" readOnly style={{ marginBottom: 10, fontSize: 16 }} checked={data.isPartenered}/>
            </ SimpleGrid>
            <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                <TextInput label="Name" readOnly className={classes.text_input} value={data.name}/>
                <TextInput label="Description" readOnly className={classes.text_input} value={data.description}/>
                <TextInput label="Id" readOnly className={classes.text_input} value={data.id}/>
                <TextInput label="Owner" readOnly className={classes.text_input} value={data.owner}/>
                <ImageDisplay label="Icon Url" value={data.iconUrl} />
                <TextInput label="Language" readOnly className={classes.text_input} value={data.language}/>
                <TextInput label="Created At" readOnly className={classes.text_input} value={data.createdAt}/>
                <TextInput label="Joined At" readOnly className={classes.text_input} value={data.joinedAt}/>
                <TextInput label="Verification Level" readOnly className={classes.text_input} value={data.verificationLevel}/>
                <TextInput label="Boost Tier" readOnly className={classes.text_input} value={data.boostTier}/>
                <TextInput label="Explicit Content Filter" readOnly className={classes.text_input} value={data.explicitFilter}/>
                <TextInput label="NSFW Level" readOnly className={classes.text_input} value={data.nsfwLevel}/>
            </SimpleGrid>
        </ScrollArea>
    )
}