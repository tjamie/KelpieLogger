import { View, Text, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { styles } from "../styles";

const PlantSuggestionsList = (props) => {
    const { listData, tempPlant, setTempPlant } = props;
    console.log("list data:", listData);
    const renderItem = ({ item: plant }) => {
        return (
            <ListItem
                //populate name and indicator status here
                onPress={() => {
                    setTempPlant({
                        ...tempPlant,
                        species: plant.scientificName,
                        indicator: plant.indicatorStatus
                    });
                }}
                containerStyle={styles.subsectionListContainer}
            >
                <ListItem.Content>
                    <ListItem.Title style={styles.listPrimaryText}>{plant.commonName}</ListItem.Title>
                    <ListItem.Subtitle style={{ ...styles.listSecondaryText, fontStyle: "italic" }}>
                        {plant.scientificName}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
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
        <View style={{ marginBottom: 24 }}>
            <Text style={styles.projectText}>Suggestions</Text>
            {listData && listData.length < 1 && <EmptyItem />}
            <FlatList data={listData} renderItem={renderItem} keyExtractor={(item) => item.id} />
        </View>
    );
};

export default PlantSuggestionsList;
