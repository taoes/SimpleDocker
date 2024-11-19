import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * 加载宿主机
 */
export const fetchHostListApi = createAsyncThunk('hostListApi', (extraInfo, { dispatch }) => {

});

/**
 * 添加宿主机
 */
export const addHostListApi = createAsyncThunk('addHostListApi', (extraInfo, { dispatch }) => {

});


/**
 * 修改宿主机
 */
export const updateHostListApi = createAsyncThunk('updateHostListApi', (extraInfo, { dispatch }) => {

});

/**
 * 移除宿主机
 */
export const removeHostListApi = createAsyncThunk('RemoveHostListApi', (extraInfo, { dispatch }) => {

});


const initialState = {
    host: {
        id: '',
        cpuCore: 4,
        memory: 1024000
    },
    docker: {
        clientVersion: '-',
        serverVersion: '-',
        goVersion: '-',
        coreVerison: '-',
        platVersion: '-',
        rootDir: '-',
        systemTime: '-',

        imageCount: 10,
        containerCount: 20,
        containerOfPause: 10,
        containerOfStop: 1,
        containerOfRun: 19
    }
}


export default createSlice({
    name: 'dockerSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
})