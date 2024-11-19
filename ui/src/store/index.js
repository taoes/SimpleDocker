import { configureStore } from "@reduxjs/toolkit";
import numberSlice from './numberSlice'
import flowSlice from './flowSlice'
import authSlice from './authSlice'
import lfSlice from './lfSlice'
import imageSlice from "./imageSlice";
import dockerSlice from "./dockerSlice";
import modalSlice from "./modalSlice";



const store = configureStore({
    reducer: {
        image: imageSlice.reducer,
        docker: dockerSlice.reducer,
        modal: modalSlice.reducer,
        number: numberSlice.reducer,
        flow: flowSlice.reducer,
        auth: authSlice.reducer,
        lifa: lfSlice.reducer
    }
});

export default store;