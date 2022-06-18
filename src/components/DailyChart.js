import React , {useState}from 'react';
import { useGetDailyStockDataQuery , useGetDailySMADataQuery} from '../services/chart';
import Chart from "react-apexcharts";
import {Row,Col} from  'antd';
import ReactApexChart from 'react-apexcharts';



const DailyChart = ({symbolName, interval}) => {
 
  let timeperiod=4;
  let timeperiod1=9;
  let timeperiod2=55;
  let symbol=symbolName;
    const {data,isStockList}= useGetDailyStockDataQuery(symbolName);
    const{data: stockIndicatorSMA}=useGetDailySMADataQuery({symbol,timeperiod});
    const{data: stockIndicatorSMA1}=useGetDailySMADataQuery({symbol,timeperiod:timeperiod1});
    const{data: stockIndicatorSMA2}=useGetDailySMADataQuery({symbol,timeperiod:timeperiod2});
    console.log("Indicator:",stockIndicatorSMA);
    console.log("Indicator 1:",stockIndicatorSMA1);
    console.log("Indicator 2:",stockIndicatorSMA2);


    
  
    console.log('LineChart',symbolName);
    console.log('LineChart',data);

    const seriesData = [];
    const seriesLinearData = [];
    const categoriesD=[];
    const timestamp=[];
    const arrayHigh=[];
    const seriesDataForObject=[];
    const seriesDataForIndicator=[];
    const seriesDataForIndicatorA=[];
    const seriesDataForIndicatorA1=[];
    const seriesDataForIndicatorA2=[];
    

    console.log(data);


    console.log(data?.['Meta Data']);
    console.log(data?.["Time Series (Daily)"]);

    const SMA=[];
    for(const item in stockIndicatorSMA?.["Technical Analysis: SMA"]){
      const arrayData=[];
      arrayData.push(item);
      arrayData.push(stockIndicatorSMA?.["Technical Analysis: SMA"]?.[item]?.["SMA"]);
      SMA.push(arrayData);
    }

    const SMA1=[];
    for(const item in stockIndicatorSMA1?.["Technical Analysis: SMA"]){
      const arrayData=[];
      arrayData.push(item);
      arrayData.push(stockIndicatorSMA1?.["Technical Analysis: SMA"]?.[item]?.["SMA"]);
      SMA1.push(arrayData);
    }


    const SMA2=[];
    for(const item in stockIndicatorSMA2?.["Technical Analysis: SMA"]){
      const arrayData=[];
      arrayData.push(item);
      arrayData.push(stockIndicatorSMA2?.["Technical Analysis: SMA"]?.[item]?.["SMA"]);
      SMA2.push(arrayData);
    }


 
   for(const item in data?.["Time Series (Daily)"]){
       
       const seriesDataArrayFields= [];
       const arrayobj=[];
       seriesDataArrayFields.push(item);
       seriesDataArrayFields.push(data["Time Series (Daily)"][item]["1. open"]);
       seriesDataArrayFields.push(data["Time Series (Daily)"][item]["2. high"]);
       seriesDataArrayFields.push(data["Time Series (Daily)"][item]["3. low"]);
       seriesDataArrayFields.push(data["Time Series (Daily)"][item]["4. close"]);
       arrayobj.push(data["Time Series (Daily)"][item]["1. open"]);
       arrayobj.push(data["Time Series (Daily)"][item]["2. high"]);
       arrayobj.push(data["Time Series (Daily)"][item]["3. low"]);
       arrayobj.push(data["Time Series (Daily)"][item]["4. close"]);
       arrayHigh.push(data["Time Series (Daily)"][item]["4. close"]);
       //console.log(data["Time Series (Daily)"][item]["1. open"]);
       const seriesLinearDataTemp = [];
       seriesLinearDataTemp.push(item);
       seriesLinearDataTemp.push(data["Time Series (Daily)"][item]["5. volume"])
       seriesData.push(seriesDataArrayFields);
       timestamp.push(item);
       categoriesD.push(data["Time Series (Daily)"][item]["5. volume"]);
       seriesLinearData.push(seriesLinearDataTemp);



       const obj= {
         x: item,
         y:arrayobj
       };
       seriesDataForObject.push(obj);

       const objIndicator= {
        x: item,
        y:data["Time Series (Daily)"][item]["4. close"]
      };
      seriesDataForIndicator.push(objIndicator);

       let index=SMA?.findIndex(element=> element[0]==item);
       let element = SMA?.[index]?.[1];

      
      let objIndicator1= {
        x: item,
        y:element
      };

       seriesDataForIndicatorA.push(objIndicator1);

        index=SMA1?.findIndex(element=> element[0]==item);
        element = SMA1?.[index]?.[1];

      
       objIndicator1= {
        x: item,
        y:element
      };

       seriesDataForIndicatorA1.push(objIndicator1);

       index=SMA2?.findIndex(element=> element[0]==item);
        element = SMA2?.[index]?.[1];

      
       objIndicator1= {
        x: item,
        y:element
      };

       seriesDataForIndicatorA2.push(objIndicator1);


   }

   console.log("Actual Indicator", seriesDataForIndicatorA);

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
 console.log(seriesDataForObject);

 var st =
 {
   series: [{
     name: '4-DAY MA',
     type: 'line',
     data: seriesDataForIndicatorA
   },{
    name: '9-DAY MA',
    type: 'line',
    data: seriesDataForIndicatorA1
  },

  
   
   {
     name: 'candle',
     type: 'candlestick',
     data: seriesDataForObject
   }],
   options: {
     chart: {
       height: 350,
       type: 'line',
     },
     title: {
       text: 'CandleStick Chart With SMA',
       align: 'left'
     },
     stroke: {
       width: [0.5,0.5, 1]
     },
     colors: ["#FF1654", "#247BA0"],
     tooltip: {
       shared: true,
       custom: [function({seriesIndex, dataPointIndex, w}) {
         return w.globals.series[seriesIndex][dataPointIndex]
       }, function({ seriesIndex, dataPointIndex, w }) {
         var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
         var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
         var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
         var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
         return (
           '<div class="apexcharts-tooltip-candlestick">' +
           '<div>Open: <span class="value">' +
           o +
           '</span></div>' +
           '<div>High: <span class="value">' +
           h +
           '</span></div>' +
           '<div>Low: <span class="value">' +
           l +
           '</span></div>' +
           '<div>Close: <span class="value">' +
           c +
           '</span></div>' +
           '</div>'
         )
       }]
     },
     xaxis: {
       type: 'datetime'
     }
   },
 
 
 };










//if( isStockList) return 'Loading..';
  return (
    <>
   <br></br>
   <br></br>
 
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
    <br></br>
    <br></br>
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

<div id="chart1">
 <ReactApexChart options={st.options} series={st.series} type="line" height={350} />
</div>



  </>
  )
}

export default DailyChart