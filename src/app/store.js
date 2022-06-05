import { configureStore } from "@reduxjs/toolkit";

import { stockApi } from "../services/stockApi";
import { stock } from "../services/stock";
import { news } from "../services/news";

export default configureStore({
    reducer:{
        [stockApi.reducerPath]: stockApi.reducer,
        [stock.reducerPath]: stock.reducer,
        [news.reducerPath]: news.reducer,





    },

});