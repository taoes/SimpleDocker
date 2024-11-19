import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    imageRunModalStatus: false
}

export default createSlice({
    name: 'modalStateSlice',
    initialState,
    reducers: {
        switchImageRunModalStatus: (state) => {
            state.imageRunModalStatus = !state.imageRunModalStatus;
            console.log(state.imageRunModalStatus)
        }
    }
    , extraReducers: (builder) => {

    }
})