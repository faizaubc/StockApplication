import React , {useState}from 'react';
import {  useGetDailySMADataQuery, useGetDailyStockDataQuery} from '../services/chart';
import Chart from "react-apexcharts";
import {Row,Col} from  'antd';
import ReactApexChart from 'react-apexcharts';


const GraphWithIndicator = ({seriesDataForObject, symbol }) => {

    let timeperiod=10;
    console.log("Symbol", symbol);
    console.log("Transferred Data is ",seriesDataForObject);
    //let symbolName=symbol;
    //const {data,isStockList}= useGetDailyStockDataQuery(symbol);
    const{data: stockNews}= useGetDailyStockDataQuery(symbol);
    const{data: stockIndicator}=useGetDailySMADataQuery({symbol,timeperiod});
    console.log("Stock News:",stockNews);
    console.log("Indicator:",stockIndicator);


    //console.log("SMA Data Is",data);
  return (
    <div>GraphWithIndicator</div>
  )
}

export default GraphWithIndicator