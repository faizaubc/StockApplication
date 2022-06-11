import React , {useState}from 'react';
import { useGetDailyStockDataQuery } from '../services/chart';
import {Line} from 'react-chartjs-2';
import {Col, Row, Typography} from 'antd';
import { Line as ChartJS } from 'chart.js/auto';
import ApexCharts from 'apexcharts';
import Chart from "react-apexcharts";
import DailyChart from './DailyChart';
import MonthlyChart from './MontlyChart';
import WeeklyChart from './WeeklyChart';
import StockDetails from './StockDetails';



const LineChart = ({symbolName, interval ,liveinterval,range}) => {
  
    function Initialize(){
        if(interval=="Daily")
        return <DailyChart symbolName={symbolName} interval={interval}/>

        if(interval=="Weekly")
        return <WeeklyChart symbolName={symbolName} interval={interval}/>

        if(interval=="Monthly")
        return <MonthlyChart symbolName={symbolName} interval={interval}/>

        if(interval=="Live")
        return <StockDetails symbolName={symbolName} interval={interval} liveInterval={liveinterval} range={range}/>
    }
  return (
      <>
    {Initialize()}
     </>
  )
}

export default LineChart