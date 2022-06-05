import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
 
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
        'X-RapidAPI-Key': 'd43d17e85emshd3243c4bd5f510cp11733ejsn829485a00280'
     
}

const baseUrl= 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const news= createApi({
    reducerPath: 'news' ,
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getStockNews: builder.query({
            query: ({searchVal, count}) => createRequest(`/news/search?q=${searchVal}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        }),
    }),
});

export const { useGetStockNewsQuery } = news;
