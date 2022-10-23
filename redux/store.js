import { configureStore } from "@reduxjs/toolkit";
import { projectsReducer } from "../reducers/projectsReducer";
import { datapointsReducer } from "../reducers/datapointsReducer";
import { persistStore, persistCombineReducers, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import storage from 'redux-persist/lib/storage';

// export const store = configureStore({
//     reducer: {
//         projects: projectsReducer
//     }
// })

const rootConfig = {
    key: "root",
    storage: AsyncStorage,
    debug: true
};

export const store = configureStore({
    reducer: persistCombineReducers(rootConfig, {
        projects: projectsReducer,
        datapoints: datapointsReducer
    }),
    //throws an error on startup without ignored actions below
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(store);
