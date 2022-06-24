import React , {useState}from 'react';
import { useGetStockLiveDataQuery } from '../services/stockApi';
import Chart from "react-apexcharts";
import {Row,Col} from  'antd';


const StockDetails = ({symbolName, interval, liveInterval, range}) => {
  //const symbol = symbolName.split('.')[0] + ".TO";
  let symbol="";
      var splitSymbolOnDot= symbolName.split(".");
      if(splitSymbolOnDot[1]=="TRT")
        symbol= splitSymbolOnDot[0] +"." +"TO";
      else
        symbol= symbolName;
  console.log("My Symbol is" ,symbol);
  const {data,isStockList}=useGetStockLiveDataQuery ({liveInterval, symbol,range});
  const seriesData = [];
  const categoriesD=[];
  const timestamp=[];
  const arrayHigh=[];
  console.log(symbol);
  console.log('LiveChart',data);

 

const timearray= data?.chart?.result[0]?.timestamp;
const higharray= data?.chart?.result[0]?.indicators?.quote[0]?.high;
const lowarray= data?.chart?.result[0]?.indicators?.quote[0]?.low;
const closearray= data?.chart?.result[0]?.indicators?.quote[0]?.close;
const openarray= data?.chart?.result[0]?.indicators?.quote[0]?.open;
const volumearray= data?.chart?.result[0]?.indicators?.quote[0]?.volume;



 for(let i = 0 ; i <timearray?.length, i<higharray?.length, i <lowarray?.length, i <closearray?.length, i< openarray?.length, i < volumearray?.length; i++){
    const seriesCandleStickChartSeriesData = [];
    seriesCandleStickChartSeriesData.push(timearray[i]*1000);
    seriesCandleStickChartSeriesData.push(openarray[i]?.toFixed(2));
    seriesCandleStickChartSeriesData.push(higharray[i]?.toFixed(2));
    seriesCandleStickChartSeriesData.push(lowarray[i]?.toFixed(2));
    seriesCandleStickChartSeriesData.push(closearray[i]?.toFixed(2));
    arrayHigh.push(closearray[i]?.toFixed(2));
    seriesData.push(seriesCandleStickChartSeriesData);
    timestamp.push(new Date(timearray[i]*1000).toLocaleString("en-US"));
    categoriesD.push(volumearray[i]?.toFixed(2));
 }

 console.log(seriesData);

 let min = Math.min(...arrayHigh);
 let max= Math.max(...arrayHigh);
 let minDate = timestamp?.[0];
 let count= timestamp?.length-1;
 let maxDate =timestamp?.[count];
 console.log(minDate);
 let stringMinDate= minDate;
let stringMaxDate= maxDate;

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



  if( isStockList) return 'Loading..';
  return (
    <>
<br></br>
<br></br>
<Row>
<Col span={12}>
  <h3>High b/w {stringMinDate} to {stringMaxDate}</h3>
  <div><h3>${max}</h3></div>
</Col>
<Col span={12}>
  <h3>Low b/w {stringMinDate} to {stringMaxDate}</h3>
  <div><h3>${min}</h3></div>
</Col>
</Row>
<Row >
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
    type="bar"
    height ="200"

  />
  </Col>
  </Row>
  </>
  )
}

export default StockDetails