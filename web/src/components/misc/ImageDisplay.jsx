import { TextInput, ActionIcon, Modal, Image} from '@mantine/core'
import { useStyles } from "../../styles/Pages.style"
import { IconEye } from '@tabler/icons'
import { useState } from 'react'

export const ImageDisplay = ({label, value}) => {
    const [ opened, setOpened ] = useState(false)
    const {classes} = useStyles()

    // The eye button showed at the right side of the input
    const SideButton = (
        <ActionIcon>
            <IconEye size={15} onClick={() => setOpened(true)}style={{cursor:"pointer"}}/>
        </ActionIcon>
    )

    return (
        <>
        <Modal
        title={label}
        opened={opened}
        onClose={() => setOpened(false)}
        >
            <Image src={value} />
        </Modal>
        <TextInput label={label} readOnly className={classes.text_input} value={value} rightSection={SideButton}/>
        </>
    )
}