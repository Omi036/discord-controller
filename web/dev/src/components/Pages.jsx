import { Tabs } from "@mantine/core"


export const Pages = ({ page }) => {

    return (
        <Tabs value={page}>
            <Tabs.Panel value="Client">a</Tabs.Panel>
            <Tabs.Panel value="Servers">b</Tabs.Panel>
            <Tabs.Panel value="Channels">c</Tabs.Panel>
            <Tabs.Panel value="Messages">d</Tabs.Panel>
            <Tabs.Panel value="Users">e</Tabs.Panel>
            <Tabs.Panel value="Commands">f</Tabs.Panel>
            <Tabs.Panel value="Misc">g</Tabs.Panel>
        </Tabs>
    )
}