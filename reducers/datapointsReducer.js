import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    errMess: null,
    datapointsArray: []
};

const datapointsSlice = createSlice({
    name: "datapoints",
    initialState,
    reducers: {
        addDatapoint: (state, action) => {
            state.datapointsArray.push(action.payload);
        },
        updateDatapoint: (state, action) => {
            const idx = state.datapointsArray.findIndex((element) => element.id === action.payload.id);
            state.datapointsArray[idx] = action.payload;
        },
        deleteDatapoint: (state, action) => {
            state.datapointsArray = state.datapointsArray.filter((element) => element.id != action.payload);
        }
    }
});

export const datapointsReducer = datapointsSlice.reducer;
export const { addDatapoint, updateDatapoint, deleteDatapoint } = datapointsSlice.actions;
export const selectDatapointsByProjectId = (projectId) => (state) => {
    // console.log('selecting by id ', projectId)
    return state.datapoints.datapointsArray.filter((datapoint) => datapoint.projectId === parseInt(projectId));
};
