import React , {useState}from 'react';
import { useGetDailyStockDataQuery , useGetDailySMADataQuery, useGetDailyRSIDataQuery, useGetDailyStocDataQuery} from '../services/chart';
import Chart from "react-apexcharts";
import {Row,Col, Checkbox} from  'antd';
import ReactApexChart from 'react-apexcharts';




const DailyChart = ({symbolName, interval}) => {
 
  let timeperiod=4;
  let timeperiod1=9;
  let timeperiod2=55;
  let timeperiodRSI=10;
  let symbol=symbolName;
  let inter="daily";
    const {data,isStockList}= useGetDailyStockDataQuery(symbolName);
    const{data: stockIndicatorSMA}=useGetDailySMADataQuery({symbol,timeperiod});
    const{data: stockIndicatorSMA1}=useGetDailySMADataQuery({symbol,timeperiod:timeperiod1});
    const{data: stockIndicatorSMA2}=useGetDailySMADataQuery({symbol,timeperiod:timeperiod2});
    const{data: stockIndicatorRSI}=useGetDailyRSIDataQuery({symbol,timeperiod:timeperiodRSI, int:inter});
     //const{data: stockIndicatorStoc}=useGetDailyStocDataQuery(symbol);
     const [stoc, setstoc] = useState([])
    console.log("Indicator:",stockIndicatorSMA);
    console.log("Indicator 1:",stockIndicatorSMA1);
    console.log("Indicator 2:",stockIndicatorSMA2);
    console.log("RSI:",stockIndicatorRSI);
   // console.log("Scholastic",stockIndicatorStoc);


    
  
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
    const volumeArray= [];
    var [colorsArray, setColorsArray]= useState(["#e6f7ff","#e6f7ff", "#e6f7ff"]);
    const seriesDataForRSIIndicator=[];
     const seriesDataForSTOCSlowDIndicator=[];
     const seriesDataForSTOCSlowKIndicator=[];
    

    console.log(data);


    console.log(data?.['Meta Data']);
    console.log(data?.["Time Series (Daily)"]);


    const STOC=[];
    for(const item in stoc?.["Technical Analysis: STOCH"]){
      const arrayData=[];
      arrayData.push(item);
      arrayData.push(stoc?.["Technical Analysis: STOCH"]?.[item]?.["SlowD"]);
      arrayData.push(stoc?.["Technical Analysis: STOCH"]?.[item]?.["SlowK"]);
      STOC.push(arrayData);
    }

    console.log("Scholarastic",STOC);

    const RSI=[];
    for(const item in stockIndicatorRSI?.["Technical Analysis: RSI"]){
      const arrayData=[];
      arrayData.push(item);
      arrayData.push(stockIndicatorRSI?.["Technical Analysis: RSI"]?.[item]?.["RSI"]);
      RSI.push(arrayData);
    }

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

       objIndicator1= {
        x: item,
        y:data["Time Series (Daily)"][item]["5. volume"]
      };

      volumeArray.push(objIndicator1);

      index=RSI?.findIndex(element=> element[0]==item);
      element =RSI?.[index]?.[1];
      seriesDataForRSIIndicator.push(element);
    
      index=STOC?.findIndex(element=> element[0]==item);
      element =STOC?.[index]?.[1];
      let element2 =STOC?.[index]?.[2];
      seriesDataForSTOCSlowDIndicator?.push(element);
      seriesDataForSTOCSlowKIndicator?.push(element2);



   }
   console.log("K", seriesDataForSTOCSlowKIndicator);
   console.log("D", seriesDataForSTOCSlowDIndicator);

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
       height: 200
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
     data: categoriesD.reverse(),
     name:"volume"
   }],
   options: {
     chart: {
       type: 'bar',
       height: 50
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

//Stoc chart
let stocchart = {
          
  series: [{
      name: "SLOWD",
      data: seriesDataForSTOCSlowDIndicator.reverse()
  },{
    name: "SLOWK",
    data: seriesDataForSTOCSlowKIndicator.reverse()
},  ],
  options: {
    chart: {
      height: 350,
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
      width: [2,2]
    },
    title: {
      text: 'Stochastic Oscillator',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
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
    name: '55-DAY MA',
    type: 'line',
    data: seriesDataForIndicatorA2
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
       align: 'middle'
     },
     stroke: {
       width: [0.5,0.5, 0.5, 1]
     },
     colors: colorsArray,
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


// #e6f7ff
const onChange = (checkedValues) => {
  console.log('checked = ', checkedValues);
  let color="";
  let arrayDataValues= ["#e6f7ff","#e6f7ff", "#e6f7ff"];
  for(let x in checkedValues){
    if(checkedValues[x]=="4")
    {
       color= "#FF1654";
       arrayDataValues[0]=color;
    }
    
    
    if(checkedValues[x]=="9")
    {
       color= "#247BA0";
       arrayDataValues[1]=color;
    }
  

    if(checkedValues[x]=="55")
    {
       color= "#BF40BF";
       arrayDataValues[2]=color;
    }
    
  }
  setColorsArray(arrayDataValues);
  console.log("Color Array Is:", arrayDataValues);
};


const fetchData = () => {
  fetch(`https://www.alphavantage.co/query?function=STOCH&symbol=${symbol}&interval=daily&apikey=HLCNBX33PQ7B2OOL`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      setstoc(data);
      console.log(stoc);
    })
}


let chartsync = {
          
  series: [{
    data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
      min: 10,
      max: 60
    })
  }],
  options: {
    chart: {
      id: 'fb',
      group: 'social',
      type: 'line',
      height: 160
    },
    colors: ['#008FFB'],
    markers: {
      size: 6,
      hover: {
        size: 10
      }
    },
    tooltip: {
      followCursor: false,
      theme: 'dark',
      x: {
        show: false
      },
      marker: {
        show: false
      },
      y: {
        title: {
          formatter: function() {
            return ''
          }
        }
      }
    },dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },  yaxis: {
      tickAmount: 2
    },
    xaxis: {
      type: 'datetime'
    },
  },

  seriesLine2: [{
    data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
      min: 10,
      max: 30
    })
  }],
  optionsLine2: {
    chart: {
      id: 'tw',
      group: 'social',
      type: 'line',
      height: 160
    },
    colors: ['#546E7A'],
    markers: {
      size: 6,
      hover: {
        size: 10
      }
    },
    tooltip: {
      followCursor: false,
      theme: 'dark',
      x: {
        show: false
      },
      marker: {
        show: false
      },
      y: {
        title: {
          formatter: function() {
            return ''
          }
        }
      }
    },dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    }, 
     yaxis: {
      tickAmount: 2
    },
    xaxis: {
      type: 'datetime'
    },
  },

  seriesArea: [{
    data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
      min: 10,
      max: 60
    })
  }],
  optionsArea: {
    chart: {
      id: 'yt',
      group: 'social',
      type: 'area',
      height: 160
    },
    colors: ['#00E396'],
    markers: {
      size: 6,
      hover: {
        size: 10
      }
    },
    tooltip: {
      followCursor: false,
      theme: 'dark',
      x: {
        show: false
      },
      marker: {
        show: false
      },
      y: {
        title: {
          formatter: function() {
            return ''
          }
        }
      }
    },dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    }, 
     yaxis: {
      tickAmount: 2
    },
    xaxis: {
      type: 'datetime'
    },
  },

 
  


};

let  Apex = {
  chart: {
    height: 160,
    group: 'social',
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  toolbar: {
    tools: {
      selection: false
    }
  },
  markers: {
    size: 6,
    hover: {
      size: 10
    }
  },
  tooltip: {
    followCursor: false,
    theme: 'dark',
    x: {
      show: false
    },
    marker: {
      show: false
    },
    y: {
      title: {
        formatter: function() {
          return ''
        }
      }
    }
  },
  grid: {
    clipMarkers: false
  },
  yaxis: {
    tickAmount: 2
  },
  xaxis: {
    type: 'datetime'
  },
}

function generateDayWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseval += 86400000;
    i++;
  }
  return series;
}
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
    height="300"
  />
     <Chart
    options={optionsBar.options}
    series={optionsBar.series}
    width="1000"
    height="200"
    type="bar"

  />
  <Chart
    options={lineRSI.options}
    series={lineRSI.series}
    width="1000"
    height="200"
    type="line"

  />

  <br></br>
  <h3>Pick The Indicators:</h3>
<Checkbox.Group
    style={{
      width: '100%',
    }}
    onChange={onChange}
  >
    <Row>
      <Col span={8}>
        <Checkbox value="4">4 Day Moving Average</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="9">9 Day Moving Average</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="55">55 Day Moving Average</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="D">D</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="E">E</Checkbox>
      </Col>
    </Row>
  </Checkbox.Group>
<div id="chart1">
 <ReactApexChart options={st.options} series={st.series} type="line" height={350} />
</div>

<div id="chart1">
  <ReactApexChart options={stocchart.options} series={stocchart.series} type="line" height={350} />
</div>

<button onClick={fetchData}>Fetch Users</button>
<div id="wrapper">
    <div id="chart-line">
      <ReactApexChart options={chartsync.options} series={chartsync.series} type="line" height={160} />
    </div>
    <div id="chart-line2">
      <ReactApexChart options={chartsync.optionsLine2} series={chartsync.seriesLine2} type="line" height={160} />
    </div>
    <div id="chart-area">
      <ReactApexChart options={chartsync.optionsArea} series={chartsync.seriesArea} type="area" height={160} />
    </div>
  </div>              
                
             
  </>
  )
}

export default DailyChart