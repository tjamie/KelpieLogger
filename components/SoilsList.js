import { dateToUniqueId } from "../utils/dateToUniqueId";
import { SwipeRow } from "react-native-swipe-list-view";
import { Text, View, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const SoilsList = (props) => {
    const { tempDatapoint, setTempDatapoint } = props;
    const handleNewSoil = () => {
        const newSoil = {
            id: dateToUniqueId(),
            depthStart: 0,
            depthEnd: 0,
            matrixColor: "HHYR V/C",
            matrixPercent: 0,
            redoxColor: "",
            redoxPercent: "",
            redoxType: "",
            redoxLocation: "",
            texture: "",
            remarks: ""
        };
        setTempDatapoint({
            ...tempDatapoint,
            soil: {
                ...tempDatapoint.soil,
                layers: [...tempDatapoint.soil.layers, newSoil]
            }
        });
    };

    const NewSoilItem = () => {
        return (
            <View>
                <ListItem
                    onPress={() => {
                        console.log("NewSoilItem pressed");
                        handleNewSoil();
                    }}
                    containerStyle={{
                        backgroundColor: "#EFEFEF",
                        borderColor: "#DDD",
                        borderWidth: 1
                    }}
                >
                    <ListItem.Content>
                        <ListItem.Title>New Soil</ListItem.Title>
                        <ListItem.Subtitle>Record a new soil layer</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        );
    };

    const RenderSoilItem = ({ item: soilLayer }) => {
        return (
            <SwipeRow rightOpenValue={-100}>
                {/* delete soil */}
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
                                "Delete Soil Layer",
                                `Are you sure you want to delete item for ${soilLayer.matrixColor}?`,
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
                                            const soilArr = tempDatapoint.soil.layers;
                                            setTempDatapoint({
                                                ...tempDatapoint,
                                                soil: {
                                                    ...tempDatapoint.soil,
                                                    layers: soilArr.filter((entry) => entry.id != soilLayer.id)
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
                            console.log("Soil layer pressed: ", soilLayer.matrixColor);
                            console.log(soilLayer);
                            // navigation.navigate("EditDatapoint", { datapoint });
                        }}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{soilLayer.matrixColor}</ListItem.Title>
                            <ListItem.Subtitle>{`${soilLayer.depthStart}" - ${soilLayer.depthEnd}"`}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </SwipeRow>
        );
    };

    return (
        <View>
            <Text>Soil View Placeholder</Text>
            <NewSoilItem />

            {tempDatapoint.soil.layers.map((item) => {
                if (item) {
                    console.log(item);
                    return (
                        <View key={item.id.toString()}>
                            <RenderSoilItem item={item} />
                            <Text>{item.id.toString()}</Text>
                        </View>
                    );
                }
            })}
        </View>
    );
};

export default SoilsList;
