import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import AuthReducer from "./AuthReducer";


export default configureStore({
    reducer:{
        cart:CartReducer,
        auth:AuthReducer

    }
})