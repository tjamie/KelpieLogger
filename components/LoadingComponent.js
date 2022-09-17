import { ActivityIndicator, Text, View } from "react-native"

function Loading() {
    return (
        <View>
            <ActivityIndicator size='large' color='#000000' />
            <Text>Loading placeholder</Text>
        </View>
    )
}

export default Loading;