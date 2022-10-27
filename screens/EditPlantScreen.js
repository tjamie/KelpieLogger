import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ListItem, Button, Input, CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { enforceNumeric } from "../utils/enforceNumeric";

const EditPlantScreen = ({ route }) => {
    const { plant, stratum, tempDatapoint, setTempDatapoint } = route.params;
    const [tempPlant, setTempPlant] = useState(plant);

    const tempArr = tempDatapoint.vegetation.strata[stratum];
    // console.log("tempArr: ", tempArr);

    // triggers on plant update
    useEffect(() => {
        const newStratumArr = tempArr.map((obj) => {
            if (obj.id === tempPlant.id) {
                return tempPlant;
            }
            return obj;
        });

        setTempDatapoint({
            ...tempDatapoint,
            vegetation: {
                ...tempDatapoint.vegetation,
                strata: {
                    ...tempDatapoint.vegetation.strata,
                    [stratum]: newStratumArr
                }
            }
        });
    }, [tempPlant]);

    return (
        <View>
            <View>
                <Text>Species</Text>
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
                <Text>Percent Absolute Cover</Text>
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
                <Text>Indicator Status</Text>
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
            <CheckBox
                title="Dominant?"
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
