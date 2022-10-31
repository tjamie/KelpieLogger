import { dateToUniqueId } from "../utils/dateToUniqueId";
import { SwipeRow } from "react-native-swipe-list-view";
import { Text, View, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DeviceEventEmitter } from "react-native";

const PlantsList = (props) => {
    const { navigation, stratum, tempDatapoint, setTempDatapoint } = props;

    const handleNewPlant = () => {
        const newPlant = {
            id: dateToUniqueId(),
            species: "New Plant",
            cover: 0,
            dominant: false,
            indicator: ""
        };
        setTempDatapoint({
            ...tempDatapoint,
            vegetation: {
                ...tempDatapoint.vegetation,
                strata: {
                    ...tempDatapoint.vegetation.strata,
                    [stratum]: [...tempDatapoint.vegetation.strata[stratum], newPlant]
                }
            }
        });
    };

    const NewPlantItem = () => {
        return (
            <View>
                <ListItem
                    onPress={() => {
                        console.log("NewPlantItem pressed");
                        handleNewPlant();
                    }}
                    containerStyle={{
                        backgroundColor: "#EFEFEF",
                        borderColor: "#DDD",
                        borderWidth: 1
                    }}
                >
                    <ListItem.Content>
                        <ListItem.Title>New Plant</ListItem.Title>
                        <ListItem.Subtitle>Record a new plant</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        );
    };

    const RenderPlantItem = ({ item: plant }) => {
        return (
            <SwipeRow rightOpenValue={-100}>
                {/* delete plant */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        flex: 1
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: "red",
                            height: "100%",
                            justifyContent: "center"
                        }}
                        onPress={() =>
                            Alert.alert(
                                "Delete Plant",
                                `Are you sure you want to delete item for ${plant.species}?`,
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Not deleted"),
                                        style: "cancel"
                                    },
                                    {
                                        text: "OK",
                                        onPress: () => {
                                            console.log("DELETE OK PRESSED");
                                            const plantArr = tempDatapoint.vegetation.strata[stratum];
                                            setTempDatapoint({
                                                ...tempDatapoint,
                                                vegetation: {
                                                    ...tempDatapoint.vegetation,
                                                    strata: {
                                                        ...tempDatapoint.vegetation.strata,
                                                        [stratum]: plantArr.filter((entry) => entry.id != plant.id)
                                                    }
                                                }
                                            });
                                        }
                                    }
                                ],
                                { cancelable: false }
                            )
                        }
                    >
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "700",
                                textAlign: "center",
                                fontSize: 16,
                                width: 100
                            }}
                        >
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* view plant */}
                <View>
                    <ListItem
                        onPress={() => {
                            DeviceEventEmitter.addListener("updatePlantData", (tempPlant) => {
                                console.log("listener added");
                                console.log("tempPlant:", tempPlant);
                                const tempArr = tempDatapoint.vegetation.strata[stratum];
                                const newStratumArr = tempArr.map((obj) => {
                                    if (obj.id === tempPlant.id) {
                                        return tempPlant;
                                    }
                                    return obj;
                                });
                                // console.log("new arr:", newStratumArr);

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
                            });

                            console.log("Target plant:", plant);
                            navigation.navigate("EditPlant", { plant, navigation });
                        }}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{plant.species}</ListItem.Title>
                            <ListItem.Subtitle>{`${plant.indicator} --- ${plant.cover}`}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </SwipeRow>
        );
    };

    return (
        <View>
            <Text>Vegetation ({stratum})</Text>
            <NewPlantItem />
            {tempDatapoint.vegetation.strata[stratum].map((item) => {
                if (item) {
                    return (
                        <View key={item.id.toString()}>
                            <RenderPlantItem item={item} />
                            <Text>{item.id.toString()}</Text>
                        </View>
                    );
                }
            })}
        </View>
    );
};

export default PlantsList;
