import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


/**
 * 获取用户数据
 */
export const fetachLifaUserApi = createAsyncThunk('lifaUserApi', (extraInfo, { dispatch }) => {

});

/**
 * 获取用户订单数据
 */
export const fetchLifaOrderApi = createAsyncThunk('lifaOrderApi', (extraInfo, { dispatch }) => {

});


/**
 * 提交用户信息
 */
export const submitUserInfo = createAsyncThunk('submitUserInfoApi', (extraInfo, { dispatch }) => {

});

/**
 * 提交订单信息
 */
export const submitOrderInfo = createAsyncThunk('submitOrerInfo', (extraInfo, { dispatch }) => {

});

export default createSlice({
    name: 'AuthSlice',
    initialState: {
        userList: [],
        orderList: [],
        userParams: {},
        orderParams: {},
    }, reducers: {

    }
    , extraReducers: (builder) => {
        builder
            // 加载配置结果
            .addCase(fetachLifaUserApi.fulfilled, (state, { payload }) => {

            })
            .addCase(fetchLifaOrderApi.fulfilled, (state, { payload }) => {

            })
    }
})