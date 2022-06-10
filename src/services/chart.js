import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl= 'https://www.alphavantage.co';


export const chart= createApi({
    reducerPath: 'chart',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getDailyStockData: builder.query({
            query: (symbol) => ({
                url: `/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=HLCNBX33PQ7B2OOL`,
            })
        }),
        getWeeklyStockData: builder.query({
            query: (symbol) => ({
                url: `/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=HLCNBX33PQ7B2OOL`,
            })
        }),
        getMonthlyStockData: builder.query({
            query: (symbol) => ({
                url: `/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=HLCNBX33PQ7B2OOL`,
            })
        }),
      
    
    })
});

export const{
   useGetDailyStockDataQuery, useGetWeeklyStockDataQuery, useGetMonthlyStockDataQuery
    
}= chart