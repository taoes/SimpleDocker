import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCaptchaApi } from "../api/authApi";
import { message } from "antd";

export const loadImgApi = createAsyncThunk('LoadImgApi', async (extraInfo, { dispatch, getState }) => {
    return await fetchCaptchaApi();
});


const initialState = {
    count: 0,
    step: 0,
    list: [],
    code: '',
    img: ''
}


export default createSlice({
    name: 'number',
    initialState,
    reducers: {
        add: state => {
            state.list.push("sub + 1")
            state.count += 1
            state.step += 1
        }, sub: state => {
            state.list.push("sub - 1")
            state.count -= 1
            state.step += 1
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(loadImgApi.fulfilled, (state, { payload }) => {
                let { value } = payload
                let { captChaKey, data } = value
                state.code = captChaKey
                state.img = data
                message.success("验证码数据加载成功");
            })
    }
});