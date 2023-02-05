import { useState } from "react"
import { Sidebar } from "./Sidebar"
import { Pages } from "./pages/Pages"
import { Box } from "@mantine/core"

// Main Component
export const Content = () => {
    const [page, setPage] = useState("Client")

    return (
        <Box sx={{display:"flex", zIndex:0, position:"relative"}}>
            <Sidebar setPage={setPage} />
            <Pages page={page}/>
        </Box>
    )
}