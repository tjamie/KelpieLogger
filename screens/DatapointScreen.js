import { useState } from "react";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { ListItem, Button, Input, CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { updateDatapoint } from "../reducers/datapointsReducer";
import Collapsible from "react-native-collapsible";
// import { TouchableOpacity } from "react-native-gesture-handler";

const DatapointScreen = ({ route }) => {
    const { datapoint } = route.params;
    const [tempDatapoint, setTempDatapoint] = useState(datapoint);
    const [dp, setDp] = useState(datapoint);

    const [collapseGeneral, setCollapseGeneral] = useState(false);
    const [collapseHydrology, setCollapseHydrology] = useState(true);
    const [collapseVegetation, setCollapseVegetation] = useState(true);
    const [collapseSoil, setCollapseSoil] = useState(true);

    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Button title="print datapoint" onPress={() => console.log(JSON.stringify(tempDatapoint, 0, 2))} />

            {/* General info*/}
            <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.sectionHeader} onPress={() => setCollapseGeneral(!collapseGeneral)}>
                    <Text>Datapoint Setting and Information</Text>
                </TouchableOpacity>
                <Collapsible collapsed={collapseGeneral}>
                    <View>
                        <Text>Sampling Point</Text>
                        <Input
                            onChangeText={(name) =>
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    name: name
                                })
                            }
                            value={tempDatapoint.name}
                        />
                    </View>
                    <View>
                        <Text>Investigator(s)</Text>
                        <Input
                            onChangeText={(investigators) => {
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    authors: investigators
                                });
                            }}
                            value={tempDatapoint.authors}
                        />
                    </View>
                    <View>
                        <Text>Landform</Text>
                        <Input
                            onChangeText={(landform) => {
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    landform: landform
                                });
                            }}
                            value={tempDatapoint.landform}
                        />
                    </View>
                    <View>
                        <Text>Relief</Text>
                        <Input
                            onChangeText={(relief) => {
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    relief: relief
                                });
                            }}
                            value={tempDatapoint.relief}
                        />
                    </View>
                    <View>
                        <Text>Slope</Text>
                        <Input
                            onChangeText={(slope) => {
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    slope: slope
                                });
                            }}
                            value={tempDatapoint.slope}
                        />
                    </View>
                    {/* TODO get lat/long via device's GPS */}
                    <View>
                        <Text>Latitude</Text>
                        <Input
                            keyboardType="numeric"
                            onChangeText={(lat) => {
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    lat: lat
                                });
                                // console.log(lat);
                            }}
                            value={tempDatapoint.lat}
                        />
                    </View>
                    <View>
                        <Text>Longitude</Text>
                        <Input
                            keyboardType="numeric"
                            onChangeText={(long) => {
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    long: long
                                });
                                // console.log(long);
                            }}
                            value={tempDatapoint.long}
                        />
                    </View>
                    <View>
                        <Text>Soil Mapping Unit</Text>
                        <Input
                            onChangeText={(soilUnit) => {
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    soilUnit: soilUnit
                                });
                            }}
                            value={tempDatapoint.soilUnit}
                        />
                    </View>
                    <View>
                        <Text>NWI Classification</Text>
                        <Input
                            onChangeText={(NWI) => {
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    NWI: NWI
                                });
                            }}
                            value={tempDatapoint.NWI}
                        />
                    </View>

                    <CheckBox
                        title="Disturbed soil?"
                        checked={tempDatapoint.soil.disturbed}
                        onPress={() => {
                            setTempDatapoint({
                                ...tempDatapoint,
                                soil: {
                                    ...tempDatapoint.soil,
                                    disturbed: !tempDatapoint.soil.disturbed
                                }
                            });
                            // console.log(JSON.stringify(tempDatapoint, 0, 2));
                        }}
                    />
                    <CheckBox
                        title="Disturbed hydrology?"
                        checked={tempDatapoint.hydrology.disturbed}
                        onPress={() => {
                            setTempDatapoint({
                                ...tempDatapoint,
                                hydrology: {
                                    ...tempDatapoint.hydrology,
                                    disturbed: !tempDatapoint.hydrology.disturbed
                                }
                            });
                        }}
                    />
                    <CheckBox
                        title="Disturbed vegetation?"
                        checked={tempDatapoint.vegetation.disturbed}
                        onPress={() => {
                            setTempDatapoint({
                                ...tempDatapoint,
                                vegetation: {
                                    ...tempDatapoint.vegetation,
                                    disturbed: !tempDatapoint.vegetation.disturbed
                                }
                            });
                            // console.log(JSON.stringify(tempDatapoint, 0, 2));
                        }}
                    />

                    <CheckBox
                        title="Problematic soil?"
                        checked={tempDatapoint.soil.problematic}
                        onPress={() => {
                            setTempDatapoint({
                                ...tempDatapoint,
                                soil: {
                                    ...tempDatapoint.soil,
                                    problematic: !tempDatapoint.soil.problematic
                                }
                            });
                            // console.log(JSON.stringify(tempDatapoint, 0, 2));
                        }}
                    />
                    <CheckBox
                        title="Problematic hydrology?"
                        checked={tempDatapoint.hydrology.problematic}
                        onPress={() => {
                            setTempDatapoint({
                                ...tempDatapoint,
                                hydrology: {
                                    ...tempDatapoint.hydrology,
                                    problematic: !tempDatapoint.hydrology.problematic
                                }
                            });
                        }}
                    />
                    <CheckBox
                        title="Problematic vegetation?"
                        checked={tempDatapoint.vegetation.problematic}
                        onPress={() => {
                            setTempDatapoint({
                                ...tempDatapoint,
                                vegetation: {
                                    ...tempDatapoint.vegetation,
                                    problematic: !tempDatapoint.vegetation.problematic
                                }
                            });
                            // console.log(JSON.stringify(tempDatapoint, 0, 2));
                        }}
                    />
                </Collapsible>
            </View>

            {/* Hydrology */}
            <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.sectionHeader} onPress={() => setCollapseHydrology(!collapseHydrology)}>
                    <Text>Hydrology</Text>
                </TouchableOpacity>
                <Collapsible collapsed={collapseHydrology}>
                    <Text>hydrology placeholder</Text>
                </Collapsible>
            </View>

            {/* Vegetation */}
            <View style={styles.sectionContainer}>
                <TouchableOpacity
                    style={styles.sectionHeader}
                    onPress={() => setCollapseVegetation(!collapseVegetation)}
                >
                    <Text>Vegetation</Text>
                </TouchableOpacity>
                <Collapsible collapsed={collapseVegetation}>
                    <Text>Vegetation placeholder</Text>
                </Collapsible>
            </View>

            {/* Soil */}
            <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.sectionHeader} onPress={() => setCollapseSoil(!collapseSoil)}>
                    <Text>Soil</Text>
                </TouchableOpacity>
                <Collapsible collapsed={collapseSoil}>
                    <Text>Soil placeholder</Text>
                </Collapsible>
            </View>
            <Button title="Save Changes" onPress={() => console.log("save button pressed")} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        borderWidth: 1,
        borderColor: "#000",
        padding: 5,
        margin: 5
    },
    sectionHeader: {
        paddingTop: 16,
        paddingBottom: 16
    }
});

export default DatapointScreen;
