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
        // addDatapoint: (state, action) => {
        //     state.datapointsArray.push(action.payload);
        // },
        // updateDatapoint: (state, action) => {
        //     const idx = state.datapointsArray.findIndex((element) => element.id === action.payload.id);
        //     state.datapointsArray[idx] = action.payload;
        // },
        // deleteDatapoint: (state, action) => {
        //     state.datapointsArray = state.datapointsArray.filter((element) => element.id != action.payload);
        // }
    }
});

export const settingsReducer = settingsSlice.reducer;
export const {addToken, deleteToken, addUser, deleteUser} = settingsSlice.actions;
// export const { addDatapoint, updateDatapoint, deleteDatapoint } = settingsSlice.actions;
// export const selectDatapointsByProjectId = (projectId) => (state) => {
//     //return state.datapoints.datapointsArray.filter((datapoint) => datapoint.projectId === parseInt(projectId));
//     return state.datapoints.datapointsArray.filter((datapoint) => datapoint.projectId === projectId);
// };