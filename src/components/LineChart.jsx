import React , {useState}from 'react';
import { useGetDailyStockDataQuery } from '../services/chart';
import {Line} from 'react-chartjs-2';
import {Col, Row, Typography} from 'antd';
import { Line as ChartJS } from 'chart.js/auto';
import ApexCharts from 'apexcharts';
import Chart from "react-apexcharts";




const LineChart = ({symbolName}) => {
  
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
        name: 'volume',
        data: categoriesD
      }],
        chart: {
        height: 160,
        type: 'bar'
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          columnWidth: '80%',
          
        }
      },
      
      xaxis: {
        type: 'datetime',
        axisBorder: {
          offsetX: 13,
          categoriesD: timestamp
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      }
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
    options={optionsBar.plotOptions}
    series={optionsBar.series}
    yaxis={optionsBar.yaxis}
    stroke= {optionsBar.stroke}
    chart={optionsBar.chart}
    width="500"
    type="bar"

  />
  </>
  )
}

export default LineChart