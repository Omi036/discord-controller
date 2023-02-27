import { useState } from "react"
import { Tabs } from "@mantine/core"
import { ClientPage } from "./Client/Page"
import { ServerPage } from "./Servers/Page"
import { MessagesPage } from "./Messages/Page"
import { UsersPage } from "./Users/Page"
import { CommandsPage } from "./Commands/Page"

// Pages renderer
export const Pages = ({ page, setPage }) => {
    const [ msgDestiny, setMsgDestiny ] = useState()

    return (
        <Tabs value={page} style={{width: '100%'}}>
            <Tabs.Panel value="Client"><ClientPage page={page}/></Tabs.Panel>
            <Tabs.Panel value="Servers"><ServerPage page={page} setMsgDestiny={setMsgDestiny} setPage={setPage}/></Tabs.Panel>
            <Tabs.Panel value="Messages"><MessagesPage page={page} msgDestiny={msgDestiny} setMsgDestiny={setMsgDestiny} setPage={setPage} /></Tabs.Panel>
            <Tabs.Panel value="Users"><UsersPage page={page} setMsgDestiny={setMsgDestiny} setPage={setPage} /></Tabs.Panel>
            <Tabs.Panel value="Commands"><CommandsPage page={page} setPage={page} /></Tabs.Panel>
        </Tabs>
    )
}