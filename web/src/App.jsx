import { useState } from "react";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { Settings } from "./components/Settings"
import { Content } from "./components/Content";

export const App = () => {
    // Colortheme manager
    // Maybe we will do something with this in the future, but not for now.
    const [colorScheme, setColorScheme] = useState("dark");
    const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    // Creates mantine theme base
    const theme = { 
        colorScheme: colorScheme,
        colors: { discord: ["#5865F2","#57F287","#FEE75C","#EB459E","#ED4245"] },
        primaryColor: 'discord',
    }

    // Mantine wrapper
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
                <Settings />
                <Content />
			</MantineProvider>
        </ColorSchemeProvider>
    );
};
