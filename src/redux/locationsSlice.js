import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addLocationAsync = createAsyncThunk(
    'locations/addLocationAsync',
    async (locationData, thunkAPI) => {
        return locationData;
    }
);

const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        locations: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addLocationAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addLocationAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.locations.push(action.payload);
            })
            .addCase(addLocationAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default locationsSlice.reducer;
