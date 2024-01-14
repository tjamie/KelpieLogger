import { useState } from "react";
import { Text, View, ScrollView, FlatList, Modal, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "react-native-elements";
import { ListItem } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";
import { SwipeRow } from "react-native-swipe-list-view";
import { createUniqueId } from "../utils/createUniqueId";
import Loading from "../components/LoadingComponent";
import { addProject, deleteProject } from "../reducers/projectsReducer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../styles";

const ProjectsScreen = ({ navigation }) => {
    const projects = useSelector((state) => state.projects);
    const settings = useSelector((state) => state.settings);
    const dispatch = useDispatch();

    const [showNewProjectModal, setShowNewProjectModal] = useState(false);

    const [syncButtonText, setSyncButtonText] = useState("Sync Projects");

    // USACE Data Form Project-Wide Fields
    const [projectName, setProjectName] = useState("");
    const [projectApplicant, setProjectApplicant] = useState("");
    const [projectCounty, setProjectCounty] = useState("");
    const [projectState, setProjectState] = useState("");
    const [projectSection, setProjectSection] = useState(""); //only applicable to certain areas
    const [projectRegion, setProjectRegion] = useState("");
    const [projectSubregion, setProjectSubregion] = useState("");
    const [projectDatum, setProjectDatum] = useState("");

    const handleSubmit = () => {
        const newProject = {
            projectName,
            projectApplicant,
            projectCounty,
            projectState,
            projectSection,
            projectRegion,
            projectSubregion,
            projectDatum,
            id: createUniqueId(),
            updatedDate: Date.now()
        };
        console.log("New project: ", newProject);
        //dispatch
        dispatch(addProject(newProject));
        setShowNewProjectModal(!showNewProjectModal);
    };

    const resetForm = () => {
        setProjectName("");
        setProjectApplicant("");
        setProjectCounty("");
        setProjectState("");
        setProjectSection("");
        setProjectSubregion("");
    };

    if (projects.isLoading) {
        return <Loading />;
    }
    if (projects.errMess) {
        return (
            <View>
                <Text>{projects.errMess}</Text>
            </View>
        );
    }

    const NewProjectItem = () => {
        return (
            <View>
                <ListItem
                    onPress={() => {
                        console.log("NewProjectItem pressed");
                        setShowNewProjectModal(true);
                    }}
                    containerStyle={styles.listHeadContainer}
                >
                    <ListItem.Content>
                        <ListItem.Title style={styles.listPrimaryText}>New Project</ListItem.Title>
                        <ListItem.Subtitle style={styles.listSecondaryText}>Create a new project</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        );
    };

    const handleDeleteProject = (project) =>{
        Alert.alert(
            "Delete Project",
            `Are you sure you want to delete project ${project.projectName}?`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Not deleted"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => dispatch(deleteProject(project.id))
                }
            ],
            { cancelable: false }
        )
    }

    const renderProjectItem = ({ item: project }) => {
        return (
            <View>
                <ListItem.Swipeable
                    rightContent={()=>(
                        <Button
                            title="Delete"
                            onPress={()=>{handleDeleteProject(project)}}
                            icon={{ name: 'trash-2', type:'feather', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                        />
                    )}
                    onPress={() => {
                        console.log("Project pressed: ", project.id);
                        navigation.navigate("ProjectInformation", { project });
                    }}
                    containerStyle={styles.listContainer}
                >
                    <ListItem.Content>
                        <ListItem.Title style={styles.listPrimaryText}>{project.projectName}</ListItem.Title>
                        <ListItem.Subtitle style={styles.listSecondaryText}>
                            {project.projectCounty}, {project.projectState}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem.Swipeable>
            </View>
        );
    };

    return (
        <View style={styles.projectContainer}>
            <Text style={styles.projectInfoText}>
                Press "New Project" to create a new project. Each project can contain multiple datapoints.
            </Text>
            {/* only render sync button if user token exists */}
            {/* {settings.settingsObject.token &&
            <>
            <Text style={styles.projectInfoText}>
                Missing projects? Press the sync button below.
            </Text>
            <Button
                title={syncButtonText}
                onPress={() => {
                    console.log("Sync button pressed");
                    // syncProject();
                }}
                buttonStyle={styles.buttonMain}
                titleStyle={styles.buttonMainText}
            />
            </>}  */}
            <NewProjectItem />
            <FlatList
                data={projects.projectsArray}
                renderItem={renderProjectItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <Modal
                transparent={false}
                visible={showNewProjectModal}
                onRequestClose={() => setShowNewProjectModal(!showNewProjectModal)}
            >
                <ScrollView style={styles.projectContainer} contentContainerStyle={{ flexGrow: 1 }}>
                    {/* project elements */}
                    <View style={{ flex: 1 }}>
                        <Text style={styles.projectHeaderText}>New Project Details</Text>
                        <View>
                            <Text style={styles.projectText}>Project Name</Text>
                            <Input
                                placeholder="Project Name"
                                // leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                // leftIconContainerStyle={{ paddingRight: 10 }}
                                onChangeText={(projectName) => setProjectName(projectName)}
                                value={projectName}
                            />
                        </View>
                        <View>
                            <Text style={styles.projectText}>Owner/Applicant</Text>
                            <Input
                                placeholder="Owner/Applicant"
                                onChangeText={(projectApplicant) => setProjectApplicant(projectApplicant)}
                                value={projectApplicant}
                            />
                        </View>
                        <View>
                            <Text style={styles.projectText}>City/County</Text>
                            <Input
                                placeholder="City/County"
                                onChangeText={(projectCounty) => setProjectCounty(projectCounty)}
                                value={projectCounty}
                            />
                        </View>
                        <View>
                            <Text style={styles.projectText}>State</Text>
                            <Input
                                placeholder="State"
                                onChangeText={(projectState) => setProjectState(projectState)}
                                value={projectState}
                            />
                        </View>
                        <View>
                            <Text style={styles.projectText}>
                                Section, Township, Range {"("}optional{")"}
                            </Text>
                            <Input
                                placeholder="Section, Township, Range"
                                onChangeText={(projectSection) => setProjectSection(projectSection)}
                                value={projectSection}
                            />
                        </View>
                        <View>
                            <Text style={styles.projectText}>Region</Text>
                            <Picker
                                selectedValue={projectRegion}
                                onValueChange={(region) => {
                                    setProjectRegion(region);
                                }}
                            >
                                <Picker.Item label="-" value="" />
                                <Picker.Item label="AGCP - Atlantic and Gulf Coastal Plain" value="AGCP" />
                                <Picker.Item label="EMP - Eastern Mountains and Piedmont" value="EMP" />
                                <Picker.Item label="MW - Midwest" value="MW" />
                                <Picker.Item label="NCNE - Northcentral and Northeast" value="NCNE" />
                            </Picker>
                        </View>
                        <View>
                            <Text style={styles.projectText}>
                                Subregion {"("}LRR and/or MLRA{")"}
                            </Text>
                            <Input
                                placeholder="Subregion"
                                onChangeText={(projectSubregion) => setProjectSubregion(projectSubregion)}
                                value={projectSubregion}
                            />
                        </View>
                        <View>
                            <Text style={styles.projectText}>Datum</Text>
                            <Input
                                placeholder="Datum"
                                onChangeText={(projectDatum) => setProjectDatum(projectDatum)}
                                value={projectDatum}
                            />
                        </View>
                    </View>
                    {/* save/cancel buttons */}
                    <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 8 }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, paddingRight: 2 }}>
                                <Button
                                    title="Submit"
                                    buttonStyle={styles.buttonMain}
                                    titleStyle={styles.buttonMainText}
                                    onPress={() => {
                                        handleSubmit();
                                        resetForm();
                                    }}
                                />
                            </View>
                            <View style={{ flex: 1, paddingLeft: 2 }}>
                                <Button
                                    title="Cancel"
                                    buttonStyle={styles.buttonSecondary}
                                    titleStyle={styles.buttonSecondaryText}
                                    onPress={() => {
                                        setShowNewProjectModal(!showNewProjectModal);
                                        resetForm();
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
};

export default ProjectsScreen;
