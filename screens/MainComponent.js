import { Platform, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useEffect } from "react";
import Constants from "expo-constants";
import HomeScreen from "./HomeScreen";
import ProjectsScreen from "./ProjectsScreen";
import ProjectInformationScreen from "./ProjectInformationScreen";
import { styles } from "../styles";

const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: '#EFEFEF',
    headerStyle: { backgroundColor: '#6DBF52' }
}

const HomeNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='HomeStack'
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: 'Home'
                })}
            />
        </Stack.Navigator>
    )
}

const ProjectsNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='ProjectsStack'
                component={ProjectsScreen}
                options={({ navigation }) => ({
                    title: 'Projects'
                })}
            />
            <Stack.Screen
                name='ProjectInformation'
                component={ProjectInformationScreen}
                options={({ route }) => ({
                    title: route.params.project.projectName
                })}
            />
        </Stack.Navigator>
    )
}

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
        <View>
            <Text style={styles.drawerHeaderText}>KelpieLogger</Text>
        </View>
        <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
    </DrawerContentScrollView>
)

const Main = () => {
    return (
        <View style={{
            flex: 1,
            paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
        }}
        >
            <Drawer.Navigator
                initialRouteName='HomeDrawer'
                drawerContent={CustomDrawerContent}
            // drawerStyle={{}}
            >
                <Drawer.Screen
                    name='HomeDrawer'
                    component={HomeNavigator}
                    options={{
                        title: 'Home'
                    }}
                />
                <Drawer.Screen
                    name='ProjectsDrawer'
                    component={ProjectsNavigator}
                    options={{
                        title: 'Projects'
                    }}
                />
            </Drawer.Navigator>
        </View>
    )
}

export default Main;