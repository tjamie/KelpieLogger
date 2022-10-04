import { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { ListItem, Button, Input, CheckBox } from "react-native-elements";

const DatapointScreen = ({ route }) => {
    const { datapoint } = route.params;
    let tempDatapoint = datapoint;
    const [hydrology, setHydrology] = useState(datapoint.hydrology);
    const [tempBool, setTempBool] = useState(false)

    return (
        <ScrollView>
            <View><Text>{datapoint.name}</Text></View>

            <CheckBox
                title='Hydrology disturbed?'
                checked={hydrology.disturbed}
                onPress={() => {
                    tempDatapoint.hydrology.disturbed = !hydrology.disturbed
                    setHydrology(tempDatapoint.hydrology)
                    console.log(hydrology)
                }}
            />
        </ScrollView>
    )
}

export default DatapointScreen;