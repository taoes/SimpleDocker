import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * login api
 */
export const fetchLoginApi = createAsyncThunk('loginApi', (extraInfo, { dispatch }) => {

});


/**
 * 退出登录
 */
export const fetachLogoutApi = createAsyncThunk('logoutApi', (extraInfo, { dispatch }) => {


});

export default createSlice({
    name: 'AuthSlice',
    initialState: {
        user: {
            username: '',
            email: '',
            safe: false
        },
        hostId: '',
        token: ''
    }, reducers: {

    }
    , extraReducers: (builder) => {
        builder
            // 登录结果
            .addCase(fetchLoginApi.fulfilled, (state, { payload }) => {

            })
            // 登录异常
            .addCase(fetchLoginApi.rejected, (state) => {

            })
    }
})