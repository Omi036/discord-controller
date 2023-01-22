import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
    return {
        parent: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "100vh",
            width: "100%",
        },

        papers: {
            height: "94vh",
            width: "30%",
            backgroundColor: theme.colors.dark[6],
            overflow: "hidden",
        },

        paper_header: {
            borderBottom: `2px solid ${theme.colors.dark[7]}`,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "5vh",
            backgroundColor: theme.colors.discord[0],
        },

        app_icon: {
            marginLeft: 10,
            marginRight: 5
        },

        scroll: {
            height:"100%",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center"
        },

        text_input: {
            width: "90%",
            margin: "0 auto",
            marginBottom: 5,
            marginTop: 5
        }
    };
});
