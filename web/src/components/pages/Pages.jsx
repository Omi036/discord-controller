import { useState } from "react"
import { Tabs } from "@mantine/core"
import { ClientPage } from "./Client/Page"
import { ServerPage } from "./Servers/Page"
import { MessagesPage } from "./Messages/Page"
import { UsersPage } from "./Users/Page"
import { CommandsPage } from "./Commands/Page"


export const Pages = ({ currentPage, setCurrentPage }) => {
    const [ msgDestiny, setMsgDestiny ] = useState()

    return (
        <Tabs value={currentPage} w="100%">
            <Tabs.Panel value="Client"><ClientPage /></Tabs.Panel>
            <Tabs.Panel value="Servers"><ServerPage currentPage={currentPage} setMsgDestiny={setMsgDestiny} setCurrentPage={setCurrentPage}/></Tabs.Panel>
            <Tabs.Panel value="Messages"><MessagesPage currentPage={currentPage} msgDestiny={msgDestiny} setMsgDestiny={setMsgDestiny} setCurrentPage={setCurrentPage} /></Tabs.Panel>
            <Tabs.Panel value="Users"><UsersPage setMsgDestiny={setMsgDestiny} setCurrentPage={setCurrentPage} /></Tabs.Panel>
            <Tabs.Panel value="Commands"><CommandsPage currentPage={currentPage} /></Tabs.Panel>
        </Tabs>
    )
}