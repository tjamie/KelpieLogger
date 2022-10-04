import { useState } from "react";
import { Text, View, ScrollView, FlatList, Modal, Button, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Input } from "react-native-elements";
import { SwipeRow } from "react-native-swipe-list-view";
import { dateToUniqueId } from "../utils/dateToUniqueId";
import Loading from "../components/LoadingComponent";
import { addProject, deleteProject } from "../reducers/projectsReducer";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProjectsScreen = ({ navigation }) => {
    const projects = useSelector((state) => state.projects);
    const dispatch = useDispatch();

    const [showNewProjectModal, setShowNewProjectModal] = useState(false);

    // USACE Data Form Project-Wide Fields
    const [projectName, setProjectName] = useState('');
    const [projectApplicant, setProjectApplicant] = useState('');
    const [projectCounty, setProjectCounty] = useState('');
    const [projectState, setProjectState] = useState('');
    const [projectSection, setProjectSection] = useState(''); //only applicable to certain areas
    const [projectSubregion, setProjectSubregion] = useState('');
    const [projectDatum, setProjectDatum] = useState('');

    const handleSubmit = () => {
        const newProject = {
            projectName,
            projectApplicant,
            projectCounty,
            projectState,
            projectSection,
            projectSubregion,
            projectDatum,
            id: dateToUniqueId(),
            updatedDate: Date.now()
        };
        console.log('New project: ', newProject);
        //dispatch
        dispatch(addProject(newProject));
        setShowNewProjectModal(!showNewProjectModal);
    }

    const resetForm = () => {
        setProjectName('');
        setProjectApplicant('');
        setProjectCounty('');
        setProjectState('');
        setProjectSection('');
        setProjectSubregion('');
    }

    if (projects.isLoading) {
        return (
            <Loading />
        )
    }
    if (projects.errMess) {
        return (
            <View><Text>{projects.errMess}</Text></View>
        )
    }

    const NewProjectItem = () => {
        return (
            <View>
                <ListItem
                    onPress={() => {
                        console.log('NewProjectItem pressed')
                        setShowNewProjectModal(true)
                    }}
                    containerStyle={{ backgroundColor: '#EFEFEF', borderColor: '#DDD', borderWidth: 1 }}
                >
                    <ListItem.Content>
                        <ListItem.Title>New Project</ListItem.Title>
                        <ListItem.Subtitle>Create a new project</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        )
    }

    const renderProjectItem = ({ item: project }) => {
        return (
            <SwipeRow rightOpenValue={-100}>
                {/* delete project */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flex: 1
                }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'red',
                            height: '100%',
                            justifyContent: 'center'
                        }}
                        onPress={() => Alert.alert(
                            'Delete Project',
                            `Are you sure you want to delete project ${project.projectName}?`,
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log('Not deleted'),
                                    style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => dispatch(deleteProject(project.id))
                                }
                            ],
                            { cancelable: false }
                        )}
                    >
                        <Text style={{ color: 'white', fontWeight: '700', textAlign: 'center', fontSize: 16, width: 100 }}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* view project */}
                <View>
                    <ListItem
                        onPress={() => {
                            console.log('Project pressed: ', project.id);
                            navigation.navigate('ProjectInformation', { project })
                        }}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{project.projectName}</ListItem.Title>
                            <ListItem.Subtitle>Description Placeholder</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </SwipeRow>
        )
    }

    return (
        <>
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
                <ScrollView>
                    <Text>Project Creation</Text>
                    <View>
                        <Text>Project Name</Text>
                        <Input
                            placeholder='Project Name'
                            // leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            // leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(projectName) => setProjectName(projectName)}
                            value={projectName}
                        />
                    </View>
                    <View>
                        <Text>Owner/Applicant</Text>
                        <Input
                            placeholder='Owner/Applicant'
                            onChangeText={(projectApplicant) => setProjectApplicant(projectApplicant)}
                            value={projectApplicant}
                        />
                    </View>
                    <View>
                        <Text>City/County</Text>
                        <Input
                            placeholder='City/County'
                            onChangeText={(projectCounty) => setProjectCounty(projectCounty)}
                            value={projectCounty}
                        />
                    </View>
                    <View>
                        <Text>State</Text>
                        <Input
                            placeholder='State'
                            onChangeText={(projectState) => setProjectState(projectState)}
                            value={projectState}
                        />
                    </View>
                    <View>
                        <Text>Section, Township, Range {'('}optional{')'}</Text>
                        <Input
                            placeholder='Section, Township, Range'
                            onChangeText={(projectSection) => setProjectSection(projectSection)}
                            value={projectSection}
                        />
                    </View>
                    <View>
                        <Text>Subregion {'('}LRR and/or MLRA{')'}</Text>
                        <Input
                            placeholder='Subregion'
                            onChangeText={(projectSubregion) => setProjectSubregion(projectSubregion)}
                            value={projectSubregion}
                        />
                    </View>
                    <View>
                        <Text>Datum</Text>
                        <Input
                            placeholder='Datum'
                            onChangeText={(projectDatum) => setProjectDatum(projectDatum)}
                            value={projectDatum}
                        />
                    </View>
                    <View>
                        <Button
                            title='Submit'
                            color='#00FF00'
                            onPress={() => {
                                handleSubmit();
                                resetForm();
                            }}
                        />
                    </View>
                    <View>
                        <Button
                            title='Cancel'
                            color='#FF0000'
                            onPress={() => {
                                setShowNewProjectModal(!showNewProjectModal);
                                resetForm();
                            }}
                        />
                    </View>
                </ScrollView>
            </Modal>
        </>
    )

}

export default ProjectsScreen;