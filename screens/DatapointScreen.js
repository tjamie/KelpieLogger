import { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { ListItem, Button, Input, CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { updateDatapoint } from "../reducers/datapointsReducer";

const DatapointScreen = ({ route }) => {
    const { datapoint } = route.params;
    // let tempDatapoint = datapoint;
    // const [hydrology, setHydrology] = useState(datapoint.hydrology);
    // const [tempHydrology, setTempHydrology] = useState(datapoint.hydrology)
    // const [tempBool, setTempBool] = useState(false)

    // setHydrology({
    //     ...tempHydrology,
    //     disturbed: true
    // })
    const [tempDatapoint, setTempDatapoint] = useState(datapoint);
    const [dp, setDp] = useState(datapoint);

    return (
        <ScrollView>
            <View><Text>{tempDatapoint.name}</Text></View>
            <Button
                title='print datapoint'
                onPress={() => console.log(JSON.stringify(tempDatapoint, 0, 2))}
            />
            <CheckBox
                title='Hydrology disturbed?'
                checked={tempDatapoint.hydrology.disturbed}
                onPress={() => {
                    setTempDatapoint({
                        ...tempDatapoint,
                        hydrology: {
                            ...tempDatapoint.hydrology,
                            disturbed: !tempDatapoint.hydrology.disturbed
                        }
                    })
                    // setHydrology(tempDatapoint.hydrology)
                    console.log(JSON.stringify(tempDatapoint, 0, 2))
                }}
            />
        </ScrollView>
    )
}

export default DatapointScreen;