import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * 搜索镜像
 */
export const getImageListApi = createAsyncThunk('getImageListApi', (extraInfo, { dispatch }) => {

});


/**
 * 构建镜像
 */

const initialState = {
    list: [{ imageId: 1, imageName: 'TEST', imageSize: 100 }],
    request: { searchKey: '', ceratedAt: '' },
    pagination: { pageSize: 10, current: 1, total: 0 }
}

export default createSlice({
    name: 'image',
    initialState,
    reducers: {
        updatePagination: (state, { payload }) => {
            state.pagination = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getImageListApi.fulfilled, (extraInfo, { }) => {

        })
    }
})