import { View } from "react-native";
import { Text, ScrollView } from "react-native";
import { styles } from "../styles";
// import { StyleSheet } from "react-native";

const HomeScreen = () => {
    return (
        <View style={styles.homeContainer}>
            <View style={styles.homeView}>
                <Text style={styles.homeLogoText}>KelpieLogger</Text>
            </View>
            <View style={styles.homeView}>
                <Text style={styles.homeText}>Welcome to KelpieLogger!</Text>
            </View>
            <View style={styles.homeView}>
                <Text style={styles.homeText}>
                    This tool has been constructed to record data used in the identification of Waters of the United
                    States.
                </Text>
            </View>
            <View style={styles.homeView}>
                <Text style={styles.homeText}>
                    To get started, swipe right from the left side of the screen to navigate to your projects screen.
                </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Text style={{ textAlign: "center", fontStyle: "italic", color: "#666" }}>
                    Please note that this tool is undergoing active development. Do not use this as your only means of
                    storing data.
                </Text>
            </View>
        </View>
    );
};

export default HomeScreen;
