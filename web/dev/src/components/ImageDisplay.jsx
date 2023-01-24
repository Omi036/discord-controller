import { TextInput, Modal, Image} from '@mantine/core'
import { useStyles } from "./styles/Pages.style"
import { IconEye } from '@tabler/icons'
import { useState } from 'react'

export const ImageDisplay = ({label, value}) => {
    const [ opened, setOpened ] = useState(false)
    const {classes} = useStyles()

    return (
        <>
        <Modal
        title={label}
        opened={opened}
        onClose={() => setOpened(false)}
        >
            <Image src={value} />
        </Modal>
        <TextInput label={label} readOnly className={classes.text_input} value={value} rightSection={<IconEye size={20} onClick={() => setOpened(true)}style={{cursor:"pointer"}}/>}/>
        </>
    )
}