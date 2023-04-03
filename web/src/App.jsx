import { useState } from "react";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { LogIn } from "./components/LogIn"
import { Content } from "./components/Content";

// App Initialization
export const App = () => {
    const [colorScheme, setColorScheme] = useState("dark");
    const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    // Theme for the web 
    const theme = { 
        colorScheme: colorScheme,
        colors: { discord: ["#5865F2","#57F287","#FEE75C","#EB459E","#ED4245"] },
        primaryColor: 'discord',
    }

    // React Structure
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
                <LogIn />
                <Content />
			</MantineProvider>
        </ColorSchemeProvider>
    );
};
