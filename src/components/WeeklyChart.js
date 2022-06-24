import React , {useState}from 'react';
import { useGetWeeklyStockDataQuery, useGetDailyRSIDataQuery } from '../services/chart';
import Chart from "react-apexcharts";
import {Row,Col} from  'antd';


const WeeklyChart = ({symbolName, interval, weeklyInterval}) => {

  const {data,isStockList}=useGetWeeklyStockDataQuery(symbolName);
  let timeperiodRSI=10;
  let symbol=symbolName;
  let inter="weekly";
  const{data: stockIndicatorRSI}=useGetDailyRSIDataQuery({symbol,timeperiod:timeperiodRSI, int:inter});
 
    console.log('WeeklyChart',symbolName);
    console.log('WeeklyChart',data);
    console.log("RSI Data", stockIndicatorRSI);

    const seriesData = [];
    const seriesLinearData = [];
    const categoriesD=[];
    const timestamp=[];
    const arrayHigh=[];
    const seriesDataForRSIIndicator=[];

    console.log(data);


    console.log(data?.['Meta Data']);
    console.log(data?.["Weekly Time Series"]);

    //putting the data from object to array for RSI indicator with date and value pairs
    //format [[date, value],[date, value] .... ] 
    const RSI=[];
    for(const item in stockIndicatorRSI?.["Technical Analysis: RSI"]){
      const arrayData=[];
      arrayData.push(item);
      arrayData.push(stockIndicatorRSI?.["Technical Analysis: RSI"]?.[item]?.["RSI"]);
      RSI.push(arrayData);
    }
   for(const item in data?.["Weekly Time Series"]){
       if(Date.parse(weeklyInterval)< Date.parse(item))
       {
       const seriesDataArrayFields= [];
       seriesDataArrayFields.push(item);
       seriesDataArrayFields.push(data["Weekly Time Series"][item]["1. open"]);
       seriesDataArrayFields.push(data["Weekly Time Series"][item]["2. high"]);
       seriesDataArrayFields.push(data["Weekly Time Series"][item]["3. low"]);
       seriesDataArrayFields.push(data["Weekly Time Series"][item]["4. close"]);
       //console.log(data["Weekly Time Series"][item]["1. open"]);
       const seriesLinearDataTemp = [];
       seriesLinearDataTemp.push(item);
       seriesLinearDataTemp.push(data["Weekly Time Series"][item]["5. volume"]);
       arrayHigh.push(data["Weekly Time Series"][item]["4. close"]);
       seriesData.push(seriesDataArrayFields);
       timestamp.push(item);
       categoriesD.push(data["Weekly Time Series"][item]["5. volume"]);
       seriesLinearData.push(seriesLinearDataTemp);

       //finding the date value in the array
       let index=RSI?.findIndex(element=> element[0]==item);
       let element =RSI?.[index]?.[1];
       //pusing the element in the array for RSI indicator
       seriesDataForRSIIndicator.push(element);
       }
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
     name:'volume',
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

 var lineRSI = {
          
  series: [{
      name: "RSI",
      data: seriesDataForRSIIndicator.reverse()
  }],
  options: {
    chart: {
      height: 100,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: [1]
    },
    
    title: {
      text: 'RSI Indicator',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },  
     colors: ["#FF0000"],
    xaxis: {
      categories:timestamp,
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
  <Row>
  <Col  flex="1000px">
     <Chart
    options={optionsBar.options}
    series={optionsBar.series}  
    height="200"
    type="bar"

  />
  </Col>
  </Row>
  <Row>
<Col flex="1000px">
<Chart
    options={lineRSI.options}
    series={lineRSI.series}
    height="200"
    type="line"

  />
  </Col>
  </Row>
  </>
  )
}

export default WeeklyChart