import { Checkbox } from "@mantine/core";


export const InviteCheckbox = ({property, permissions, setPermissions}) => {


    const handleClick = () => {
        const new_permissions = {...permissions}
        new_permissions[property] = !new_permissions[property]
        setPermissions(new_permissions)
    }

    return <Checkbox color="indigo" checked={permissions[property]} onChange={handleClick} label={property} />
}