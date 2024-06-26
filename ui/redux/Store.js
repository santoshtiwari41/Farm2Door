import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import distributorReducer from './distributorSlice';


export default configureStore({
    reducer: {
        cart: CartReducer,
        distributor: distributorReducer,
    }
})