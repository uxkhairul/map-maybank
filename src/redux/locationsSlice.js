import { createSlice } from '@reduxjs/toolkit';

const locationsSlice = createSlice({
    name: 'locations',
    initialState: [],
    reducers: {
        addLocation: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { addLocation } = locationsSlice.actions;
export default locationsSlice.reducer;
