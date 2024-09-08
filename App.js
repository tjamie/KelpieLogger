import "./gesture-handler";
import Main from "./screens/MainComponent";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
// import { AppRegistry } from "react-native";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import React from "react";

// Might need to place a <ThemeProvider> here with rneui upgrade

export default function App() {
    const [fontsLoaded] = useFonts({
        "Rakkas-Regular": require("./assets/fonts/Rakkas/Rakkas-Regular.ttf")
    });
    if (fontsLoaded) {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {/* <NavigationContainer> */}
                        <Main />
                    {/* </NavigationContainer> */}
                </PersistGate>
            </Provider>
        );
    }
}