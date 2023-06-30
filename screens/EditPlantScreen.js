import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, Keyboard } from "react-native";
import { Input, CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { enforceNumeric } from "../utils/enforceNumeric";
import { DeviceEventEmitter } from "react-native";
import { getProjectById } from "../reducers/projectsReducer";
import PlantSuggestionsList from "../components/PlantSuggestionsList";
import { styles, colors } from "../styles";
import * as reg_AGCP from "../data/plant_lists/reg_AGCP.json";
import * as reg_EMP from "../data/plant_lists/reg_EMP.json";
import * as reg_MW from "../data/plant_lists/reg_MW.json";

const EditPlantScreen = ({ route }) => {
    const { plant, tempDatapoint } = route.params;
    const [tempPlant, setTempPlant] = useState(plant);
    const [autocompleteData, setAutocompleteData] = useState([]);
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [speciesInputActive, setSpeciesInputActive] = useState(false);

    // Get parent project and associated region
    const activeProject = useSelector(getProjectById(tempDatapoint.projectId));
    // console.log('Attemping project id: ', tempDatapoint.projectId);
    // console.log('Active project id: ', activeProject.id);

    // default to AGCP if no region is set
    const region = activeProject.projectRegion ? activeProject.projectRegion : 'AGCP';

    const regions = {
        AGCP: reg_AGCP.data,
        EMP: reg_EMP.data,
        MW: reg_MW.data
    };

    //hide elements below the suggestions flatlist when keyboard is open to prevent overlapping
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardOpen(true);
        });
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardOpen(false);
        });
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    //useEffect to trigger on tempPlant species update, then filter regional plant list for similar species
    const plantSpeciesReducer = (regionArray, filterString) => {
        console.log("reducer start");
        let i = 0;
        return regionArray.reduce((output, currentItem) => {
            if (
                currentItem["Scientific Name"].toLowerCase().includes(filterString.toLowerCase()) ||
                currentItem["Common Name"].toLowerCase().includes(filterString.toLowerCase())
            ) {
                const newIndicatorObject = {
                    id: i,
                    // title: `${currentItem["Common Name"]} (${currentItem["Scientific Name"]})`,
                    commonName: currentItem["Common Name"],
                    scientificName: currentItem["Scientific Name"],
                    indicatorStatus: currentItem["Status"]
                };
                // console.log("new obj:", newIndicatorObject);
                ++i;
                // console.log("output:", output);
                return [...output, newIndicatorObject];
            } else {
                return output;
            }
        }, []);
    };

    useEffect(() => {
        // console.log("species changed");
        if (tempPlant.species.length > 3) {
            const tempReducerArr = plantSpeciesReducer(regions[region], tempPlant.species);
            // console.log("reducer out:", tempReducerArr);
            console.log('Current region: ', region)
            setAutocompleteData(tempReducerArr);
        } else {
            setAutocompleteData([]);
        }
    }, [tempPlant.species]);

    useEffect(() => {
        DeviceEventEmitter.emit("updatePlantData", tempPlant);
    }, [tempPlant]);

    useEffect(() => {
        // remove listener on unmount
        return () => {
            DeviceEventEmitter.removeAllListeners("updatePlantData");
        };
    }, []);

    return (
        <View style={styles.projectContainer}>
            {/* species input, suggestions flatlist */}
            <View style={{ flex: 1 }}>
                <Text style={styles.projectText}>Species</Text>
                <Input
                    onChangeText={(species) => {
                        setTempPlant({
                            ...tempPlant,
                            species: species
                        });
                        // console.log("autocomplete data:", autocompleteData);
                    }}
                    value={tempPlant.species}
                    onFocus={() => setSpeciesInputActive(true)}
                    onEndEditing={() => setSpeciesInputActive(false)}
                />
                <View style={{ ...styles.sectionContainer, paddingLeft: 16 }}>
                    <PlantSuggestionsList
                        listData={autocompleteData}
                        tempPlant={tempPlant}
                        setTempPlant={setTempPlant}
                    />
                </View>
            </View>
            {/* everything else */}
            {(!speciesInputActive || !keyboardOpen) && (
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    {/* reapply background to prevent longer list contents from displaying beneath input */}
                    <View style={{ backgroundColor: colors.offWhite }}>
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
                    <View style={{ backgroundColor: colors.offWhite }}>
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
                    <View>
                        <CheckBox
                            title="Dominant?"
                            containerStyle={styles.checkBoxContainer}
                            textStyle={styles.projectText}
                            checkedColor={colors.darkGreen}
                            checked={tempPlant.dominant}
                            // dominance calculated in PlantsList
                        />
                    </View>
                </View>
            )}
        </View>
    );
};

export default EditPlantScreen;
