import { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";
import { useDispatch } from "react-redux";
import { updateDatapoint } from "../reducers/datapointsReducer";
import Collapsible from "react-native-collapsible";
import { enforceNumeric } from "../utils/enforceNumeric";
import PlantsList from "../components/PlantsList";
import SoilsList from "../components/SoilsList";
import IndicatorsList from "../components/IndicatorsList";
import * as Location from "expo-location";
import { styles, colors } from "../styles";

const DatapointScreen = (props) => {
    const { route, navigation } = props;
    const { datapoint } = route.params;
    const [tempDatapoint, setTempDatapoint] = useState(datapoint);

    const [collapseGeneral, setCollapseGeneral] = useState(true);
    const [collapseHydrology, setCollapseHydrology] = useState(true);
    const [collapseVegetation, setCollapseVegetation] = useState(true);
    const [collapseSoil, setCollapseSoil] = useState(true);

    const [collapseTree, setCollapseTree] = useState(true);
    const [collapseSaplingShrub, setCollapseSaplingShrub] = useState(true);
    const [collapseHerb, setCollapseHerb] = useState(true);
    const [collapseVine, setCollapseVine] = useState(true);

    const dispatch = useDispatch();

    const handleSaveDatapoint = () => {
        dispatch(updateDatapoint(tempDatapoint));
        console.log("Updated datapoint:", tempDatapoint.id);
    };

    const LocationButton = () => {
        const defaultText = "Get Current Position";
        const [buttonText, setButtonText] = useState(defaultText);

        const getLocation = async () => {
            setButtonText("Getting location permission...");

            const locationPermission = await Location.requestForegroundPermissionsAsync();
            console.log("location permission status:", locationPermission.status);

            if (locationPermission.status === "granted") {
                setButtonText("Getting current position...");
                const tempLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
                console.log("location: ", tempLocation);
                setTempDatapoint({
                    ...tempDatapoint,
                    lat: tempLocation.coords.latitude,
                    long: tempLocation.coords.longitude
                });
            } else if (locationPermission.status !== "granted") {
                console.log("permission denied");
            }

            setButtonText(defaultText);
        };

        return (
            <Button
                title={buttonText}
                onPress={() => getLocation()}
                buttonStyle={styles.buttonMain}
                titleStyle={styles.buttonMainText}
            />
        );
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", () => {
            if (tempDatapoint !== datapoint) {
                console.log("saving");
                handleSaveDatapoint();
            }
        });
        return unsubscribe;
    }, [navigation, tempDatapoint]);

    return (
        <ScrollView style={styles.projectContainer}>
            <View>
                {/* <Button
                    title="[DEBUG] print datapoint"
                    onPress={() => console.log(JSON.stringify(tempDatapoint, 0, 2))}
                /> */}
            </View>
            {/* General info*/}
            <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.sectionHeader} onPress={() => setCollapseGeneral(!collapseGeneral)}>
                    <Text style={styles.projectHeaderText}>General Information</Text>
                    {collapseGeneral && (
                        <Text style={styles.projectInfoText}>
                            Press here to display information regarding datapoint conditions and local topography.
                        </Text>
                    )}
                </TouchableOpacity>
                <Collapsible collapsed={collapseGeneral} renderChildrenCollapsed={false}>
                    <View>
                        <LocationButton />
                    </View>
                    <View>
                        <Text style={styles.projectText}>Sampling Point</Text>
                        <Input
                            onChangeText={(name) => {
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    name: name
                                });
                            }}
                            value={tempDatapoint.name}
                        />
                    </View>
                    <View>
                        <Text style={styles.projectText}>Investigator(s)</Text>
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
                        <Text style={styles.projectText}>Landform</Text>
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
                        <Text style={styles.projectText}>Relief</Text>
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
                        <Text style={styles.projectText}>Slope</Text>
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
                    <View>
                        <Text style={styles.projectText}>Latitude</Text>
                        <Input
                            keyboardType="numeric"
                            onChangeText={(lat) => {
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    lat: lat
                                });
                            }}
                            value={tempDatapoint.lat.toString()}
                        />
                    </View>
                    <View>
                        <Text style={styles.projectText}>Longitude</Text>
                        <Input
                            keyboardType="numeric"
                            onChangeText={(long) => {
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    long: long
                                });
                                // console.log(long);
                            }}
                            value={tempDatapoint.long.toString()}
                        />
                    </View>
                    <View>
                        <Text style={styles.projectText}>Soil Mapping Unit</Text>
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
                        <Text style={styles.projectText}>NWI Classification</Text>
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
                        textStyle={styles.projectText}
                        containerStyle={styles.checkBoxContainer}
                        checkedColor={colors.darkGreen}
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
                        textStyle={styles.projectText}
                        containerStyle={styles.checkBoxContainer}
                        checkedColor={colors.darkGreen}
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
                        textStyle={styles.projectText}
                        containerStyle={styles.checkBoxContainer}
                        checkedColor={colors.darkGreen}
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
                        textStyle={styles.projectText}
                        containerStyle={styles.checkBoxContainer}
                        checkedColor={colors.darkGreen}
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
                        textStyle={styles.projectText}
                        containerStyle={styles.checkBoxContainer}
                        checkedColor={colors.darkGreen}
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
                        textStyle={styles.projectText}
                        containerStyle={styles.checkBoxContainer}
                        checkedColor={colors.darkGreen}
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
                    <Text style={styles.projectHeaderText}>Hydrology</Text>
                    {collapseHydrology && (
                        <Text style={styles.projectInfoText}>
                            Press here to display information regarding hydrology.
                        </Text>
                    )}
                </TouchableOpacity>
                <Collapsible collapsed={collapseHydrology} renderChildrenCollapsed={false}>
                    <CheckBox
                        title="Wetland hydrology present?"
                        textStyle={styles.projectText}
                        containerStyle={styles.checkBoxContainer}
                        checkedColor={colors.darkGreen}
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
                        <Text style={styles.projectText}>Surface water depth (inches)</Text>
                        <Input
                            keyboardType="numeric"
                            onChangeText={(depth) => {
                                console.log("depth:", tempDatapoint.hydrology.surfaceWater.depth);
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    hydrology: {
                                        ...tempDatapoint.hydrology,
                                        surfaceWater: {
                                            depth: enforceNumeric(depth),
                                            present: depth > 0
                                        }
                                    }
                                });
                            }}
                            value={
                                tempDatapoint.hydrology.surfaceWater.depth === 0
                                    ? "0"
                                    : tempDatapoint.hydrology.surfaceWater.depth
                                    ? tempDatapoint.hydrology.surfaceWater.depth.toString()
                                    : ""
                            }
                        />
                    </View>
                    <View>
                        <Text style={styles.projectText}>Water table depth (inches)</Text>
                        <Input
                            keyboardType="numeric"
                            onChangeText={(depth) => {
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    hydrology: {
                                        ...tempDatapoint.hydrology,
                                        waterTable: {
                                            depth: enforceNumeric(depth),
                                            present: depth < 12
                                        }
                                    }
                                });
                            }}
                            value={
                                tempDatapoint.hydrology.waterTable.depth === 0
                                    ? "0"
                                    : tempDatapoint.hydrology.waterTable.depth
                                    ? tempDatapoint.hydrology.waterTable.depth.toString()
                                    : ""
                            }
                        />
                    </View>
                    <View>
                        <Text style={styles.projectText}>Saturation depth (inches)</Text>
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
                            value={
                                tempDatapoint.hydrology.saturation.depth === 0
                                    ? "0"
                                    : tempDatapoint.hydrology.saturation.depth
                                    ? tempDatapoint.hydrology.saturation.depth.toString()
                                    : ""
                            }
                        />
                    </View>
                    <IndicatorsList
                        navigation={navigation}
                        tempDatapoint={tempDatapoint}
                        setTempDatapoint={setTempDatapoint}
                        medium="hydrology"
                        indicatorType="primaryIndicators"
                        name="Primary Hydrology Indicators"
                    />
                    <IndicatorsList
                        navigation={navigation}
                        tempDatapoint={tempDatapoint}
                        setTempDatapoint={setTempDatapoint}
                        medium="hydrology"
                        indicatorType="secondaryIndicators"
                        name="Secondary Hydrology Indicators"
                    />
                    <View>
                        <Text style={styles.projectText}>Remarks</Text>
                        <Input
                            multiline={true}
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
                    <Text style={styles.projectHeaderText}>Vegetation</Text>
                    {collapseVegetation && (
                        <Text style={styles.projectInfoText}>
                            Press here to display information regarding vegetation.
                        </Text>
                    )}
                </TouchableOpacity>
                <Collapsible collapsed={collapseVegetation} renderChildrenCollapsed={false}>
                    <CheckBox
                        title="Hydric vegetation present?"
                        textStyle={styles.projectText}
                        containerStyle={styles.checkBoxContainer}
                        checkedColor={colors.darkGreen}
                        checked={tempDatapoint.vegetation.present}
                        onPress={() => {
                            setTempDatapoint({
                                ...tempDatapoint,
                                vegetation: {
                                    ...tempDatapoint.vegetation,
                                    present: !tempDatapoint.vegetation.present
                                }
                            });
                        }}
                    />
                    {/* vegetation indicators */}
                    {/* vegetation.rapidTest, vegetation.domTest, vegetation.prevIndex */}
                    <CheckBox
                        title="Rapid test"
                        textStyle={styles.projectText}
                        containerStyle={styles.checkBoxContainer}
                        checkedColor={colors.darkGreen}
                        checked={tempDatapoint.vegetation.indicators.rapidTest}
                    />
                    <CheckBox
                        title={
                            "domWet" in tempDatapoint.vegetation.indicators
                                ? `Dominance test (${tempDatapoint.vegetation.indicators.domWet}/${tempDatapoint.vegetation.indicators.domTotal})`
                                : "Dominance test"
                        }
                        textStyle={styles.projectText}
                        containerStyle={styles.checkBoxContainer}
                        checkedColor={colors.darkGreen}
                        checked={tempDatapoint.vegetation.indicators.domTest}
                    />
                    <CheckBox
                        title={
                            "prevIndexValue" in tempDatapoint.vegetation.indicators
                                ? `Prevalence index (${tempDatapoint.vegetation.indicators.prevIndexValue.toFixed(2)})`
                                : "Prevalence index"
                        }
                        textStyle={styles.projectText}
                        containerStyle={styles.checkBoxContainer}
                        checkedColor={colors.darkGreen}
                        checked={tempDatapoint.vegetation.indicators.prevIndex}
                    />

                    {/* Trees */}
                    <View style={collapseTree ? styles.subsectionContainer : styles.subsectionContainerExpanded}>
                        <TouchableOpacity
                            style={styles.subsectionHeader}
                            onPress={() => setCollapseTree(!collapseTree)}
                        >
                            <Text style={collapseTree ? styles.projectText : styles.projectTextActive}>Tree Stratum</Text>
                            {collapseTree ? (
                                <Text style={styles.projectInfoText}>Press here to display tree species.</Text>
                            ) : (
                                <Text style={styles.projectInfoText}>
                                    Press "New Plant" to record a new tree species.
                                </Text>
                            )}
                        </TouchableOpacity>
                        <Collapsible collapsed={collapseTree} renderChildrenCollapsed={false}>
                            <PlantsList
                                stratum="tree"
                                navigation={navigation}
                                tempDatapoint={tempDatapoint}
                                setTempDatapoint={setTempDatapoint}
                            />
                        </Collapsible>
                    </View>

                    {/* Saplings/Shrubs */}
                    <View
                        style={collapseSaplingShrub ? styles.subsectionContainer : styles.subsectionContainerExpanded}
                    >
                        <TouchableOpacity
                            style={styles.subsectionHeader}
                            onPress={() => setCollapseSaplingShrub(!collapseSaplingShrub)}
                        >
                            <Text style={collapseSaplingShrub ? styles.projectText : styles.projectTextActive}>Sapling and Shrub Stratum</Text>
                            {collapseSaplingShrub ? (
                                <Text style={styles.projectInfoText}>
                                    Press here to display sapling and shrub species.
                                </Text>
                            ) : (
                                <Text style={styles.projectInfoText}>
                                    Press "New Plant" to record a new sapling or shrub species.
                                </Text>
                            )}
                        </TouchableOpacity>
                        <Collapsible collapsed={collapseSaplingShrub} renderChildrenCollapsed={false}>
                            <PlantsList
                                stratum="saplingShrub"
                                navigation={navigation}
                                tempDatapoint={tempDatapoint}
                                setTempDatapoint={setTempDatapoint}
                            />
                        </Collapsible>
                    </View>

                    {/* Herbaceous */}
                    <View style={collapseHerb ? styles.subsectionContainer : styles.subsectionContainerExpanded}>
                        <TouchableOpacity
                            style={styles.subsectionHeader}
                            onPress={() => setCollapseHerb(!collapseHerb)}
                        >
                            <Text style={collapseHerb ? styles.projectText : styles.projectTextActive}>Herb Stratum</Text>
                            {collapseHerb ? (
                                <Text style={styles.projectInfoText}>Press here to display herbaceous species.</Text>
                            ) : (
                                <Text style={styles.projectInfoText}>
                                    Press "New Plant" to record a new herbaceous species.
                                </Text>
                            )}
                        </TouchableOpacity>
                        <Collapsible collapsed={collapseHerb} renderChildrenCollapsed={false}>
                            <PlantsList
                                stratum="herb"
                                navigation={navigation}
                                tempDatapoint={tempDatapoint}
                                setTempDatapoint={setTempDatapoint}
                            />
                        </Collapsible>
                    </View>

                    {/* Woody Vines */}
                    <View style={collapseVine ? styles.subsectionContainer : styles.subsectionContainerExpanded}>
                        <TouchableOpacity
                            style={styles.subsectionHeader}
                            onPress={() => setCollapseVine(!collapseVine)}
                        >
                            <Text style={collapseVine ? styles.projectText : styles.projectTextActive}>Woody Vine Stratum</Text>
                            {collapseVine ? (
                                <Text style={styles.projectInfoText}>Press here to display woody vine species.</Text>
                            ) : (
                                <Text style={styles.projectInfoText}>
                                    Press "New Plant" to record a new woody vine species.
                                </Text>
                            )}
                        </TouchableOpacity>
                        <Collapsible collapsed={collapseVine} renderChildrenCollapsed={false}>
                            <PlantsList
                                stratum="vine"
                                navigation={navigation}
                                tempDatapoint={tempDatapoint}
                                setTempDatapoint={setTempDatapoint}
                            />
                        </Collapsible>
                    </View>
                </Collapsible>
            </View>

            {/* Soil */}
            <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.sectionHeader} onPress={() => setCollapseSoil(!collapseSoil)}>
                    <Text style={styles.projectHeaderText}>Soil</Text>
                    {collapseSoil ? (
                        <Text style={styles.projectInfoText}>Press here to display information regarding soil.</Text>
                    ) : (
                        <Text style={styles.projectInfoText}>Press "New Soil" to record a new soil layer.</Text>
                    )}
                </TouchableOpacity>
                <Collapsible collapsed={collapseSoil} renderChildrenCollapsed={false}>
                    <CheckBox
                        title="Hydric soil present?"
                        textStyle={styles.projectText}
                        containerStyle={styles.checkBoxContainer}
                        checkedColor={colors.darkGreen}
                        checked={tempDatapoint.soil.present}
                        onPress={() => {
                            setTempDatapoint({
                                ...tempDatapoint,
                                soil: {
                                    ...tempDatapoint.soil,
                                    present: !tempDatapoint.soil.present
                                }
                            });
                        }}
                    />

                    <SoilsList
                        navigation={navigation}
                        tempDatapoint={tempDatapoint}
                        setTempDatapoint={setTempDatapoint}
                    />

                    <IndicatorsList
                        navigation={navigation}
                        tempDatapoint={tempDatapoint}
                        setTempDatapoint={setTempDatapoint}
                        medium="soil"
                        indicatorType="indicators"
                        name="Hydric Soil Indicators"
                    />
                    <IndicatorsList
                        navigation={navigation}
                        tempDatapoint={tempDatapoint}
                        setTempDatapoint={setTempDatapoint}
                        medium="soil"
                        indicatorType="problematicIndicators"
                        name="Indicators for Problematic Hydric Soils"
                    />
                </Collapsible>
            </View>

            <View style={{ alignItems: "center", marginBottom: 8 }}>
                <Text style={styles.projectInfoText}>Any changes will be automatically saved.</Text>
            </View>
        </ScrollView>
    );
};

export default DatapointScreen;
