import { useState } from "react"
import { Sidebar } from "./Sidebar"
import { Pages } from "./pages/Pages"
import { Box } from "@mantine/core"

// Main Component
export const Content = () => {
    const [currentPage, setCurrentPage] = useState("Client")

    return (
        <Box pos="relative" sx={{display:"flex", zIndex:0}}>

            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <Pages currentPage={currentPage} setCurrentPage={setCurrentPage}/>

        </Box>
    )
}