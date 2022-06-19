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

        getDailySMAData: builder.query({
            query: ({symbol, timeperiod}) => ({
                url: `/query?function=SMA&symbol=${symbol}&interval=daily&time_period=${timeperiod}&series_type=open&apikey=HLCNBX33PQ7B2OOL`,
            })
        }),

        getDailyRSIData: builder.query({
            query: ({symbol, timeperiod}) => ({
                url: `/query?function=RSI&symbol=${symbol}&interval=daily&time_period=${timeperiod}&series_type=open&apikey=HLCNBX33PQ7B2OOL`,
            })
        }),
     
      
    
    })
});

export const{
   useGetDailyStockDataQuery, useGetWeeklyStockDataQuery, useGetMonthlyStockDataQuery, useGetDailySMADataQuery, useGetDailyRSIDataQuery
}= chart