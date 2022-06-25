import create from '@ant-design/icons/lib/components/IconFont';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const stockApiHeaders={
    'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
    'X-RapidAPI-Key': 'd43d17e85emshd3243c4bd5f510cp11733ejsn829485a00280'
}

const baseUrl= 'https://yh-finance.p.rapidapi.com';

const createRequest = (url) => ({url, headers: stockApiHeaders})


export const stockApi= createApi({
    reducerPath: 'stockApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getMovers: builder.query({
            query: (country) => createRequest(`/market/get-trending-tickers?region=${country}`)
        }),
        getStockDetails: builder.query({
            query: (stock) => createRequest(`/stock/v2/get-summary?symbol=${stock}&region=CA`),
        }),
        getNewsDetails: builder.query({
            query: (symbol) => ({
                url:`/news/v2/list`,
                method: 'POST'
            })
        }),
        getStockLiveData: builder.query({
            query: ({liveInterval, symbol, range, country}) => createRequest(`/stock/v2/get-chart?interval=${liveInterval}&symbol=${symbol}&range=${range}&region=${country}`),

        }),
    
    
    })
});

export const{
    useGetMoversQuery, useGetStockDetailsQuery, useGetNewsDetailsQuery, useGetStockLiveDataQuery
}= stockApi