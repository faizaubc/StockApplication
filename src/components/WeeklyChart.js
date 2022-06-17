import React , {useState}from 'react';
import { useGetDailyStockDataQuery,useGetWeeklyStockDataQuery } from '../services/chart';
import Chart from "react-apexcharts";

const WeeklyChart = ({symbolName, interval}) => {

    const {data,isStockList}=useGetWeeklyStockDataQuery(symbolName);
    console.log('WeeklyChart',symbolName);
    console.log('WeeklyChart',data);

    const seriesData = [];
    const seriesLinearData = [];
    const categoriesD=[];
    const timestamp=[];

    console.log(data);


    console.log(data?.['Meta Data']);
    console.log(data?.["Weekly Time Series"]);
   for(const item in data?.["Weekly Time Series"]){
       
       const seriesDataArrayFields= [];
       seriesDataArrayFields.push(item);
       seriesDataArrayFields.push(data["Weekly Time Series"][item]["1. open"]);
       seriesDataArrayFields.push(data["Weekly Time Series"][item]["2. high"]);
       seriesDataArrayFields.push(data["Weekly Time Series"][item]["3. low"]);
       seriesDataArrayFields.push(data["Weekly Time Series"][item]["4. close"]);
       //console.log(data["Weekly Time Series"][item]["1. open"]);
       const seriesLinearDataTemp = [];
       seriesLinearDataTemp.push(item);
       seriesLinearDataTemp.push(data["Weekly Time Series"][item]["5. volume"])
       seriesData.push(seriesDataArrayFields);
       timestamp.push(item);
       categoriesD.push(data["Weekly Time Series"][item]["5. volume"]);
       seriesLinearData.push(seriesLinearDataTemp);
   }
  


console.log(seriesData);
console.log(seriesLinearData);

var state ={
     
   series: [{
       data: seriesData
   }],
   options: {
     chart: {
       type: 'candlestick',
       height: 350
     },
     title: {
       text: 'CandleStick Chart',
       align: 'left'
     },
     xaxis: {
       type: 'datetime'
     },
     yaxis: {
       tooltip: {
         enabled: true
       }
     }
   },
 
 
 };


 var optionsBar = {
     
   series: [{
     data: categoriesD
   }],
   options: {
     chart: {
       type: 'bar',
       height: 350
     },
     plotOptions: {
       bar: {
         borderRadius: 4
       }
     },
     dataLabels: {
       enabled: false
     },
     xaxis: {
       categories: timestamp,
     }
   },
 
 
 };

  return (
    <>
    <Chart
    options={state.options}
    series={state.series}
    type="candlestick"
    width="1000"
  />
     <Chart
    options={optionsBar.options}
    series={optionsBar.series}
    width="1000"
    type="bar"

  />
  </>
  )
}

export default WeeklyChart