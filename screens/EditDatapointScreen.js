import { View, ScrollView, Text } from "react-native";

const EditDatapointScreen = ({ route }) => {
    const { datapoint } = route.params;

    return (
        <View><Text>{datapoint.name}</Text></View>
    )
}

export default EditDatapointScreen;