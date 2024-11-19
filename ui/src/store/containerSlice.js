import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * 搜索容器
 */
export const fetchContainerListApi = createAsyncThunk('containerListApi', (extraInfo, { dispatch }) => {

});


export default createSlice({
    name: 'containerSlice',
    initialState: {
        list: [],
        request: { searchKey: '' },
        page: { size: 10, page: 1, total: 0, totalPage: 0 }
    }, reducers: {
        upadteSearchParams: (state) => {
            state
        }
    },
    extraReducers: (builder) => {

    }
})