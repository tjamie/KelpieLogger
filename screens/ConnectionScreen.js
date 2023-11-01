import { View, Text, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { Button, Input, ListItem } from "react-native-elements";
import { styles } from "../styles";

const ConnectionScreen = () => {

    const [signedIn, setSignedIn] = useState(false);

    return(
        <View style={styles.projectContainer}>
            {/* Server info */}
            <Text style={styles.projectHeaderText}>Server</Text>
            <View style={{flexDirection: "row"}}>
                {/* Host Address */}
                <View style={{flex: 3}}>
                    <Text style={styles.projectText}>Address</Text>
                    <Input
                        onChangeText={(text) => {}}
                        placeholder="127.0.0.1"
                    />
                </View>

                {/* Host Port */}
                <View style={{flex: 1}}>
                    <Text style={styles.projectText}>Port</Text>
                    <Input
                        onChangeText={(text) => {}}
                        placeholder="443"
                    />
                </View>
            </View>

            {/* Account section - username, password, etc */}
            <Text style={styles.projectHeaderText}>Account</Text>
            <Text style={styles.projectText}>Username</Text>
            <Input
                onChangeText={(text) => {}}
                placeholder="llama"
            />
            <Text style={styles.projectText}>Password</Text>
            <Input
                onChangeText={(text) => {}}
                placeholder="Password"
                secureTextEntry={true}
            />

            {/* buttons etc */}
            <Button
                title='Sign In'
                onPress={() => {console.log("Sign in pressed")}}
                buttonStyle={styles.buttonMain}
                titleStyle={styles.buttonMainText}
            />
            
            <Button
                title='Register'
                onPress={() => {console.log("Register pressed")}}
                buttonStyle={styles.buttonMain}
                titleStyle={styles.buttonMainText}
            />
        </View>
    )
}

export default ConnectionScreen;