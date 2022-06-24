import React , {useState}from 'react';
import { useGetDailyStockDataQuery, useGetMonthlyStockDataQuery } from '../services/chart';
import Chart from "react-apexcharts";
import {Row,Col} from  'antd';


const MontlyChart = ({symbolName, interval}) => {

    const {data,isStockList}= useGetMonthlyStockDataQuery(symbolName);
    console.log('MonthlyChart',symbolName);
    console.log('MonthlyChart',data);

    const seriesData = [];
    const seriesLinearData = [];
    const categoriesD=[];
    const timestamp=[];
    const arrayHigh=[];

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
       seriesLinearDataTemp.push(data["Monthly Time Series"][item]["5. volume"]);
       arrayHigh.push(data["Monthly Time Series"][item]["4. close"]);
       seriesData.push(seriesDataArrayFields);
       timestamp.push(item);
       categoriesD.push(data["Monthly Time Series"][item]["5. volume"]);
       seriesLinearData.push(seriesLinearDataTemp);
   }
  
   let min = Math.min(...arrayHigh);
   let max= Math.max(...arrayHigh);
   let maxDate = timestamp?.[0];
   let count= timestamp?.length-1;
   let minDate =timestamp?.[count];

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
     data: categoriesD.reverse()
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
       categories: timestamp.reverse(),
     }
   },
 
 
 };
  return (
    <>

<Row>
<Col span={12}>
  <h3>High b/w {minDate} to {maxDate}</h3>
  <div><h3>${max}</h3></div>
</Col>
<Col span={12}>
  <h3>Low b/w {minDate} to {maxDate}</h3>
  <div><h3>${min}</h3></div>
</Col>
 </Row>

 <Row  >
    <Col flex="1000px">
    <Chart
    options={state.options}
    series={state.series}
    type="candlestick"
   
  />
  </Col>
  </Row>
  <Row >
    <Col flex="1000px">
     <Chart
    options={optionsBar.options}
    series={optionsBar.series} 
    height="200"
    type="bar"

  />
  </Col>
  </Row>
  </>
  )
}

export default MontlyChart