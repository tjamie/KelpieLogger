import { View } from "react-native";
import { Text } from "react-native";
import { styles } from "../styles";
import Constants from "expo-constants";

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
                    This tool was constructed to record data used in the identification of Waters of the United
                    States.
                </Text>
            </View>
            <View style={styles.homeView}>
                {/* Altering this text until gestures are fixed */}
                <Text style={styles.homeText}>
                    To get started, tap the home icon to navigate to your projects screen.
                </Text>
                {/* <Text style={styles.homeText}>
                    To get started, swipe right from the left side of the screen to navigate to your projects screen.
                </Text> */}
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Text style={{ textAlign: "center", fontStyle: "italic", color: "#666" }}>
                    Version {Constants.manifest.version}
                </Text>
                <Text style={{ textAlign: "center", fontStyle: "italic", color: "#666" }}>
                    Please note that this tool is undergoing active development. Do not use this as your only means of
                    storing data.
                </Text>
            </View>
        </View>
    );
};

export default HomeScreen;
