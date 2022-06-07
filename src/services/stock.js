import create from '@ant-design/icons/lib/components/IconFont';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const stockApiHeaders={
    'User-Agent': 'request'
}

const baseUrl= 'https://www.alphavantage.co';

const createRequest = (url) => ({url, headers: stockApiHeaders})


export const stock= createApi({
    reducerPath: 'stock',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getStockList: builder.query({
            query: (symbol) => createRequest(`/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=HLCNBX33PQ7B2OOL`)
        }),
       
      
    })
});

export const{
    useGetStockListQuery
} = stock