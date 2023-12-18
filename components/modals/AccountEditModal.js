import { useState, useEffect } from "react";
import { View, ScrollView, Text, Modal, Alert, FlatList, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, ListItem } from "react-native-elements";
import { addToken, addUser, deleteToken } from "../../reducers/settingsReducer";
import { styles } from "../../styles";

const AccountEditModal = (props) => {
    const {
        showAccountEditModal,
        setShowAccountEditModal,
        settings,
        logout
    } = props;

    const [collapseDanger, setCollapseDanger] = useState(true);
    const [showAccountDelete, setShowAccountDelete] = useState(false);
    const [confirmDeleteText, setConfirmDeleteText] = useState("");
    const [confirmDeleteRng, setConfirmDeleteRng] = useState("");
    const [tempPassword, setTempPassword] = useState("");

    const resetDeleteRng = () => {
        // Assigns confirmDeleteRng a random value between "0000" and "9999"
        const num = Math.floor(Math.random()*10000).toString().padStart(4, '0');
        setConfirmDeleteRng(num);
    }

    const deleteAccount = async() => {
        const serverUrl = String(settings.settingsObject.server)
        
        console.log("Attempting account deletion...");
        try {
            const response = await fetch(`${serverUrl}/api/users`,
            {
                method: "DELETE",
                headers: {
                    // "Accept": "text/plain",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${settings.settingsObject.token}`
                },
                body: JSON.stringify({
                    password: tempPassword
                })
            })
            console.log(response.ok);
            console.log(JSON.stringify(response, null, 2));
            if (response.ok) {
                logout();
            } else {
                alert("HTTP error: " + response.status);
            }
        }
        catch(error) {
            console.error(error);
        }

    };
    

    return(
        <Modal
            transparent={false}
            visible={showAccountEditModal}
            onRequestClose={() => setShowAccountEditModal(!showAccountEditModal)}
        >
            <ScrollView style={styles.projectContainer} contentContainerStyle={{ flexGrow: 1 }}>
                {/* account edit */}
                <Text style={styles.projectHeaderText}>Edit Account</Text>
                <Text style={styles.projectText}>
                    Section to be implemented.
                    {"\n"}To delete your account, proceed to the danger zone below.
                </Text>
                {/* danger zone - account deletion etc */}
                <View style={styles.sectionContainer}>
                    <TouchableOpacity
                        style={styles.sectionHeader}
                        onPress={() => {
                            setShowAccountDelete(false);
                            setConfirmDeleteText("");
                            setCollapseDanger(!collapseDanger);
                            resetDeleteRng();
                        }}
                    >
                        <Text style={styles.projectHeaderText}>Danger Zone</Text>
                        {collapseDanger && (
                            <Text style={styles.projectInfoText}>
                                Press here expand. This is where you can delete your account.
                            </Text>
                        )}
                    </TouchableOpacity>

                    <Collapsible collapsed={collapseDanger} renderChildrenCollapsed={false}>
                        {showAccountDelete &&
                        <View>
                            <Text style={styles.projectText}>
                                To confirm account deletion, input your password and the 4-digit number shown below.
                                {"\n"}
                            </Text>
                            <Text style={styles.projectText}>Password</Text>
                            <Input
                                value = {tempPassword}
                                onChangeText={(text) => {setTempPassword(text)}}
                                placeholder="Password"
                                secureTextEntry={true}
                            />
                            <Text style={styles.projectText}>Confirmation Code</Text>
                            <Text style={{...styles.projectText, fontWeight:"bold"}}>
                                {confirmDeleteRng}
                            </Text>
                            <Input
                                value = {confirmDeleteText}
                                keyboardType="number-pad"
                                onChangeText={(text) => {
                                    setConfirmDeleteText(text);
                                    // compareConfirmNumber(confirmDeleteText, confirmDeleteRng);
                                }}
                                placeholder="0000"
                            />
                        </View>
                        }
                        <Button
                                title="Delete Account"
                                buttonStyle={styles.buttonSecondary}
                                titleStyle={styles.buttonSecondaryText}
                                disabled={showAccountDelete && (confirmDeleteText !== confirmDeleteRng)}
                                onPress={() => {
                                    console.log("Delete button pressed");
                                    if (!showAccountDelete){
                                        setShowAccountDelete(!showAccountDelete);
                                    }
                                    // if (confirmMatch){
                                    if (confirmDeleteText === confirmDeleteRng){
                                        console.log('Confirmation numbers match');
                                        // proceed to make DELETE request
                                        deleteAccount();
                                    } else {
                                        console.log('Confirmation numbers do not match');
                                        console.log(`input: ${confirmDeleteText} target: ${confirmDeleteRng}`)
                                    }                                    
                                }}
                            />
                    </Collapsible>
                </View>
                {/* <Text style={styles.projectText}>Username</Text>
                <Input
                    onChangeText={(text) => {setTempUsername(text)}}
                    value = {tempUsername}
                    placeholder="llama"
                />
                <Text style={styles.projectText}>Password</Text>
                <Input
                    value = {tempPassword}
                    onChangeText={(text) => {setTempPassword(text)}}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <Text style={styles.projectText}>Confirm Password</Text>
                <Input
                    value = {tempConfirmPassword}
                    onChangeText={(text) => {setTempConfirmPassword(text)}}
                    placeholder="Password"
                    secureTextEntry={true}
                /> */}
                {/* save/cancel buttons */}
                <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 8 }}>
                    {/* <View style={{ flexDirection: "row" }}> */}
                       <Button
                            title="Submit"
                            buttonStyle={styles.buttonMain}
                            titleStyle={styles.buttonMainText}
                            onPress={() => {
                                console.log("Submit button pressed")
                                // resetForm();
                            }}
                        />
                        <Button
                            title="Cancel"
                            buttonStyle={styles.buttonSecondary}
                            titleStyle={styles.buttonSecondaryText}
                            onPress={() => {
                                setCollapseDanger(true);
                                setShowAccountDelete(false);
                                setShowAccountEditModal(!showAccountEditModal);
                                // resetForm();
                            }}
                        />
                    {/* </View> */}
                </View>
            </ScrollView>
        </Modal>
    )
}

export default AccountEditModal;