import { ScrollArea, SimpleGrid, TextInput } from "@mantine/core"
import { useStyles } from "../../../styles/Pages.style"


export const UsersTab = () => {
    const {classes} = useStyles()
    

    return (
        <ScrollArea type="auto" className={classes.scroll}>
            <SimpleGrid cols={2} spacing={40} verticalSpacing={5}>
                <TextInput label="Initializated At" readOnly className={classes.text_input}/>
                <TextInput label="Initializated At" readOnly className={classes.text_input}/>
                <TextInput label="Initializated At" readOnly className={classes.text_input}/>
                <TextInput label="Initializated At" readOnly className={classes.text_input}/>
            </SimpleGrid>
        </ScrollArea>
    )
}