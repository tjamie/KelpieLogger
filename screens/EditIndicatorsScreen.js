import { ScrollView, View, Text } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CheckBox } from "react-native-elements";
import { DeviceEventEmitter } from "react-native";
import { getProjectById } from "../reducers/projectsReducer";
import { styles, colors } from "../styles";
import * as hydrologyIndicators from "../data/hydrologyIndicators.json";
import * as soilIndicators from "../data/soilIndicators.json";

const EditIndicatorsScreen = ({ route }) => {
    const { medium, indicatorType, tempDatapoint } = route.params;
    const [tempIndicators, setTempIndicators] = useState(tempDatapoint[medium][indicatorType]);

    const activeProject = useSelector(getProjectById(tempDatapoint.projectId));
    console.log(activeProject);
    const region = activeProject.projectRegion;

    useEffect(() => {
        DeviceEventEmitter.emit("updateIndicatorData", tempIndicators);
    }, [tempIndicators]);

    useEffect(() => {
        // remove listener on unmount
        return () => {
            DeviceEventEmitter.removeAllListeners("updateIndicatorData");
        };
    }, []);

    const indicatorsSourceList = (medium) => {
        if (medium === "hydrology") {
            return hydrologyIndicators;
        } else if (medium === "soil") {
            return soilIndicators;
        }
        return [];
    };

    const RenderIndicatorItem = ({ item: indicator }) => {
        return (
            <CheckBox
                title={indicator}
                textStyle={styles.projectText}
                containerStyle={styles.checkBoxContainer}
                checkedColor={colors.darkGreen}
                checked={tempIndicators.includes(indicator)}
                onPress={() => {
                    tempIndicators.includes(indicator)
                        ? setTempIndicators(tempIndicators.filter((element) => element != indicator))
                        : setTempIndicators([...tempIndicators, indicator]);
                }}
            />
        );
    };

    return (
        <ScrollView style={styles.projectContainer}>
            {indicatorsSourceList(medium)[region] && indicatorsSourceList(medium)[region][indicatorType] ? (
                indicatorsSourceList(medium)[region][indicatorType].map((item, index) => {
                    return (
                        <View key={index}>
                            <RenderIndicatorItem item={item} />
                        </View>
                    );
                })
            ) : (
                <View>
                    <Text>Indicators for the region {region} have not been implemented.</Text>
                </View>
            )}
        </ScrollView>
    );
};

export default EditIndicatorsScreen;
