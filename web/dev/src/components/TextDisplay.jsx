import { Box, Text } from "@mantine/core";

export const TextDisplay = ({ label, value }) => {
    return (
        <Box
            sx={(theme) => ({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                width: "46%",
                height: "4rem",
                backgroundColor: theme.colors.dark[6],
                borderRadius: 5,
                border:`1px solid ${theme.colors.dark[4]}`
            })}
        >
            <Text style={{fontWeight:"bold"}}>{label}</Text>
            <Text>{value}</Text>
        </Box>
    );
};
