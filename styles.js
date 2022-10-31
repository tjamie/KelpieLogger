import { StyleSheet } from "react-native";

const primaryBackground = "#d0f2b3";
// const secondaryBackground = "#0f200f";
const secondaryBackground = "#345716";
const primaryText = "#080d03";

export const styles = StyleSheet.create({
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
        backgroundColor: primaryBackground
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
    }
});
