import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const localProjectsData = '../data/projects.json';

// export const fetchLocalProjects = createAsyncThunk(
//     'projects/fetchLocalProjects',
//     async () => {
//         console.log('fetching projects');
//         const response = await fetch(localProjectsData);
//         console.log('projects: ', response.json())
//         return response.json();
//     }
// )

// const initialState = {
//     isLoading: true,
//     errMess: null,
//     projectsArray: []
// }

const initialState = {
    isLoading: false,
    errMess: null,
    projectsArray: []
};

// export const postProject = createAsyncThunk(
//     'projects/postProject',
//     async (payload, { dispatch, getState }) => {
//         setTimeout(() => {
//             // const {projects} = getState();
//             dispatch(addProject(payload))
//         }, 2000)
//     }
// )

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        addProject: (state, action) => {
            state.projectsArray.push(action.payload);
        },
        updateProject: (state, action) => {
            const idx = state.projectsArray.findIndex((element) => element.id === action.payload.id);
            state.projectsArray[idx] = action.payload;
        },
        deleteProject: (state, action) => {
            const idx = state.projectsArray.findIndex((element) => element.id === action.payload);
            console.log(`Target: ${state.projectsArray[idx].projectName}`);
            state.projectsArray = state.projectsArray.filter((element) => element.id != action.payload);
        },
        getProjectById: (state, action) => {
            const activeProject = state.projectsArray.find((element) => element.id === action.payload);
            return activeProject;
        }
    }
    // extraReducers: {
    //     [fetchLocalProjects.pending]: (state) => {
    //         state.isLoading = true;
    //     },
    //     [fetchLocalProjects.fulfilled]: (state, action) => {
    //         state.isLoading = false;
    //         state.errMess = null;
    //         state.projectsArray = action.payload;
    //     },
    //     [fetchLocalProjects.rejected]: (state, action) => {
    //         state.isLoading = false;
    //         state.errMess = action.error ? action.error.message : 'Fetch failed';
    //     }
    // }
});

export const projectsReducer = projectsSlice.reducer;
export const { addProject, updateProject, deleteProject, getProjectById } = projectsSlice.actions;
