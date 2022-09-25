import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as datapointsData from '../data/datapoints.json'


const initialState = {
    isLoading: false,
    errMess: null,
    datapointsArray: datapointsData.data
}

const datapointsSlice = createSlice({
    name: 'datapoints',
    initialState,
    reducers: {
        addDatapoint: (state, action) => {
            state.datapointsArray.push(action.payload);
        },
        updateDatapoint: (state, action) => {
            const idx = state.datapointsArray.findIndex((element) => element.id === action.payload.id);
            state.projectsArray[idx] = action.payload;
        }
    }
});

export const datapointsReducer = datapointsSlice.reducer;
export const { addDatapoint, updateDatapoint } = datapointsSlice.actions;
export const selectDatapointsByProjectId = (projectId) => (state) => {
    // console.log('selecting by id ', projectId)
    return state.datapoints.datapointsArray.filter(
        (datapoint) => datapoint.projectId === parseInt(projectId)
    );
}