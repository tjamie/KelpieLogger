import { dateToUniqueId } from "../utils/dateToUniqueId";
import { SwipeRow } from "react-native-swipe-list-view";
import { Text, View, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DeviceEventEmitter } from "react-native";
import { styles } from "../styles";
import { useState } from "react";

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
                    containerStyle={styles.subsectionListHeadContainer}
                >
                    <ListItem.Content>
                        <ListItem.Title style={styles.listPrimaryText}>New Plant</ListItem.Title>
                        <ListItem.Subtitle style={styles.listSecondaryText}>Record a new plant</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        );
    };

    const RenderPlantItem = ({ item: plant }) => {
        const [vegetation, setVegetation] = useState(tempDatapoint.vegetation);
        return (
            <SwipeRow rightOpenValue={-100}>
                {/* delete plant */}
                {/* <View style={styles.swipeBackground}> */}
                    <TouchableOpacity
                        style={styles.swipeDelete}
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
                {/* </View> */}
                {/* view plant */}
                <View>
                    <ListItem
                        onPress={() => {
                            DeviceEventEmitter.addListener("updatePlantData", (tempPlant) => {
                                // console.log("tempPlant:", tempPlant);

                                // replace old version of target plant with updated information and calculate cover
                                let totalCover = 0;
                                // const tempArr = tempDatapoint.vegetation.strata[stratum];
                                const tempArr = vegetation.strata[stratum];
                                const newStratumArr = tempArr.map((obj) => {
                                    if (obj.id === tempPlant.id) {
                                        totalCover = tempPlant.cover ? totalCover + tempPlant.cover : totalCover;
                                        return tempPlant;
                                    }
                                    totalCover = obj.cover ? totalCover + obj.cover : totalCover;
                                    return obj;
                                });
                                console.log("total cover:", totalCover);

                                // sort stratum by descending cover and apply 50-20 rule
                                // if two plants of equivalent cover in the same stratum are each under 20% and the
                                // first breaks the 50% threshold, want to include both
                                let dominantCover = 0;
                                let prevDominant = false;
                                const sortedStratumArr = [...newStratumArr]
                                    .sort((a, b) => b.cover - a.cover)
                                    .map((obj, idx, arr) => {
                                        if (
                                            dominantCover < 50
                                            || obj.cover >= totalCover * 0.2
                                            || (idx > 0 && obj.cover === arr[idx-1].cover && prevDominant)
                                            ) {
                                            dominantCover += obj.cover;
                                            prevDominant = true;
                                            return { ...obj, dominant: true };
                                        }
                                        prevDominant = false;
                                        return { ...obj, dominant: false };
                                    });
                                console.log("new stratum arr:", sortedStratumArr);

                                console.log("setting temp vegetation");
                                let tempVegetation = {
                                    ...vegetation,
                                    strata: {
                                        ...vegetation.strata,
                                        [stratum]: sortedStratumArr
                                    }
                                };
                                // console.log("vegetation object:", JSON.stringify(tempVegetation, null, 4));

                                // determine vegetation indicators
                                const plantsCombined = [
                                    ...tempVegetation.strata.herb,
                                    ...tempVegetation.strata.vine,
                                    ...tempVegetation.strata.saplingShrub,
                                    ...tempVegetation.strata.tree
                                ];
                                if (plantsCombined && plantsCombined.length > 0) {
                                    let indicators = {
                                        rapidTest: false,
                                        domTest: false,
                                        prevIndex: false,
                                        domWet: 0,
                                        domTotal: 0,
                                        prevIndexValue: 0
                                    };

                                    let domCount = {
                                        UPL: 0,
                                        FACU: 0,
                                        FAC: 0,
                                        FACW: 0,
                                        OBL: 0
                                    };
                                    let statusCover = {
                                        UPL: 0,
                                        FACU: 0,
                                        FAC: 0,
                                        FACW: 0,
                                        OBL: 0
                                    };

                                    // counts number of dominant species per stratum and sums total cover per stratum
                                    // species listings with no recorded indicator status will be ignored
                                    plantsCombined.forEach((item) => {
                                        if (item.cover > 0 && item.indicator.toUpperCase() in domCount) {
                                            if (item.dominant) {
                                                ++domCount[item.indicator.toUpperCase()];
                                            }
                                            statusCover[item.indicator.toUpperCase()] += item.cover;
                                        }
                                    });

                                    // check rapid test
                                    if (
                                        !domCount.UPL &&
                                        !domCount.FACU &&
                                        !domCount.FAC &&
                                        (domCount.FACW || domCount.OBL)
                                    ) {
                                        indicators.rapidTest = true;
                                    }

                                    // check dominance test
                                    indicators.domWet = domCount.OBL + domCount.FACW + domCount.FAC;
                                    indicators.domTotal = indicators.domWet + domCount.FACU + domCount.UPL;
                                    if (indicators.domWet > domCount.FACU + domCount.UPL) {
                                        indicators.domTest = true;
                                    }

                                    // calculate prevalence index - must be <= 3.0 for indicator
                                    const totalVegetationCover =
                                        statusCover.OBL + statusCover.FACW + statusCover.FAC + statusCover.FACU + statusCover.UPL;
                                    const multipliedCover =
                                        statusCover.OBL +
                                        statusCover.FACW * 2 +
                                        statusCover.FAC * 3 +
                                        statusCover.FACU * 4 +
                                        statusCover.UPL * 5;
                                    indicators.prevIndexValue = multipliedCover / totalVegetationCover;
                                    if (indicators.prevIndexValue <= 3) {
                                        indicators.prevIndex = true;
                                    }

                                    // update tempVegetation with indicators
                                    tempVegetation = {
                                        ...tempVegetation,
                                        indicators: {
                                            ...vegetation.indicators,
                                            ...indicators
                                        }
                                    };
                                }

                                // update datapoint with new vegetation
                                setTempDatapoint({
                                    ...tempDatapoint,
                                    vegetation: tempVegetation
                                });
                            });

                            console.log("Target plant:", plant);
                            navigation.navigate("EditPlant", { plant, tempDatapoint });
                        }}
                        containerStyle={styles.subsectionListContainer}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={styles.listPrimaryText}>{plant.species}</ListItem.Title>
                            <ListItem.Subtitle style={styles.listSecondaryText}>
                                {`${plant.indicator} - ${plant.cover}% cover`}
                                {plant.dominant && ` (dominant)`}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </SwipeRow>
        );
    };

    return (
        <View>
            {/* <Text>Vegetation ({stratum})</Text> */}
            <NewPlantItem />
            {tempDatapoint.vegetation.strata[stratum].map((item) => {
                if (item) {
                    return (
                        <View key={item.id.toString()}>
                            <RenderPlantItem item={item} />
                            {/* <Text>{item.id.toString()}</Text> */}
                        </View>
                    );
                }
            })}
        </View>
    );
};

export default PlantsList;
