import { View, Text, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { Input, ListItem } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles";
import { filterSpeciesArray } from "../utils/filterSpeciesArray";
import * as reg_AGCP from "../data/plant_lists/reg_AGCP.json";
import * as reg_EMP from "../data/plant_lists/reg_EMP.json";
import * as reg_MW from "../data/plant_lists/reg_MW.json";
import * as reg_GP from "../data/plant_lists/reg_GP.json";
import * as reg_NCNE from "../data/plant_lists/reg_NCNE.json";

const RegionalPlantListsScreen = () => {
    const [selectedRegion, setSelectedRegion] = useState("AGCP");
    const [speciesFilter, setSpeciesFilter] = useState("");
    const [filteredList, setFilteredList] = useState([]);
    const minFilterLength = 3;

    const regions = {
        AGCP: reg_AGCP.data,
        EMP: reg_EMP.data,
        MW: reg_MW.data,
        GP: reg_GP.data,
        NCNE: reg_NCNE.data
    };

    // update rendered items based on user text input
    useEffect(() => {
        if (speciesFilter.length < minFilterLength) {
            setFilteredList(filterSpeciesArray(regions[selectedRegion], ""));
        } else {
            setFilteredList(filterSpeciesArray(regions[selectedRegion], speciesFilter));
        }
    }, [speciesFilter, selectedRegion]);

    const renderItem = ({ item: plant }) => {
        return (
            <View style={{ ...styles.subsectionListContainer, flexDirection: "row", paddingTop: 4, paddingBottom: 4 }}>
                {/* common and latin names */}
                <View style={{ flex: 4, alignItems: "flex-start", flexDirection: "column" }}>
                    <Text style={styles.listPrimaryText}>{plant.commonName}</Text>
                    <Text style={{ ...styles.listSecondaryText, fontStyle: "italic" }}>{plant.scientificName}</Text>
                </View>
                {/* indicator */}
                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                    <Text style={styles.listPrimaryText}>{plant.indicatorStatus}</Text>
                </View>
            </View>
        );
    };
    const EmptyItem = () => {
        return (
            <ListItem containerStyle={styles.subsectionListContainer}>
                <ListItem.Title style={{ ...styles.listPrimaryText, fontStyle: "italic" }}>
                    No results found
                </ListItem.Title>
            </ListItem>
        );
    };

    return (
        <View style={{ ...styles.projectContainer }}>
            {/* user input and filter selection */}
            <View>
                <Text style={styles.projectText}>Selected Region</Text>
                <Picker
                    selectedValue={selectedRegion}
                    onValueChange={(region) => {
                        setSelectedRegion(region);
                    }}
                >
                    <Picker.Item label="AGCP - Atlantic and Gulf Coastal Plain" value="AGCP" />
                    <Picker.Item label="EMP - Eastern Mountains and Piedmont" value="EMP" />
                    <Picker.Item label="MW - Midwest" value="MW" />
                    <Picker.Item label="GP - Great Plains" value = "GP" />
                    <Picker.Item label="NCNE - Northcentral and Northeast" value="NCNE" />
                </Picker>
                <Text style={styles.projectText}>Filter Species</Text>
                <Input
                    placeholder={`Enter ${minFilterLength} or more characters`}
                    onChangeText={(text) => {
                        setSpeciesFilter(text);
                    }}
                    value={speciesFilter}
                />
            </View>
            {/* filtered plant list */}
            <View style={{ ...styles.subsectionContainer, flex: 1 }}>
                {filteredList && filteredList.length < 1 && <EmptyItem />}
                <FlatList data={filteredList} renderItem={renderItem} keyExtractor={(item) => item.id} />
            </View>
        </View>
    );
};

export default RegionalPlantListsScreen;
