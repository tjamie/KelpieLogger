import { useState, useEffect } from "react";
import { View, ScrollView, Text, Modal, Alert, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, ListItem } from "react-native-elements";
import { addToken, addUser, deleteToken } from "../../reducers/settingsReducer";
import { styles } from "../../styles";

const RegistrationModal = (props) => {
    const {
        showRegistrationModal,
        setShowRegistrationModal,
        tempAddress,
        setTempAddress,
        tempPort,
        setTempPort,
        tempUsername,
        setTempUsername,
        tempPassword,
        setTempPassword,
        tempConfirmPassword,
        setTempConfirmPassword,
        handleRegistrationSubmit
    } = props;

    return(
        <Modal
            transparent={false}
            visible={showRegistrationModal}
            onRequestClose={() => setShowRegistrationModal(!showRegistrationModal)}
        >
            <ScrollView style={styles.projectContainer} contentContainerStyle={{ flexGrow: 1 }}>
                {/* server elements */}
                <Text style={styles.projectHeaderText}>Server</Text>
                <View style={{flexDirection: "row"}}>
                    {/* Host Address */}
                    <View style={{flex: 3}}>
                        <Text style={styles.projectText}>Address</Text>
                        <Input
                            value = {tempAddress}
                            onChangeText={(text) => {setTempAddress(text)}}
                            placeholder="127.0.0.1"
                        />
                    </View>

                    {/* Host Port */}
                    <View style={{flex: 1}}>
                        <Text style={styles.projectText}>Port</Text>
                        <Input
                            value = {tempPort}
                            onChangeText={(text) => {setTempPort(text)}}
                            placeholder="443"
                        />
                    </View>
                </View>
                {/* server elements */}
                <Text style={styles.projectHeaderText}>Account</Text>
                <Text style={styles.projectText}>Username</Text>
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
                />
                {/* save/cancel buttons */}
                <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 8 }}>
                    {/* <View style={{ flexDirection: "row" }}> */}
                       <Button
                            title="Submit"
                            buttonStyle={styles.buttonMain}
                            titleStyle={styles.buttonMainText}
                            onPress={() => {
                                handleRegistrationSubmit();
                                // resetForm();
                            }}
                        />
                        <Button
                            title="Cancel"
                            buttonStyle={styles.buttonSecondary}
                            titleStyle={styles.buttonSecondaryText}
                            onPress={() => {
                                setShowRegistrationModal(!showRegistrationModal);
                                // resetForm();
                            }}
                        />
                    {/* </View> */}
                </View>
            </ScrollView>
        </Modal>
    )
}

export default RegistrationModal;