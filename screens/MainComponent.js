import { Platform, Text, View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import Constants from "expo-constants";
import HomeScreen from "./HomeScreen";
import ProjectsScreen from "./ProjectsScreen";
import ProjectInformationScreen from "./ProjectInformationScreen";
import DatapointScreen from "./DatapointScreen";
import EditPlantScreen from "./EditPlantScreen";
import EditSoilScreen from "./EditSoilScreen";
import EditIndicatorsScreen from "./EditIndicatorsScreen";
import RegionalPlantListsScreen from "./RegionalPlantListsScreen";
import ConnectionScreen from "./ConnectionScreen";
import { styles, colors } from "../styles";

const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: colors.lightGray,
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
                    title: "Home",
                    headerLeft: () => (
                        <Icon
                            name="home"
                            type="feather"
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
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
                    title: "Projects",
                    headerLeft: () => (
                        <Icon
                            name="edit-2"
                            type="feather"
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
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
                options={({ navigation }) => ({
                    title: "Regional Plant Lists",
                    headerLeft: () => (
                        <Icon
                            name="list"
                            type="feather"
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const ConnectionNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="ConnectionStack"
                component={ConnectionScreen}
                options={({navigation}) => ({
                    title: "Connection",
                    headerLeft: () => (
                        <Icon
                            name="server"
                            type="feather"
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
}

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
                flex: 1
                // paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight
            }}
        >
            <StatusBar backgroundColor={"#000"} />
            <Drawer.Navigator
                initialRouteName="HomeDrawer"
                drawerContent={CustomDrawerContent}
                drawerStyle={styles.drawer}
                drawerContentOptions={{
                    activeTintColor: colors.lightGray,
                    activeBackgroundColor: colors.darkGreen
                }}
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
                <Drawer.Screen
                    name="ConnectionDrawer"
                    component={ConnectionNavigator}
                    options={{
                        title: "Connection"
                    }}
                />
            </Drawer.Navigator>
        </View>
    );
};

export default Main;
