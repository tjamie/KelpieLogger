import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { ListItem, Button, Input, CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { enforceNumeric } from "../utils/enforceNumeric";
import { clamp } from "../utils/clamp";
import { DeviceEventEmitter } from "react-native";
import { styles } from "../styles";

const EditSoilScreen = ({ navigation, route }) => {
    const { soilLayer: soil, tempDatapoint } = route.params;
    const [tempSoil, setTempSoil] = useState(soil);
    const [tempMatrixVal, setTempMatrixVal] = useState(tempSoil.matrixColor.value);
    const [tempMatrixChroma, setTempMatrixChroma] = useState(tempSoil.matrixColor.chroma);
    const [tempRedoxVal, setTempRedoxVal] = useState(tempSoil.redoxColor.value);
    const [tempRedoxChroma, setTempRedoxChroma] = useState(tempSoil.redoxColor.chroma);

    const tempArr = tempDatapoint.soil.layers;

    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", () => {
            DeviceEventEmitter.removeAllListeners("updateSoilData");
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        DeviceEventEmitter.emit("updateSoilData", tempSoil);
    }, [tempSoil]);

    return (
        <ScrollView style={styles.projectContainer}>
            <View>
                <Text style={styles.projectText}>Layer start depth</Text>
                <Input
                    keyboardType="number-pad"
                    onChangeText={(depth) => {
                        setTempSoil({
                            ...tempSoil,
                            depthStart: enforceNumeric(depth)
                        });
                    }}
                    value={tempSoil.depthStart || tempSoil.depthStart === 0 ? tempSoil.depthStart.toString() : ""}
                />
            </View>
            <View>
                <Text style={styles.projectText}>Layer end depth</Text>
                <Input
                    keyboardType="number-pad"
                    onChangeText={(depth) => {
                        setTempSoil({
                            ...tempSoil,
                            depthEnd: enforceNumeric(depth)
                        });
                    }}
                    value={tempSoil.depthEnd || tempSoil.depthEnd === 0 ? tempSoil.depthEnd.toString() : ""}
                />
            </View>

            <Text style={styles.projectText}>Matrix Color</Text>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 2 }}>
                    <Text style={styles.projectText}>hue</Text>
                    <Picker
                        selectedValue={tempSoil.matrixColor.hue}
                        onValueChange={(hue) => {
                            setTempSoil({
                                ...tempSoil,
                                matrixColor: {
                                    ...tempSoil.matrixColor,
                                    hue: hue
                                }
                            });
                        }}
                    >
                        <Picker.Item label="-" value="" />
                        <Picker.Item label="10R" value="10R" />
                        <Picker.Item label="2.5YR" value="2.5YR" />
                        <Picker.Item label="5YR" value="5YR" />
                        <Picker.Item label="7.5YR" value="7.5YR" />
                        <Picker.Item label="10YR" value="10YR" />
                        <Picker.Item label="2.5Y" value="2.5Y" />
                        <Picker.Item label="5Y" value="5Y" />
                        <Picker.Item label="10Y-5GY" value="10Y-5GY" />
                        <Picker.Item label="GLEY 1" value="GLEY 1" />
                        <Picker.Item label="GLEY 2" value="GLEY 2" />
                        <Picker.Item label="WHITE" value="WHITE" />
                    </Picker>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.projectText}>value</Text>
                    <Input
                        keyboardType="number-pad"
                        onChangeText={(tempVal) => {
                            if (tempVal.slice(-1) != ".") {
                                setTempMatrixVal(clamp(enforceNumeric(tempVal), 1, 8) || NaN);
                                setTempSoil({
                                    ...tempSoil,
                                    matrixColor: {
                                        ...tempSoil.matrixColor,
                                        value: enforceNumeric(tempVal)
                                    }
                                });
                            } else {
                                setTempMatrixVal(tempVal);
                            }
                        }}
                        value={tempMatrixVal ? tempMatrixVal.toString() : ""}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.projectText}>chroma</Text>
                    <Input
                        keyboardType="number-pad"
                        onChangeText={(tempVal) => {
                            if (tempVal.slice(-1) != ".") {
                                setTempMatrixChroma(clamp(enforceNumeric(tempVal), 1, 8) || NaN);
                                setTempSoil({
                                    ...tempSoil,
                                    matrixColor: {
                                        ...tempSoil.matrixColor,
                                        chroma: enforceNumeric(tempVal)
                                    }
                                });
                            } else {
                                setTempMatrixChroma(tempVal);
                            }
                        }}
                        value={tempMatrixChroma ? tempMatrixChroma.toString() : ""}
                    />
                </View>
            </View>

            <View>
                <Text style={styles.projectText}>Matrix percent volume</Text>
                <Input
                    keyboardType="number-pad"
                    onChangeText={(perc) => {
                        setTempSoil({
                            ...tempSoil,
                            matrixPercent: enforceNumeric(perc)
                        });
                    }}
                    value={tempSoil.matrixPercent ? tempSoil.matrixPercent.toString() : ""}
                />
            </View>

            <Text style={styles.projectText}>Redox Color</Text>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 2 }}>
                    <Text style={styles.projectText}>hue</Text>
                    <Picker
                        selectedValue={tempSoil.redoxColor.hue}
                        onValueChange={(hue) => {
                            setTempSoil({
                                ...tempSoil,
                                redoxColor: {
                                    ...tempSoil.redoxColor,
                                    hue: hue
                                }
                            });
                        }}
                    >
                        <Picker.Item label="-" value="" />
                        <Picker.Item label="10R" value="10R" />
                        <Picker.Item label="2.5YR" value="2.5YR" />
                        <Picker.Item label="5YR" value="5YR" />
                        <Picker.Item label="7.5YR" value="7.5YR" />
                        <Picker.Item label="10YR" value="10YR" />
                        <Picker.Item label="2.5Y" value="2.5Y" />
                        <Picker.Item label="5Y" value="5Y" />
                        <Picker.Item label="10Y-5GY" value="10Y-5GY" />
                        <Picker.Item label="GLEY 1" value="GLEY 1" />
                        <Picker.Item label="GLEY 2" value="GLEY 2" />
                        <Picker.Item label="WHITE" value="WHITE" />
                    </Picker>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.projectText}>value</Text>
                    <Input
                        keyboardType="number-pad"
                        onChangeText={(tempVal) => {
                            if (tempVal.slice(-1) != ".") {
                                setTempRedoxVal(clamp(enforceNumeric(tempVal), 1, 8) || NaN);
                                setTempSoil({
                                    ...tempSoil,
                                    redoxColor: {
                                        ...tempSoil.redoxColor,
                                        value: enforceNumeric(tempVal)
                                    }
                                });
                            } else {
                                setTempRedoxVal(tempVal);
                            }
                        }}
                        value={tempRedoxVal ? tempRedoxVal.toString() : ""}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.projectText}>chroma</Text>
                    <Input
                        keyboardType="number-pad"
                        onChangeText={(tempVal) => {
                            if (tempVal.slice(-1) != ".") {
                                setTempRedoxChroma(clamp(enforceNumeric(tempVal), 1, 8) || NaN);
                                setTempSoil({
                                    ...tempSoil,
                                    redoxColor: {
                                        ...tempSoil.redoxColor,
                                        chroma: enforceNumeric(tempVal)
                                    }
                                });
                            } else {
                                setTempRedoxChroma(tempVal);
                            }
                        }}
                        value={tempRedoxChroma ? tempRedoxChroma.toString() : ""}
                    />
                </View>
            </View>

            <View>
                <Text style={styles.projectText}>Redox percent volume</Text>
                <Input
                    keyboardType="number-pad"
                    onChangeText={(perc) => {
                        setTempSoil({
                            ...tempSoil,
                            redoxPercent: enforceNumeric(perc)
                        });
                    }}
                    value={tempSoil.redoxPercent ? tempSoil.redoxPercent.toString() : ""}
                />
            </View>

            <View>
                <Text style={styles.projectText}>Redox type</Text>
                <Picker
                    selectedValue={tempSoil.redoxType}
                    onValueChange={(type) => {
                        setTempSoil({
                            ...tempSoil,
                            redoxType: type
                        });
                    }}
                >
                    <Picker.Item label="-" value="" />
                    <Picker.Item label="Concentration (C)" value="C" />
                    <Picker.Item label="Depletion (D)" value="D" />
                    <Picker.Item label="Reduced Matrix (RM)" value="RM" />
                    <Picker.Item label="Masked Sand Grains (MS)" value="MS" />
                </Picker>
            </View>

            <View>
                <Text style={styles.projectText}>Redox location</Text>
                <Picker
                    selectedValue={tempSoil.redoxLocation}
                    onValueChange={(location) => {
                        setTempSoil({
                            ...tempSoil,
                            redoxLocation: location
                        });
                    }}
                >
                    <Picker.Item label="-" value="" />
                    <Picker.Item label="Matrix (M)" value="M" />
                    <Picker.Item label="Pore Lining (PL)" value="PL" />
                </Picker>
            </View>

            <View>
                <Text style={styles.projectText}>Texture</Text>
                <Input
                    onChangeText={(texture) => {
                        setTempSoil({
                            ...tempSoil,
                            texture: texture
                        });
                    }}
                    value={tempSoil.texture}
                />
            </View>

            <View>
                <Text style={styles.projectText}>Remarks</Text>
                <Input
                    onChangeText={(text) => {
                        setTempSoil({
                            ...tempSoil,
                            remarks: text
                        });
                    }}
                    value={tempSoil.remarks}
                />
            </View>
        </ScrollView>
    );
};

export default EditSoilScreen;
