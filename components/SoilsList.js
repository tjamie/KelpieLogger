import { dateToUniqueId } from "../utils/dateToUniqueId";
import { SwipeRow } from "react-native-swipe-list-view";
import { Text, View, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DeviceEventEmitter } from "react-native";
import { styles } from "../styles";

const SoilsList = (props) => {
    const { navigation, tempDatapoint, setTempDatapoint } = props;
    const handleNewSoil = () => {
        const newSoil = {
            id: dateToUniqueId(),
            depthStart: 0,
            depthEnd: 0,
            matrixColor: {
                hue: "0YR",
                value: "0",
                chroma: "0"
            },
            matrixPercent: 0,
            redoxColor: {
                hue: "",
                value: "",
                chroma: ""
            },
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
                    containerStyle={styles.subsectionListHeadContainer}
                >
                    <ListItem.Content>
                        <ListItem.Title style={styles.listPrimaryText}>New Soil</ListItem.Title>
                        <ListItem.Subtitle style={styles.listSecondaryText}>Record a new soil layer</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        );
    };

    const SoilLabel = (soil) =>{
        // label for soil hue/value/chroma
        const soilLayer = soil.soil
        //console.log(soilLayer)
        let text = `${soilLayer.matrixColor.hue} ${soilLayer.matrixColor.value}/${soilLayer.matrixColor.chroma} (${soilLayer.matrixPercent}%)`
        
        if (soilLayer.redoxColor.hue){
            text += ` -- ${soilLayer.redoxColor.hue} ${soilLayer.redoxColor.value}/${soilLayer.redoxColor.chroma} (${soilLayer.redoxPercent}%)`
        }
        
        return(
            text            
        )
    }

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
                {/* view soil */}
                <View>
                    <ListItem
                        onPress={() => {
                            DeviceEventEmitter.addListener("updateSoilData", (tempSoil) => {
                                const tempArr = tempDatapoint.soil.layers;
                                // replace old soil layer with new soil layer
                                const newSoilArr = tempArr.map((obj) => {
                                    if (obj.id === tempSoil.id) {
                                        return tempSoil;
                                    }
                                    return obj;
                                });
                                // sort soil layers by start depth
                                const sortedSoilArr = [...newSoilArr].sort((a, b) => a.depthStart - b.depthStart);

                                setTempDatapoint({
                                    ...tempDatapoint,
                                    soil: {
                                        ...tempDatapoint.soil,
                                        layers: sortedSoilArr
                                    }
                                });
                            });
                            // console.log("Target soil: ", soilLayer);
                            navigation.navigate("EditSoil", { soilLayer, tempDatapoint });
                        }}
                        containerStyle={styles.subsectionListContainer}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={styles.listPrimaryText}>
                                {/* break up the label to make it easier to change based on redox presence */}
                                <SoilLabel soil={soilLayer}/>
                            </ListItem.Title>
                            <ListItem.Subtitle
                                style={styles.listSecondaryText}
                            >{`${soilLayer.depthStart}" - ${soilLayer.depthEnd}"`}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </SwipeRow>
        );
    };

    return (
        <View>
            {/* <Text>Soil View Placeholder</Text> */}
            <NewSoilItem />

            {tempDatapoint.soil.layers.map((item) => {
                if (item) {
                    return (
                        <View key={item.id.toString()}>
                            <RenderSoilItem item={item} />
                            {/* <Text>{item.id.toString()}</Text> */}
                        </View>
                    );
                }
            })}
        </View>
    );
};

export default SoilsList;
