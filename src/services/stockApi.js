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
            query: ({country,count}) => createRequest(`/market/v2/get-movers?region=${country}&count=${count}`)
        }),
      
    })
});

export const{
    useGetMoversQuery
} = stockApi