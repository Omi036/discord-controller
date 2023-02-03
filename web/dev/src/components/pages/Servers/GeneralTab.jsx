import { ScrollArea, SimpleGrid, TextInput,  Checkbox, Box } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"
import { ImageDisplay } from "../../misc/ImageDisplay"
import { TextDisplay } from "../../misc/TextDisplay"


export const GeneralTab = () => {
    const {classes} = useStyles()
    

    return (
        <ScrollArea type="auto" style={{height:"90vh"}} className={classes.scroll}>
            <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginBottom:10}}>
                <TextDisplay label="Users" value={0} />
                <TextDisplay label="Channels" value={0} />
            </Box>
            <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginBottom:10}}>
                <TextDisplay label="Roles" value={0} />
                <TextDisplay label="Bans" value={0} />
            </Box>
            <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginBottom:10}}>
                <TextDisplay label="Commands" value={0} />
                <TextDisplay label="Invites" value={0} />
            </Box>
            <Box style={{display:"flex", flexDirection:"row", width: "100%", justifyContent: "space-around", marginBottom:10}}>
                <TextDisplay label="Emojis" value={0} />
                <TextDisplay label="Stickers" value={0} />
            </Box>
            <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                <Checkbox label="Server is Verifired" color="indigo" readOnly style={{ marginBottom: 10, fontSize: 16 }} checked={false}/>
                <Checkbox label="Server is Partnered" color="indigo" readOnly style={{ marginBottom: 10, fontSize: 16 }} checked={false}/>
            </ SimpleGrid>
            <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                <TextInput label="Name" readOnly className={classes.text_input}/>
                <TextInput label="Description" readOnly className={classes.text_input}/>
                <TextInput label="Id" readOnly className={classes.text_input}/>
                <TextInput label="Owner" readOnly className={classes.text_input}/>
                <ImageDisplay label="Icon Url" value={""} />
                <TextInput label="Language" readOnly className={classes.text_input}/>
                <TextInput label="Created At" readOnly className={classes.text_input}/>
                <TextInput label="Joined At" readOnly className={classes.text_input}/>
                <TextInput label="Verification Level" readOnly className={classes.text_input}/>
                <TextInput label="Boost Tier" readOnly className={classes.text_input}/>
                <TextInput label="Explicit Content Filter" readOnly className={classes.text_input}/>
                <TextInput label="NSFW Level" readOnly className={classes.text_input}/>
            </SimpleGrid>
        </ScrollArea>
    )
}