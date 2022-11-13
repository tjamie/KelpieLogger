import { StyleSheet } from "react-native";

export const colors = {
    darkGreen: "#345716",
    paleGreen: "#e1f2d3",
    gray: "#bdbdbd"
};

const primaryBackground = "#eee";
const secondaryBackground = colors.darkGreen;
const tertiaryBackground = colors.paleGreen;
const quaternaryBackground = "#d1e6c1";
const primaryText = "#080d03";
const secondaryText = "#555555";

export const styles = StyleSheet.create({
    buttonMain: {
        borderColor: secondaryBackground,
        borderWidth: 2,
        backgroundColor: primaryBackground
    },
    buttonMainText: {
        color: secondaryBackground
    },
    buttonSecondary: {
        borderColor: "#f00",
        borderWidth: 2,
        backgroundColor: primaryBackground
    },
    buttonSecondaryText: {
        color: "#f00"
    },
    checkBoxContainer: {
        backgroundColor: primaryBackground
    },
    divider: {
        padding: 4
    },
    drawerHeader: {
        height: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    drawerHeaderText: {
        fontSize: 24
    },
    stackNavHeader: {
        backgroundColor: secondaryBackground
    },
    homeContainer: {
        flex: 1,
        flexDirection: "column",
        padding: 8,
        backgroundColor: tertiaryBackground
    },
    homeLogoText: {
        fontSize: 36,
        textAlign: "center",
        color: primaryText
    },
    homeView: {
        padding: 16
    },
    homeText: {
        fontSize: 16,
        textAlign: "center",
        color: primaryText
    },
    listHeadContainer: {
        backgroundColor: primaryBackground,
        borderColor: secondaryBackground,
        borderWidth: 2,
        marginBottom: -1
    },
    listContainer: {
        backgroundColor: primaryBackground,
        borderColor: secondaryBackground,
        borderWidth: 2,
        borderBottomWidth: 2,
        marginBottom: -1,
        marginTop: -1
    },
    listPrimaryText: {
        color: primaryText
    },
    listSecondaryText: {
        color: secondaryText
    },
    projectContainer: {
        flex: 1,
        flexDirection: "column",
        padding: 4,
        backgroundColor: primaryBackground
    },
    projectHeaderText: {
        fontSize: 18,
        color: primaryText
    },
    projectInfoText: {
        fontSize: 12,
        color: primaryText,
        fontStyle: "italic"
    },
    projectText: {
        fontSize: 16,
        fontWeight: "normal",
        color: primaryText
    },
    sectionContainer: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: secondaryBackground,
        padding: 5,
        marginTop: 5,
        marginBottom: 5
    },
    sectionHeader: {
        paddingTop: 16,
        paddingBottom: 16
    },
    subsectionContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: secondaryBackground,
        padding: 2,
        marginTop: 2,
        marginBottom: 2
    },
    subsectionContainerExpanded: {
        borderWidth: 1,
        borderColor: secondaryBackground,
        backgroundColor: tertiaryBackground,
        padding: 8,
        paddingLeft: 12,
        marginTop: 8,
        marginBottom: 8
    },
    subsectionHeader: {
        paddingTop: 8,
        paddingBottom: 8
    },
    subsectionListHeadContainer: {
        backgroundColor: primaryBackground,
        borderColor: secondaryBackground,
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    subsectionListContainer: {
        backgroundColor: primaryBackground,
        borderColor: secondaryBackground,
        borderBottomWidth: 1
    },
    swipeBackground: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 1,
        backgroundColor: tertiaryBackground
    },
    swipeDelete: {
        backgroundColor: "red",
        height: "100%",
        justifyContent: "center"
    }
});
