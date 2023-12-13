import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    errMess: null,
    settingsObject: {}
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.settingsObject.token = action.payload;
        },
        deleteToken: (state, action) => {
            delete state.settingsObject.token;
        },
        addUser: (state, action) => {
            state.settingsObject.user = action.payload;
        },
        deleteUser: (state, action) => {
            delete state.settingsObject.user;
        },
        addServer: (state, action) => {
            state.settingsObject.server = action.payload;
        },
        deleteServer: (state, action) => {
            delete state.settingsObject.server;
        }
    }
});

export const settingsReducer = settingsSlice.reducer;
export const {addToken, deleteToken, addUser, deleteUser, addServer, deleteServer} = settingsSlice.actions;
// export const { addDatapoint, updateDatapoint, deleteDatapoint } = settingsSlice.actions;
// export const selectDatapointsByProjectId = (projectId) => (state) => {
//     //return state.datapoints.datapointsArray.filter((datapoint) => datapoint.projectId === parseInt(projectId));
//     return state.datapoints.datapointsArray.filter((datapoint) => datapoint.projectId === projectId);
// };