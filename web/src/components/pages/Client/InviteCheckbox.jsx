import { Checkbox } from "@mantine/core";

// Every Single Checkbox from the bot invite modal
export const InviteCheckbox = ({property, permissions, setPermissions}) => {

    // On checkbox click, will update the master object
    const handleClick = () => {
        const new_permissions = {...permissions}
        new_permissions[property] = !new_permissions[property]
        setPermissions(new_permissions)
    }

    return <Checkbox color={"indigo"} checked={permissions[property]} onChange={handleClick} label={property} />
}