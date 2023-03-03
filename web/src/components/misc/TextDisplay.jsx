import { Flex, Text, useMantineTheme } from "@mantine/core";

export const TextDisplay = ({ label, value}) => {
    const theme = useMantineTheme()

    return (
        <Flex
            direction="column"
            align="center"
            justify="space-around"
            w="46%"
            h="4rem"
            bg={theme.colors.dark[6]}
            style={{
                borderRadius: 5,
                border:`1px solid ${theme.colors.dark[4]}`
            }}
        >
            <Text weight="bold">{label}</Text>
            <Text> {value} </Text>
        </Flex>
    );
};
