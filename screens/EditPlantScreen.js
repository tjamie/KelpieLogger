import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Input, CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { enforceNumeric } from "../utils/enforceNumeric";
import { DeviceEventEmitter } from "react-native";
import { styles, colors } from "../styles";

const EditPlantScreen = ({ navigation, route }) => {
    const { plant } = route.params;
    const [tempPlant, setTempPlant] = useState(plant);

    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", () => {
            DeviceEventEmitter.removeAllListeners("updatePlantData");
            // console.log("listener removed");
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        DeviceEventEmitter.emit("updatePlantData", tempPlant);
        // console.log("useEffect triggered");
    }, [tempPlant]);

    return (
        <View style={styles.projectContainer}>
            <View>
                <Text style={styles.projectText}>Species</Text>
                <Input
                    onChangeText={(species) =>
                        setTempPlant({
                            ...tempPlant,
                            species: species
                        })
                    }
                    value={tempPlant.species}
                />
            </View>
            <View>
                <Text style={styles.projectText}>Percent Absolute Cover</Text>
                <Input
                    keyboardType="numeric"
                    onChangeText={(cover) =>
                        setTempPlant({
                            ...tempPlant,
                            cover: enforceNumeric(cover)
                        })
                    }
                    value={tempPlant.cover ? tempPlant.cover.toString() : ""}
                />
            </View>
            <View>
                <Text style={styles.projectText}>Indicator Status</Text>
                <Picker
                    selectedValue={tempPlant.indicator}
                    onValueChange={(indicator) => {
                        setTempPlant({
                            ...tempPlant,
                            indicator: indicator
                        });
                    }}
                >
                    <Picker.Item label="-" value="" />
                    <Picker.Item label="OBL" value="OBL" />
                    <Picker.Item label="FACW" value="FACW" />
                    <Picker.Item label="FAC" value="FAC" />
                    <Picker.Item label="FACU" value="FACU" />
                    <Picker.Item label="UPL" value="UPL" />
                </Picker>
            </View>
            <CheckBox
                title="Dominant?"
                containerStyle={styles.checkBoxContainer}
                textStyle={styles.projectText}
                checkedColor={colors.darkGreen}
                checked={tempPlant.dominant}
                onPress={() => {
                    setTempPlant({
                        ...tempPlant,
                        dominant: !tempPlant.dominant
                    });
                }}
            />
        </View>
    );
};

export default EditPlantScreen;
