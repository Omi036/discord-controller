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

        paperswidth: {
            height: "94vh",
            width: "63%",
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
            marginRight: 5,
        },

        scroll: {
            height: "96%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            padding: 20,
        },

        hbox: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
        },

        text_input: {
            width: "100%",
            margin: "0 auto",
            marginBottom: 5,
            marginTop: 5,
        },

        button_input: {
            margin: "0 auto",
            marginBottom: 5,
            marginTop: 20,
        },

        sv_profile: {
            width: "100%",
            overflow: "hidden",
            border: `1px solid ${theme.colors.dark[4]}`,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            boxSizing: "border-box",
            padding: 10,
            borderRadius: 5,
            marginBottom: 15,
            backgroundColor: "transparent",
            cursor:"pointer",

            "&:hover":{
                backgroundColor: theme.colors.dark[5],
                border: `1px solid ${theme.colors.dark[3]}`,
            }
        },

        sv_profile_active: {
            width: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            boxSizing: "border-box",
            padding: 10,
            borderRadius: 5,
            marginBottom: 15,
            cursor:"pointer",
            backgroundColor:theme.colors.dark[4],
            border: `1px solid ${theme.colors.dark[3]}`
        }
    };
});
