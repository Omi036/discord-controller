import { Tabs } from "@mantine/core"
import { ClientPage } from "./pages/Client"


export const Pages = ({ page }) => {

    return (
        <Tabs value={page} style={{width: '100%'}}>
            <Tabs.Panel value="Client"><ClientPage /></Tabs.Panel>
            <Tabs.Panel value="Servers">b</Tabs.Panel>
            <Tabs.Panel value="Channels">c</Tabs.Panel>
            <Tabs.Panel value="Messages">d</Tabs.Panel>
            <Tabs.Panel value="Users">e</Tabs.Panel>
            <Tabs.Panel value="Commands">f</Tabs.Panel>
            <Tabs.Panel value="Misc">g</Tabs.Panel>
        </Tabs>
    )
}