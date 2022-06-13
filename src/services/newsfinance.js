import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
 
    'X-RapidAPI-Key': 'd43d17e85emshd3243c4bd5f510cp11733ejsn829485a00280',
    'X-RapidAPI-Host': 'ms-finance.p.rapidapi.com'
     
}

const baseUrl= 'https://ms-finance.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const newsfinance= createApi({
    reducerPath: 'newsfinance' ,
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getStockNews: builder.query({
            query: (perfID) => createRequest(`/market/get-movers?PerformanceId=${perfID}`),
        }),
    }),
});

export const { useGetStockNewsQuery } = newsfinance;
