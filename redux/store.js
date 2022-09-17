import { configureStore } from '@reduxjs/toolkit';
import { projectsReducer } from '../reducers/projectsReducer';

export const store = configureStore({
    reducer: {
        projects: projectsReducer
    }
})