import React , {useState}from 'react';
import { useGetStockLiveDataQuery } from '../services/stockApi';
import Chart from "react-apexcharts";

const StockDetails = ({symbolName, interval, liveInterval, range}) => {
  const symbol = symbolName.split('.')[0] + ".TO";
  const {data,isStockList}=useGetStockLiveDataQuery ({liveInterval, symbol,range});
  const seriesData = [];
  const categoriesD=[];
  const timestamp=[];
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
    seriesCandleStickChartSeriesData.push(timearray[i]);
    seriesCandleStickChartSeriesData.push(openarray[i]?.toFixed(2));
    seriesCandleStickChartSeriesData.push(higharray[i]?.toFixed(2));
    seriesCandleStickChartSeriesData.push(lowarray[i]?.toFixed(2));
    seriesCandleStickChartSeriesData.push(closearray[i]?.toFixed(2));
    seriesData.push(seriesCandleStickChartSeriesData);
    timestamp.push(timearray[i]);
    categoriesD.push(volumearray[i]?.toFixed(2));
 }

 console.log(seriesData);

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

export default StockDetails