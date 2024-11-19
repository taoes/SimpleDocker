import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetachLoadFlowApi = createAsyncThunk('loadFlowApi', (extraInfo, { dispatch }) => {

});

export default createSlice({
    name: 'AuthSlice',
    initialState: {
        graph: {},
        config: {}
    }, reducers: {

    }
    , extraReducers: (builder) => {
        builder
            // 加载配置结果
            .addCase(fetachLoadFlowApi.fulfilled, (state, { payload }) => {

            })
            // 登录异常
            .addCase(fetachLoadFlowApi.rejected, (state) => {

            })
    }
})