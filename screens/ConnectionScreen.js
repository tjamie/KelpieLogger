import { useState, useEffect } from "react";
import { View, ScrollView, Text, Modal, Alert, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, ListItem } from "react-native-elements";
import { addToken, deleteToken, addUser, deleteUser, addServer, deleteServer } from "../reducers/settingsReducer";
import { Picker } from "@react-native-picker/picker";
import RegistrationModal from "../components/modals/RegistrationModal";
import AccountEditModal from "../components/modals/AccountEditModal";
import { styles } from "../styles";

const ConnectionScreen = () => {

    // const [signedIn, setSignedIn] = useState(false);
    const [address, setAddress] = useState("");
    const [port, setPort] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [tempAddress, setTempAddress] = useState("");
    const [tempPort, setTempPort] = useState("");
    const [tempUsername, setTempUsername] = useState("");
    const [tempPassword, setTempPassword] = useState("");
    const [tempConfirmPassword, setTempConfirmPassword] = useState("");
    const [webProtocol, setWebProtocol] = useState("https");
    // const [syncButtonText, setSyncButtonText] = useState("Sync Projects");
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [showAccountEditModal, setShowAccountEditModal] = useState(false);
    const settings = useSelector((state) => state.settings);
    const dispatch = useDispatch();


    const fillUrl = (addressInput, portInput) => {
        const url = portInput.length > 0
            ? webProtocol + "://" + addressInput + ":" + portInput
            : webProtocol + "://" + addressInput;
        
        console.log(`Address: ${addressInput}`);
        console.log(`Port: ${portInput}`);
        console.log(`Constructed URL: ${url}`);
        return url;
    }

    const initializeRegistrationModal = () => {
        setTempAddress(address);
        setTempPort(port);
        setTempUsername("");
        setTempPassword("");
        setTempConfirmPassword("");
    }

    const handleRegistrationSubmit = async() => {
        if (tempUsername.length < 5){
            alert("Username must be at least 5 characters long.");
        }
        if (tempPassword !== tempConfirmPassword){
            alert("Passwords must match.");
            setTempPassword("");
            setTempConfirmPassword("");
            console.log("Passwords do not match");
            return;
        }
        if (tempPassword.length < 8){
            alert("Password must be at least 8 characters long.")
            return;
        }
        console.log("Passwords match");        
        
        const url = fillUrl(tempAddress, tempPort)

        // Attempt to post new user
        try{
            const response = await fetch(url + "/api/users",
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: tempUsername,
                    password: tempPassword
                })
            })
            if (response.ok){
                console.log("Registration successful");
                setUsername(tempUsername);
                setPassword(tempPassword);
                setAddress(tempAddress);
                setPort(tempPort);
                setShowRegistrationModal(!showRegistrationModal);
            } else {
                const responseText = await response.text();
                console.log(responseText);
                const errMsg = responseText
                    ? `HTTP error: ${response.status} ${responseText}`
                    : `HTTP error: ${response.status}`;
                alert(errMsg);
            }
        }
        catch(error) {
            console.error(error);
        }
    }

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
                dispatch(addServer(serverUrl));
                console.log(settings);
                // console.log(settings.settingsObject);
            } else {
                alert("HTTP error: " + response.status);
            }
        }
        catch(error) {
            console.error(error);
        }

    };

    const logout = () => {
        try {
            dispatch(deleteToken());
            dispatch(deleteServer());
            dispatch(deleteUser());
            // console.log(`Deleted token/server/user info from store. Settings:\n${settings}`)
        }
        catch(error) {
            console.error(error);
        }
    }

    // TODO
    // const syncProjects = () => {
    //     const serverUrl = String(settings.settingsObject.server);

    //     // send locals to server, do server side checks to see what does/doesn't exist and check
    //     // for most recent version of each project, update both server and client with whichever is
    //     // newer
    // }

    return(
        <View style={styles.projectContainer}>
            {/* signin/registration container -- render when token is not present */}
            {!settings.settingsObject.token &&
            <View>
                {/* modals */}
                <RegistrationModal
                    showRegistrationModal = {showRegistrationModal}
                    setShowRegistrationModal = {setShowRegistrationModal}
                    tempAddress = {tempAddress}
                    setTempAddress = {setTempAddress}
                    tempPort = {tempPort}
                    setTempPort = {setTempPort}
                    tempUsername = {tempUsername}
                    setTempUsername = {setTempUsername}
                    tempPassword = {tempPassword}
                    setTempPassword = {setTempPassword}
                    tempConfirmPassword = {tempConfirmPassword}
                    setTempConfirmPassword = {setTempConfirmPassword}
                    handleRegistrationSubmit = {handleRegistrationSubmit}
                />
                {/* Server info */}
                <Text style={styles.projectHeaderText}>Server Configuration</Text>
                <View style={{flexDirection: "row"}}>
                    {/* protocol */}
                    <View style={{flex:4}}>
                        <Text style={styles.projectText}>Protocol</Text>
                        <Picker
                            selectedValue={webProtocol}
                            onValueChange={(protocol) => {
                                setWebProtocol(protocol);
                            }}
                        >
                            <Picker.Item label="HTTP" value="http" />
                            <Picker.Item label="HTTPS" value="https" />
                        </Picker>
                    </View>

                    {/* Host Address */}
                    <View style={{flex: 5}}>
                        <Text style={styles.projectText}>Address</Text>
                        <Input
                            value = {address}
                            onChangeText={(text) => {setAddress(text)}}
                            placeholder="127.0.0.1"
                        />
                    </View>

                    {/* Host Port */}
                    <View style={{flex: 2}}>
                        <Text style={styles.projectText}>Port</Text>
                        <Input
                            value = {port}
                            onChangeText={(text) => {setPort(text)}}
                            placeholder="443"
                        />
                    </View>
                </View>

                {/* Account section - username, password, etc */}
                <Text style={styles.projectHeaderText}>Account</Text>
                <Text style={styles.projectText}>Username</Text>
                <Input
                    value = {username}
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
                    onPress={() => {
                        console.log("Register pressed");
                        initializeRegistrationModal();
                        setShowRegistrationModal(true);
                        //setmodalvis etc
                    }}
                    buttonStyle={styles.buttonMain}
                    titleStyle={styles.buttonMainText}
                />
            </View>
            }

            {/* active user etc container -- render when token is present */}
            {settings.settingsObject.token &&
            <View>
                {/* modals */}
                <AccountEditModal
                    showAccountEditModal = {showAccountEditModal}
                    setShowAccountEditModal = {setShowAccountEditModal}
                    settings = {settings}
                    logout = {logout}
                />
                {/* info display */}
                <Text style={styles.projectHeaderText}>Account</Text>
                <Text style={styles.projectText}>Username: {settings.settingsObject.user}</Text>
                <Text style={styles.projectText}>Server: {String(settings.settingsObject.server)}</Text>
                {/* buttons */}
                {/* <Button
                    title={syncButtonText}
                    onPress={() => {
                        console.log("Sync button pressed");
                    }}
                    buttonStyle={styles.buttonMain}
                    titleStyle={styles.buttonMainText}
                />    */}
                <Button
                    title='Edit Account'
                    onPress={() => {
                        console.log("Edit account button pressed");
                        setShowAccountEditModal(!showAccountEditModal);
                    }}
                    buttonStyle={styles.buttonMain}
                    titleStyle={styles.buttonMainText}
                />
                <Button
                    title='Sign Out'
                    onPress={() => {
                        console.log("Sign out pressed");
                        logout();
                    }}
                    buttonStyle={styles.buttonMain}
                    titleStyle={styles.buttonMainText}
                />
            </View>
            }
        </View>
    )
}

export default ConnectionScreen;