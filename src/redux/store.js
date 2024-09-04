import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from './locationsSlice';

const store = configureStore({
    reducer: {
        locations: locationsReducer,
    },
});

export default store;
