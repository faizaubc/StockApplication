import React , {useState}from 'react';
import { useGetDailyStockDataQuery } from '../services/chart';
import Chart from "react-apexcharts";

const DailyChart = ({symbolName, interval}) => {
    const {data,isStockList}= useGetDailyStockDataQuery(symbolName);
    console.log('LineChart',symbolName);
    console.log('LineChart',data);

    const seriesData = [];
    const seriesLinearData = [];
    const categoriesD=[];
    const timestamp=[];

    console.log(data);


    console.log(data?.['Meta Data']);
    console.log(data?.["Time Series (Daily)"]);
   for(const item in data?.["Time Series (Daily)"]){
       
       const seriesDataArrayFields= [];
       seriesDataArrayFields.push(item);
       seriesDataArrayFields.push(data["Time Series (Daily)"][item]["1. open"]);
       seriesDataArrayFields.push(data["Time Series (Daily)"][item]["2. high"]);
       seriesDataArrayFields.push(data["Time Series (Daily)"][item]["3. low"]);
       seriesDataArrayFields.push(data["Time Series (Daily)"][item]["4. close"]);
       //console.log(data["Time Series (Daily)"][item]["1. open"]);
       const seriesLinearDataTemp = [];
       seriesLinearDataTemp.push(item);
       seriesLinearDataTemp.push(data["Time Series (Daily)"][item]["5. volume"])
       seriesData.push(seriesDataArrayFields);
       timestamp.push(item);
       categoriesD.push(data["Time Series (Daily)"][item]["5. volume"]);
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


 //var chartBar = new ApexCharts(document.querySelector("#chart-bar"), optionsBar);
 //chartBar.render();
 


//if( isStockList) return 'Loading..';
  return (
    <>
    <Chart
    options={state.options}
    series={state.series}
    type="candlestick"
    width="500"
  />
     <Chart
    options={optionsBar.options}
    series={optionsBar.series}
    width="500"
    type="bar"

  />
  </>
  )
}

export default DailyChart