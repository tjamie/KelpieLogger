import { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, ListItem } from "react-native-elements";
import { addToken, addUser, deleteToken } from "../reducers/settingsReducer";
import { styles } from "../styles";
import { add } from "react-native-reanimated";

const ConnectionScreen = () => {

    const [signedIn, setSignedIn] = useState(false);
    const [address, setAddress] = useState("");
    const [port, setPort] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const settings = useSelector((state) => state.settings);
    const dispatch = useDispatch();


    const fillUrl = (addressInput, portInput) => {
        const url = port.length > 0
            ? "http://" + addressInput + ":" + portInput
            : "http://" + addressInput;
        
        console.log(`port length: ${port.length}`)
        console.log(`Constructed URL: ${url}`);
        return url;
    }    

    // const registerUser = async() => {
    //     const url = port.length > 0 ? "https://" + address : "https://" + address + ":" + port;
    //     try{
    //         const response = await fetch(url + "/api/users",
    //         {
    //             method: "POST",
    //             headers:{
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({

    //             })
    //         }
    //         )
    //     }
    // }

    const login = async() => {
        const serverUrl = fillUrl(address, port);
        
        console.log("Attempting login...");
        try {
            const response = await fetch(`${serverUrl}/api/auth/login`,
            {
                method: "POST",
                headers: {
                    // "Accept": "text/plain",
                    "Content-Type": "application/json",
                    // "Authorization": "placeholder"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                    // DB throwaway: admin, password
                })
            })
            console.log(response.ok);
            console.log(JSON.stringify(response, null, 2));
            if (response.ok) {
                // responseText is token
                let responseToken = await response.text();
                // console.log(responseText);
                dispatch(addToken(responseToken));
                dispatch(addUser(username));
                console.log(settings);
            } else {
                alert("HTTP error: " + response.status);
            }
        }
        catch(error) {
            console.error(error);
        }

    };

    return(
        <View style={styles.projectContainer}>
            {/* Server info */}
            <Text style={styles.projectHeaderText}>Server</Text>
            <View style={{flexDirection: "row"}}>
                {/* Host Address */}
                <View style={{flex: 3}}>
                    <Text style={styles.projectText}>Address</Text>
                    <Input
                        onChangeText={(text) => {setAddress(text)}}
                        placeholder="127.0.0.1"
                    />
                </View>

                {/* Host Port */}
                <View style={{flex: 1}}>
                    <Text style={styles.projectText}>Port</Text>
                    <Input
                        onChangeText={(text) => {setPort(text)}}
                        placeholder="443"
                    />
                </View>
            </View>

            {/* Account section - username, password, etc */}
            <Text style={styles.projectHeaderText}>Account</Text>
            <Text style={styles.projectText}>Username</Text>
            <Input
                onChangeText={(text) => {setUsername(text)}}
                placeholder="llama"
            />
            <Text style={styles.projectText}>Password</Text>
            <Input
                onChangeText={(text) => {setPassword(text)}}
                placeholder="Password"
                secureTextEntry={true}
            />

            {/* buttons etc */}
            <Button
                title='Sign In'
                onPress={() => {
                    console.log("Sign in pressed");
                    login();
                }}
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