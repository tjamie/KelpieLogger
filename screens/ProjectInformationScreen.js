import { useState } from "react";
// import { Button } from "@rneui/themed";
import { Button, Input } from 'react-native-elements';
import { ScrollView, View, Text, Modal } from "react-native";
import { useDispatch } from "react-redux";
import { updateProject } from "../reducers/projectsReducer";

// const newProject = {
//     projectName,
//     projectApplicant,
//     projectCounty,
//     projectState,
//     projectSection,
//     projectSubregion,
//     projectDatum,
//     id: dateToUniqueId()
// };

const ProjectEditModal = (props) => {
    const dispatch = useDispatch();

    const { project, showModal, setShowModal } = props;
    const [projectName, setProjectName] = useState(project.projectName);
    const [projectApplicant, setProjectApplicant] = useState(project.projectApplicant);
    const [projectCounty, setProjectCounty] = useState(project.projectCounty);
    const [projectState, setProjectState] = useState(project.projectState);
    const [projectSection, setProjectSection] = useState(project.projectSection);
    const [projectSubregion, setProjectSubregion] = useState(project.projectState);
    const [projectDatum, setProjectDatum] = useState(project.projectDatum);

    const handleSubmit = () => {
        const updatedProject = {
            projectName,
            projectApplicant,
            projectCounty,
            projectState,
            projectSection,
            projectSubregion,
            projectDatum,
            id: project.id,
            updatedDate: Date.now()
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

const ProjectInformationScreen = ({ route }) => {

    //screen isn't updating upon modal submital

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

            <ProjectEditModal
                project={project}
                showModal={showProjectEditModal}
                setShowModal={setShowProjectEditModal}
            />

            {/* data points here with a flatlist */}
        </View>


    )
}

export default ProjectInformationScreen;