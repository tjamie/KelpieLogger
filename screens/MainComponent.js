import { Platform, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useEffect } from "react";
import Constants from "expo-constants";
import HomeScreen from "./HomeScreen";
import ProjectsScreen from "./ProjectsScreen";
import ProjectInformationScreen from "./ProjectInformationScreen";
import DatapointScreen from "./DatapointScreen";
import EditPlantScreen from "./EditPlantScreen";
import EditSoilScreen from "./EditSoilScreen";
import EditIndicatorsScreen from "./EditIndicatorsScreen";
import RegionalPlantListsScreen from "./RegionalPlantListsScreen";
import { styles } from "../styles";

const Drawer = createDrawerNavigator();

const screenOptions = {
    // headerTintColor: "#c1d6b0",
    headerTintColor: "#efefef",
    headerStyle: styles.stackNavHeader
};

const HomeNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="HomeStack"
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: "Home"
                })}
            />
        </Stack.Navigator>
    );
};

const ProjectsNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="ProjectsStack"
                component={ProjectsScreen}
                options={({ navigation }) => ({
                    title: "Projects"
                })}
            />
            <Stack.Screen
                name="ProjectInformation"
                component={ProjectInformationScreen}
                options={({ route }) => ({
                    title: "Project Information"
                })}
            />
            <Stack.Screen
                name="EditDatapoint"
                component={DatapointScreen}
                options={({ route }) => ({
                    // title: route.params.datapoint.name
                    title: "Datapoint"
                })}
            />
            <Stack.Screen
                name="EditPlant"
                component={EditPlantScreen}
                options={() => ({
                    title: "Edit Plant"
                })}
            />
            <Stack.Screen
                name="EditSoil"
                component={EditSoilScreen}
                options={() => ({
                    title: "Edit Soil"
                })}
            />
            <Stack.Screen
                name="EditIndicators"
                component={EditIndicatorsScreen}
                options={() => ({
                    title: "Indicators"
                })}
            />
        </Stack.Navigator>
    );
};

const RegionalPlantsNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="ViewRegionalPlantLists"
                component={RegionalPlantListsScreen}
                options={() => ({
                    title: "Regional Plant Lists"
                })}
            />
        </Stack.Navigator>
    );
};

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
        <View>
            <Text style={styles.drawerHeaderText}>KelpieLogger</Text>
        </View>
        <DrawerItemList {...props} labelStyle={{ fontWeight: "bold" }} />
    </DrawerContentScrollView>
);

const Main = () => {
    return (
        <View
            style={{
                flex: 1,
                paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight
            }}
        >
            <Drawer.Navigator
                initialRouteName="HomeDrawer"
                drawerContent={CustomDrawerContent}
                // drawerStyle={{}}
            >
                <Drawer.Screen
                    name="HomeDrawer"
                    component={HomeNavigator}
                    options={{
                        title: "Home"
                    }}
                />
                <Drawer.Screen
                    name="ProjectsDrawer"
                    component={ProjectsNavigator}
                    options={{
                        title: "Projects"
                    }}
                />
                <Drawer.Screen
                    name="RegionalPlantListsDrawer"
                    component={RegionalPlantsNavigator}
                    options={{
                        title: "Regional Plant Lists"
                    }}
                />
            </Drawer.Navigator>
        </View>
    );
};

export default Main;
