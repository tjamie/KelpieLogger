import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { DeviceEventEmitter } from "react-native";
import { styles } from "../styles";

const IndicatorsList = (props) => {
    const { navigation, tempDatapoint, setTempDatapoint, medium, indicatorType, name } = props;

    return (
        <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flex: 2 }}>
                    <Text style={styles.projectText}>{name}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        title="Edit"
                        onPress={() => {
                            DeviceEventEmitter.addListener("updateIndicatorData", (tempIndicators) => {
                                //tempIndicators should be an array
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    [medium]: {
                                        ...tempDatapoint[medium],
                                        [indicatorType]: tempIndicators
                                    }
                                });
                            });
                            navigation.navigate("EditIndicators", { medium, indicatorType, tempDatapoint });
                        }}
                        buttonStyle={styles.buttonMain}
                        titleStyle={styles.buttonMainText}
                    />
                </View>
            </View>
            <View style={{ paddingLeft: 8 }}>
                {tempDatapoint[medium][indicatorType].length > 0 ? (
                    tempDatapoint[medium][indicatorType].map((item, index) => {
                        return (
                            <Text key={index} style={styles.projectText}>
                                {item}
                            </Text>
                        );
                    })
                ) : (
                    <Text style={styles.projectText}>No indicators selected.</Text>
                )}
            </View>
        </View>
    );
};

export default IndicatorsList;
