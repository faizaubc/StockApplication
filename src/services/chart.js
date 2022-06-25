import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl= 'https://www.alphavantage.co';


export const chart= createApi({
    reducerPath: 'chart',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getDailyStockData: builder.query({
            query: (symbol) => ({
                url: `/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.REACT_APP_ALPHA}`,
            })
        }),
        getWeeklyStockData: builder.query({
            query: (symbol) => ({
                url: `/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${process.env.REACT_APP_ALPHA}`,
            })
        }),
        getMonthlyStockData: builder.query({
            query: (symbol) => ({
                url: `/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${process.env.REACT_APP_ALPHA}`,
            })
        }),

        getDailySMAData: builder.query({
            query: ({symbol, timeperiod}) => ({
                url: `/query?function=SMA&symbol=${symbol}&interval=daily&time_period=${timeperiod}&series_type=open&apikey=${process.env.REACT_APP_ALPHA}`,
            })
        }),

        getDailyRSIData: builder.query({
            query: ({symbol, timeperiod, int}) => ({
                url: `/query?function=RSI&symbol=${symbol}&interval=${int}&time_period=${timeperiod}&series_type=open&apikey=${process.env.REACT_APP_ALPHA}`,
            })
        }),

        getDailyStocData: builder.query({
            query: (symbol) => ({
                url: `/query?function=STOCH&symbol=${symbol}&interval=daily&apikey=${process.env.REACT_APP_ALPHA}`,
            })
        }),
     
      
    
    })
});

export const{
   useGetDailyStockDataQuery, useGetWeeklyStockDataQuery, useGetMonthlyStockDataQuery, useGetDailySMADataQuery, useGetDailyRSIDataQuery, useGetDailyStocDataQuery
}= chart