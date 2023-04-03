import { ScrollArea, SimpleGrid, TextInput,  Checkbox, Box, LoadingOverlay, Flex } from "@mantine/core"
import { useStyles } from "../../../../styles/Pages.style"
import { ImageDisplay } from "../../../misc/ImageDisplay"
import { TextDisplay } from "../../../misc/TextDisplay"
import { useEffect, useState } from "react"
import { AddSocketListener } from "../../../misc/WebSocket"
import { customLoader } from "../../../../styles/LogIn.style"
import { defaultServerInfo } from "../../../misc/Enums"


export const GeneralTab = ({server}) => {
    const {classes} = useStyles()
    const [data, setData] = useState(defaultServerInfo)



    useEffect(() => {
        AddSocketListener("server_data", (data) => {
            setData(data)
        })
    })


    useEffect(() => {
        setData(defaultServerInfo)
    }, [server])


    
    return (
        <ScrollArea type="auto" h="90vh" className={classes.scroll}>
            { data.id === "000000000000000000" && <LoadingOverlay visible overlayBlur={2} loader={customLoader} />}

            <Flex direction="row" w="100%" justify="space-around" mb={10}>
                <TextDisplay label="Users"    value={data.users} />
                <TextDisplay label="Channels" value={data.channels} />
            </Flex>

            <Flex direction="row" w="100%" justify="space-around" mb={10}>
                <TextDisplay label="Roles" value={data.roles} />
                <TextDisplay label="Bans"  value={data.bans} />
            </Flex>

            <Flex direction="row" w="100%" justify="space-around" mb={10}>
                <TextDisplay label="Emojis"   value={data.emojis} />
                <TextDisplay label="Stickers" value={data.stickers} />
            </Flex>

            <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                <Checkbox label="Server is Verifired" color="indigo" readOnly mb={10} fz={16} checked={data.isVerified}/>
                <Checkbox label="Server is Partnered" color="indigo" readOnly mb={10} fz={16} checked={data.isPartenered}/>
            </ SimpleGrid>
            
            <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>

                <TextInput label="Name" readOnly className={classes.text_input} value={data.name}/>
                <TextInput label="Description" readOnly className={classes.text_input} value={data.description}/>
                <TextInput label="Id" readOnly className={classes.text_input} value={data.id}/>
                <TextInput label="Owner" readOnly className={classes.text_input} value={data.owner}/>

                <ImageDisplay label="Icon Url" value={data.iconUrl} />

                <TextInput readOnly label="Language" className={classes.text_input} value={data.language}/>
                <TextInput readOnly label="Created At" className={classes.text_input} value={new Date(data.createdAt)}/>
                <TextInput readOnly label="Joined At"  className={classes.text_input} value={new Date(data.joinedAt)}/>
                <TextInput readOnly label="Verification Level" className={classes.text_input} value={data.verificationLevel}/>
                <TextInput readOnly label="Boost Tier" className={classes.text_input} value={data.boostTier}/>
                <TextInput readOnly label="Explicit Content Filter"  className={classes.text_input} value={data.explicitFilter}/>
                <TextInput readOnly label="NSFW Level" className={classes.text_input} value={data.nsfwLevel}/>

            </SimpleGrid>
        </ScrollArea>
    )
}