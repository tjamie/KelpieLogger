import { useState } from "react";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { ListItem, Button, Input, CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { updateDatapoint } from "../reducers/datapointsReducer";
import Collapsible from "react-native-collapsible";
import { enforceNumeric } from "../utils/enforceNumeric";
// import { TouchableOpacity } from "react-native-gesture-handler";

const DatapointScreen = ({ route }) => {
    const { datapoint } = route.params;
    const [tempDatapoint, setTempDatapoint] = useState(datapoint);
    const [dp, setDp] = useState(datapoint);

    const [collapseGeneral, setCollapseGeneral] = useState(true);
    const [collapseHydrology, setCollapseHydrology] = useState(true);
    const [collapseVegetation, setCollapseVegetation] = useState(true);
    const [collapseSoil, setCollapseSoil] = useState(true);

    const dispatch = useDispatch();

    const handleSaveDatapoint = () => {
        dispatch(updateDatapoint(tempDatapoint));
        console.log("Updated datapoint:", JSON.stringify(tempDatapoint, 0, 2));
    };

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
                    <CheckBox
                        title="Wetland hydrology present?"
                        checked={tempDatapoint.hydrology.present}
                        onPress={() => {
                            setTempDatapoint({
                                ...tempDatapoint,
                                hydrology: {
                                    ...tempDatapoint.hydrology,
                                    present: !tempDatapoint.hydrology.present
                                }
                            });
                        }}
                    />
                    <View>
                        <Text>Surface water depth (inches)</Text>
                        <Input
                            keyboardType="numeric"
                            onChangeText={(depth) =>
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    hydrology: {
                                        ...tempDatapoint.hydrology,
                                        surfaceWater: {
                                            depth: enforceNumeric(depth),
                                            present: depth > 0
                                        }
                                    }
                                })
                            }
                            value={tempDatapoint.hydrology.surfaceWater.depth.toString()}
                        />
                    </View>
                    <View>
                        <Text>Water table depth (inches)</Text>
                        <Input
                            keyboardType="numeric"
                            onChangeText={(depth) =>
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    hydrology: {
                                        ...tempDatapoint.hydrology,
                                        waterTable: {
                                            depth: enforceNumeric(depth),
                                            present: depth < 12
                                        }
                                    }
                                })
                            }
                            value={tempDatapoint.hydrology.waterTable.depth.toString()}
                        />
                    </View>
                    <View>
                        <Text>Saturation depth (inches)</Text>
                        <Input
                            keyboardType="numeric"
                            onChangeText={(depth) => {
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    hydrology: {
                                        ...tempDatapoint.hydrology,
                                        saturation: {
                                            depth: enforceNumeric(depth),
                                            present: depth < 12
                                        }
                                    }
                                });
                            }}
                            value={tempDatapoint.hydrology.saturation.depth.toString()}
                        />
                    </View>
                    <View>
                        <Text>Primary indicators placeholder</Text>
                    </View>
                    <View>
                        <Text>Secondary indicators placeholder</Text>
                    </View>
                    <View>
                        <Text>Remarks</Text>
                        <Input
                            onChangeText={(text) => {
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    hydrology: {
                                        ...tempDatapoint.hydrology,
                                        remarks: text
                                    }
                                });
                            }}
                            value={tempDatapoint.hydrology.remarks}
                        />
                    </View>
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
            <Button title="Save Changes" onPress={() => handleSaveDatapoint()} />
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
