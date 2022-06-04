import { configureStore } from "@reduxjs/toolkit";

import { stockApi } from "../services/stockApi";
import { stock } from "../services/stock";

export default configureStore({
    reducer:{
        [stockApi.reducerPath]: stockApi.reducer,
        [stock.reducerPath]: stock.reducer,



    },

});