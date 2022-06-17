import React , {useState}from 'react';
import { useGetDailyStockDataQuery, useGetMonthlyStockDataQuery } from '../services/chart';
import Chart from "react-apexcharts";


const MontlyChart = ({symbolName, interval}) => {

    const {data,isStockList}= useGetMonthlyStockDataQuery(symbolName);
    console.log('MonthlyChart',symbolName);
    console.log('MonthlyChart',data);

    const seriesData = [];
    const seriesLinearData = [];
    const categoriesD=[];
    const timestamp=[];

    console.log(data);


    console.log(data?.['Meta Data']);
    console.log(data?.["Monthly Time Series"]);
   for(const item in data?.["Monthly Time Series"]){
       
       const seriesDataArrayFields= [];
       seriesDataArrayFields.push(item);
       seriesDataArrayFields.push(data["Monthly Time Series"][item]["1. open"]);
       seriesDataArrayFields.push(data["Monthly Time Series"][item]["2. high"]);
       seriesDataArrayFields.push(data["Monthly Time Series"][item]["3. low"]);
       seriesDataArrayFields.push(data["Monthly Time Series"][item]["4. close"]);
       //console.log(data["Monthly Time Series"][item]["1. open"]);
       const seriesLinearDataTemp = [];
       seriesLinearDataTemp.push(item);
       seriesLinearDataTemp.push(data["Monthly Time Series"][item]["5. volume"])
       seriesData.push(seriesDataArrayFields);
       timestamp.push(item);
       categoriesD.push(data["Monthly Time Series"][item]["5. volume"]);
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

export default MontlyChart