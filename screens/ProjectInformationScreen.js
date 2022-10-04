import { useState } from "react";
import { ListItem, Button, Input } from 'react-native-elements';
import { ScrollView, View, Text, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../reducers/projectsReducer";
import { selectDatapointsByProjectId } from "../reducers/datapointsReducer";
import { FlatList } from "react-native-gesture-handler";



const ProjectInformationScreen = (props) => {
    const { route, navigation } = props;

    const { project } = route.params;
    const [showProjectEditModal, setShowProjectEditModal] = useState(false)

    const [projectName, setProjectName] = useState(project.projectName);
    const [projectApplicant, setProjectApplicant] = useState(project.projectApplicant);
    const [projectCounty, setProjectCounty] = useState(project.projectCounty);
    const [projectState, setProjectState] = useState(project.projectState);
    const [projectSection, setProjectSection] = useState(project.projectSection);
    const [projectSubregion, setProjectSubregion] = useState(project.projectState);
    const [projectDatum, setProjectDatum] = useState(project.projectDatum);
    const [projectUpdatedDate, setProjectUpdatedDate] = useState(project.updatedDate);

    const ProjectEditModal = (props) => {
        const dispatch = useDispatch();
        const { showModal, setShowModal } = props;
        // const { project, showModal, setShowModal } = props;
        const [tempName, setTempName] = useState(project.projectName);
        const [tempApplicant, setTempApplicant] = useState(project.projectApplicant);
        const [tempCounty, setTempCounty] = useState(project.projectCounty);
        const [tempState, setTempState] = useState(project.projectState);
        const [tempSection, setTempSection] = useState(project.projectSection);
        const [tempSubregion, setTempSubregion] = useState(project.projectState);
        const [tempDatum, setTempDatum] = useState(project.projectDatum);

        const handleSubmit = () => {
            // set states now to reflect changes on project info screen without reloading
            setProjectName(tempName);
            setProjectApplicant(tempApplicant);
            setProjectCounty(tempCounty);
            setProjectState(tempState);
            setProjectSection(tempSection);
            setProjectSubregion(tempSubregion);
            setProjectDatum(tempDatum);
            setProjectUpdatedDate(new Date().getTime());

            const updatedProject = {
                // projectName,
                projectName,
                projectApplicant,
                projectCounty,
                projectState,
                projectSection,
                projectSubregion,
                projectDatum,
                id: project.id,
                updatedDate: projectUpdatedDate
            };

            console.log('Updated project:', updatedProject);
            dispatch(updateProject(updatedProject));
            setShowModal(!showModal);
        }

        return (
            <Modal
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >

                <ScrollView>
                    <Text>Project Edit</Text>
                    <View>
                        <Text>Project Name</Text>
                        <Input
                            placeholder='Project Name'
                            // leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            // leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(tempName) => setTempName(tempName)}
                            value={tempName}
                        />
                    </View>
                    <View>
                        <Text>Owner/Applicant</Text>
                        <Input
                            placeholder='Owner/Applicant'
                            onChangeText={(tempApplicant) => setTempApplicant(tempApplicant)}
                            value={tempApplicant}
                        />
                    </View>
                    <View>
                        <Text>City/County</Text>
                        <Input
                            placeholder='City/County'
                            onChangeText={(tempCounty) => setTempCounty(tempCounty)}
                            value={tempCounty}
                        />
                    </View>
                    <View>
                        <Text>State</Text>
                        <Input
                            placeholder='State'
                            onChangeText={(tempState) => setTempState(tempState)}
                            value={tempState}
                        />
                    </View>
                    <View>
                        <Text>Section, Township, Range {'('}optional{')'}</Text>
                        <Input
                            placeholder='Section, Township, Range'
                            onChangeText={(tempSection) => setTempSection(tempSection)}
                            value={tempSection}
                        />
                    </View>
                    <View>
                        <Text>Subregion {'('}LRR and/or MLRA{')'}</Text>
                        <Input
                            placeholder='Subregion'
                            onChangeText={(tempSubregion) => setTempSubregion(tempSubregion)}
                            value={tempSubregion}
                        />
                    </View>
                    <View>
                        <Text>Datum</Text>
                        <Input
                            placeholder='Datum'
                            onChangeText={(tempDatum) => setTempDatum(tempDatum)}
                            value={tempDatum}
                        />
                    </View>
                    <View>
                        <Button
                            title='Save Changes'
                            color='#00FF00'
                            onPress={() => {
                                handleSubmit();
                                // resetForm();
                            }}
                        />
                    </View>
                    <View>
                        <Button
                            title='Cancel'
                            color='#FF0000'
                            onPress={() => {
                                setShowModal(!showModal);
                                // resetForm();
                            }}
                        />
                    </View>
                </ScrollView>
            </Modal>
        );
    }

    const NewDatapointItem = () => {
        return (
            <View>
                <ListItem
                    onPress={() => {
                        console.log('NewDatapointItem pressed')
                        // setShowNewProjectModal(true)
                    }}
                    containerStyle={{ backgroundColor: '#EFEFEF', borderColor: '#DDD', borderWidth: 1 }}
                >
                    <ListItem.Content>
                        <ListItem.Title>New Datapoint</ListItem.Title>
                        <ListItem.Subtitle>Create a new datapoint</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        )
    }

    const renderDatapointItem = ({ item: datapoint }) => {
        return (
            <View>
                <ListItem
                    onPress={() => {
                        console.log('Datapoint pressed: ', datapoint.id);
                        navigation.navigate('EditDatapoint', { datapoint })
                    }}
                >
                    <ListItem.Content>
                        <ListItem.Title>{datapoint.name}</ListItem.Title>
                        <ListItem.Subtitle>{datapoint.NWI}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        )
    }

    const DatapointsList = ({ projectId }) => {
        const datapoints = useSelector(selectDatapointsByProjectId(projectId));
        // const datapoints = useSelector((state) => state.datapoints);
        console.log('project id: ', projectId)
        // console.log('datapoints array: ', datapoints)
        console.log('num datapoints found: ', datapoints.length)

        return (
            <>
                <View><Text>Datapoints</Text></View>
                <NewDatapointItem />
                <FlatList
                    // data={useSelector(selectDatapointsByProjectId(projectId))}
                    data={datapoints}
                    renderItem={renderDatapointItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </>
        )
    }

    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1 }}>Project Information</Text>
                <Button
                    title='Edit'
                    style={{ flex: 1 }}
                    onPress={() => setShowProjectEditModal(true)}
                />
            </View>
            <Text>Project: {projectName}</Text>
            <Text>{projectCounty}, {projectState}</Text>
            <Text>Applicant: {projectApplicant}</Text>
            {projectSection.length > 1 &&
                <Text>Section, Township: {projectSection}</Text>
            }
            <Text>Subregion: {projectSubregion}</Text>
            <Text>Datum: {projectDatum}</Text>
            <Text style={{ fontStyle: 'italic' }}>Project ID: {project.id}</Text>
            <Text style={{ fontStyle: 'italic' }}>Last updated {Date(projectUpdatedDate)}</Text>

            <DatapointsList projectId={project.id} />

            <ProjectEditModal
                // project={project}
                showModal={showProjectEditModal}
                setShowModal={setShowProjectEditModal}
            />
        </View>


    )
}

export default ProjectInformationScreen;