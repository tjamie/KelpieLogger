import { useState } from "react";
import { Button, Input, Divider } from "react-native-elements";
import { ListItem } from "@rneui/themed";
import { ScrollView, View, Text, Modal, Alert } from "react-native";
import { SwipeRow } from "react-native-swipe-list-view";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../reducers/projectsReducer";
import { addDatapoint, deleteDatapoint } from "../reducers/datapointsReducer";
import { selectDatapointsByProjectId } from "../reducers/datapointsReducer";
import { FlatList } from "react-native-gesture-handler";
import DateComponent from "../components/DateComponent";
import { TouchableOpacity } from "react-native";
import { dateToUniqueId } from "../utils/dateToUniqueId";
import { styles } from "../styles";

const ProjectInformationScreen = (props) => {
    const { route, navigation } = props;

    const { project } = route.params;
    const [showProjectEditModal, setShowProjectEditModal] = useState(false);

    const [projectName, setProjectName] = useState(project.projectName);
    const [projectApplicant, setProjectApplicant] = useState(project.projectApplicant);
    const [projectCounty, setProjectCounty] = useState(project.projectCounty);
    const [projectState, setProjectState] = useState(project.projectState);
    const [projectSection, setProjectSection] = useState(project.projectSection);
    const [projectRegion, setProjectRegion] = useState(project.projectRegion);
    const [projectSubregion, setProjectSubregion] = useState(project.projectSubregion);
    const [projectDatum, setProjectDatum] = useState(project.projectDatum);
    const [projectUpdatedDate, setProjectUpdatedDate] = useState(project.updatedDate);

    const dispatch = useDispatch();

    const ProjectEditModal = (props) => {
        // const dispatch = useDispatch();
        const { showModal, setShowModal } = props;
        const [tempName, setTempName] = useState(projectName);
        const [tempApplicant, setTempApplicant] = useState(projectApplicant);
        const [tempCounty, setTempCounty] = useState(projectCounty);
        const [tempState, setTempState] = useState(projectState);
        const [tempSection, setTempSection] = useState(projectSection);
        const [tempRegion, setTempRegion] = useState(projectRegion);
        const [tempSubregion, setTempSubregion] = useState(projectSubregion);
        const [tempDatum, setTempDatum] = useState(projectDatum);

        const handleSubmit = () => {
            // set states now to reflect changes on project info screen without reloading
            const tempDate = Date.now();

            setProjectName(tempName);
            setProjectApplicant(tempApplicant);
            setProjectCounty(tempCounty);
            setProjectState(tempState);
            setProjectSection(tempSection);
            setProjectRegion(tempRegion);
            setProjectSubregion(tempSubregion);
            setProjectDatum(tempDatum);
            setProjectUpdatedDate(tempDate);

            const updatedProject = {
                // projectName,
                projectName: tempName,
                projectApplicant: tempApplicant,
                projectCounty: tempCounty,
                projectState: tempState,
                projectSection: tempSection,
                projectRegion: tempRegion,
                projectSubregion: tempSubregion,
                projectDatum: tempDatum,
                id: project.id,
                updatedDate: tempDate
            };

            console.log("Updated project:", updatedProject);
            dispatch(updateProject(updatedProject));
            setShowModal(!showModal);
        };

        return (
            <Modal transparent={false} visible={showModal} onRequestClose={() => setShowModal(!showModal)}>
                <ScrollView style={{ ...styles.projectContainer, flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    {/* project elements */}
                    <View style={{ flex: 1 }}>
                        <Text style={styles.projectHeaderText}>Project Details</Text>
                        <View>
                            <Text style={styles.projectText}>Project Name</Text>
                            <Input
                                placeholder="Project Name"
                                // leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                // leftIconContainerStyle={{ paddingRight: 10 }}
                                onChangeText={(tempName) => setTempName(tempName)}
                                value={tempName}
                            />
                        </View>
                        <View>
                            <Text style={styles.projectText}>Owner/Applicant</Text>
                            <Input
                                placeholder="Owner/Applicant"
                                onChangeText={(tempApplicant) => setTempApplicant(tempApplicant)}
                                value={tempApplicant}
                            />
                        </View>
                        <View>
                            <Text style={styles.projectText}>City/County</Text>
                            <Input
                                placeholder="City/County"
                                onChangeText={(tempCounty) => setTempCounty(tempCounty)}
                                value={tempCounty}
                            />
                        </View>
                        <View>
                            <Text style={styles.projectText}>State</Text>
                            <Input
                                placeholder="State"
                                onChangeText={(tempState) => setTempState(tempState)}
                                value={tempState}
                            />
                        </View>
                        <View>
                            <Text style={styles.projectText}>
                                Section, Township, Range {"("}optional{")"}
                            </Text>
                            <Input
                                placeholder="Section, Township, Range"
                                onChangeText={(tempSection) => setTempSection(tempSection)}
                                value={tempSection}
                            />
                        </View>
                        <View>
                            <Text style={styles.projectText}>Region</Text>
                            <Picker
                                selectedValue={tempRegion}
                                onValueChange={(region) => {
                                    setTempRegion(region);
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
                                onChangeText={(tempSubregion) => setTempSubregion(tempSubregion)}
                                value={tempSubregion}
                            />
                        </View>
                        <View>
                            <Text style={styles.projectText}>Datum</Text>
                            <Input
                                placeholder="Datum"
                                onChangeText={(tempDatum) => setTempDatum(tempDatum)}
                                value={tempDatum}
                            />
                        </View>
                    </View>
                    {/* save/cancel buttons */}
                    <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 8 }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, paddingRight: 2 }}>
                                <Button
                                    title="Save Changes"
                                    buttonStyle={styles.buttonMain}
                                    titleStyle={styles.buttonMainText}
                                    onPress={() => {
                                        handleSubmit();
                                        // resetForm();
                                    }}
                                />
                            </View>
                            <View style={{ flex: 1, paddingLeft: 2 }}>
                                <Button
                                    title="Cancel"
                                    buttonStyle={styles.buttonSecondary}
                                    titleStyle={styles.buttonSecondaryText}
                                    onPress={() => {
                                        setShowModal(!showModal);
                                        // resetForm();
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        );
    };

    const NewDatapointItem = () => {
        return (
            <View>
                <ListItem
                    onPress={() => {
                        console.log("NewDatapointItem pressed");
                        handleNewDatapoint();
                    }}
                    containerStyle={styles.listHeadContainer}
                >
                    <ListItem.Content>
                        <ListItem.Title style={styles.listPrimaryText}>New Datapoint</ListItem.Title>
                        <ListItem.Subtitle style={styles.listSecondaryText}>Create a new datapoint</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        );
    };

    const handleNewDatapoint = () => {
        // const dispatch = useDispatch();
        const newDatapoint = {
            id: dateToUniqueId(),
            projectId: project.id,
            name: "New Datapoint",
            date: Date.now(),
            authors: "",
            landform: "",
            relief: "",
            slope: "",
            lat: 0.0,
            long: 0.0,
            soilUnit: "",
            NWI: "-",
            normalCircumstances: true,
            hydrology: {
                present: false,
                disturbed: false,
                problematic: false,
                surfaceWater: {
                    present: false,
                    depth: NaN
                },
                waterTable: {
                    present: false,
                    depth: NaN
                },
                saturation: {
                    present: false,
                    depth: NaN
                },
                primaryIndicators: [],
                secondaryIndicators: [],
                remarks: ""
            },
            vegetation: {
                present: false,
                disturbed: false,
                problematic: false,
                indicators: {
                    rapidTest: false,
                    domTest: false,
                    prevIndex: false,
                    problematicVeg: false
                },
                strata: {
                    tree: [],
                    saplingShrub: [],
                    herb: [],
                    vine: []
                },
                remarks: ""
            },
            soil: {
                present: false,
                disturbed: false,
                problematic: false,
                restrictiveLayer: {
                    type: "",
                    depth: NaN
                },
                layers: [],
                indicators: [],
                problematicIndicators: [],
                remarks: ""
            }
        };
        dispatch(addDatapoint(newDatapoint));
    };

    const handleDeleteDatapoint = (datapoint) =>{
        Alert.alert(
            "Delete Datapoint",
            `Are you sure you want to delete datapoint ${datapoint.name}?`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Not deleted"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => dispatch(deleteDatapoint(datapoint.id))
                }
            ],
            { cancelable: false }
        )
    }

    const renderDatapointItem = ({ item: datapoint }) => {
        return (
            <View>
                <ListItem.Swipeable
                    rightContent={()=>(
                        <Button
                            title="Delete"
                            onPress={()=>{handleDeleteDatapoint(datapoint)}}
                            icon={{ name: 'trash-2', type:'feather', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                        />
                    )}
                    onPress={() => {
                        console.log("Datapoint pressed: ", datapoint.id);
                        navigation.navigate("EditDatapoint", { datapoint });
                    }}
                    containerStyle={styles.listContainer}
                >
                    <ListItem.Content>
                        <ListItem.Title style={styles.listPrimaryText}>{datapoint.name}</ListItem.Title>
                        <ListItem.Subtitle style={styles.listSecondaryText}>{datapoint.NWI}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem.Swipeable>
            </View>
        );
    };

    const DatapointsList = ({ projectId }) => {
        const datapoints = useSelector(selectDatapointsByProjectId(projectId));
        // const datapoints = useSelector((state) => state.datapoints);
        console.log("project id: ", projectId);
        // console.log('datapoints array: ', datapoints)
        console.log("num datapoints found: ", datapoints.length);

        return (
            <>
                <View>
                    <Text style={styles.projectHeaderText}>Datapoints</Text>
                    <Text style={styles.projectInfoText}>Press "New Datapoint" to create a new datapoint.</Text>
                </View>
                <NewDatapointItem />
                <FlatList
                    // data={useSelector(selectDatapointsByProjectId(projectId))}
                    data={datapoints}
                    renderItem={renderDatapointItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </>
        );
    };

    const UnspecifiedField = () => {
        return <Text style={{ ...styles.projectText, fontStyle: "italic" }}>Unspecified</Text>;
    };

    return (
        <View style={styles.projectContainer}>
            {/* <View style={{ flexDirection: "row" }}>
                <Text style={{ flex: 1 }}>Project Information</Text>
                <Button title="Edit Project" style={{ flex: 1 }} onPress={() => setShowProjectEditModal(true)} />
            </View> */}
            <Button
                title="Edit Project"
                onPress={() => setShowProjectEditModal(true)}
                buttonStyle={styles.buttonMain}
                titleStyle={styles.buttonMainText}
                type="outline"
            />
            <Text style={styles.projectHeaderText}>{projectName}</Text>
            <Text style={styles.projectText}>
                {projectCounty ? projectCounty : <UnspecifiedField />}
                {", "}
                {projectState ? projectState : <UnspecifiedField />}
            </Text>
            <Text style={styles.projectText}>
                {"Applicant: "}
                {projectApplicant ? projectApplicant : <UnspecifiedField />}
            </Text>
            <Text style={styles.projectText}>
                {"Section, Township: "}
                {projectSection ? projectSection : <UnspecifiedField />}
            </Text>
            <Text style={styles.projectText}>
                {"Region: "}
                {projectRegion ? projectRegion : <UnspecifiedField />}
            </Text>
            <Text style={styles.projectText}>
                {"Subregion: "} {projectSubregion ? projectSubregion : <UnspecifiedField />}
            </Text>
            <Text style={styles.projectText}>
                {"Datum: "}
                {projectDatum ? projectDatum : <UnspecifiedField />}
            </Text>
            <Text style={styles.projectInfoText}>Project ID: {project.id}</Text>
            <Text style={styles.projectInfoText}>
                Last updated <DateComponent date={projectUpdatedDate} />
            </Text>
            <Divider style={styles.divider} />
            <DatapointsList projectId={project.id} />

            <ProjectEditModal
                // project={project}
                showModal={showProjectEditModal}
                setShowModal={setShowProjectEditModal}
            />
        </View>
    );
};

export default ProjectInformationScreen;
