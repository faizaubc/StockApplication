import React , {useState}from 'react';
import millify from "millify";
import {Typography, Row, Col , Statistic, Select, Space, Card,Carousel, Collapse ,AutoComplete, Input, Avatar} from 'antd';
import {Link} from 'react-router-dom';
import { useGetStockListQuery} from '../services/stock';
import moment from 'moment';
import LineChart from './LineChart';


function StockChart() {
    const [symbol, setSymbol]= useState('VET');
    const [symbolChangesOnSelect, setsymbolChangesOnSelect]= useState('');
    const {data,isStockList}= useGetStockListQuery(symbol);
    const [options, setOptions] = useState([]);
    const stockOptionsData= data?.bestMatches;
    const [flag, setFlag]= useState(false);
    const [intervalSelection, setIntervalSelection]= useState("Daily");
    const [intervalLiveSelection, setIntervalLiveSelection]= useState("5m");
    const [rangeLiveSelection, setRangeLiveSelection]= useState("5m");
    const [display, setDisplay]= useState('none');//setting the item visible for weekly
    const [weeklyInterval, setWeeklyInterval]= useState('2020');

    //weekly interval creation:
    //hide the weekly drop down
    var today = new Date();
    
    let year = today.getFullYear();
    console.log(year);
    year = year-11;
    const optionsWeekly=[];
    for(let i = 0; i < 10; i ++){
        
       const obj= {
       value: year +i
      };

      optionsWeekly.push(obj);
    }

    //make sure the element is not null before setting the display to not visible
    if(document.getElementById("weekly")!= null)
      document.getElementById("weekly").style.display = display;
 
    
   
    //This is the data for searching time interval
    const optionsTimeInterval = [
        {
          value: 'Daily',
        },
        {
          value: 'Weekly',
        },
        {
          value: 'Monthly',
        },
        {
          value: 'Live',
        },
      ];

       //This is the data for selecting live time interval for stocks
     const optionsLiveInterval = [
        {
          value: '1m',
        },
        {
          value: '2m',
        },
        {
          value: '5m',
        },
        {
          value: '15m',
        },
        {
          value: '60m',
        },
        {
          value: '1d',
        },
      ];

    //This is the data for selecting live time RANGE for stocks
     const optionsLiveRange = [
      {
        value: '1d',
      },
      {
        value: '5d',
      },
      {
        value: '1mo',
      },
      {
        value: '6mo',
      },
      {
        value: '1y',
      },
      {
        value: '2y',
      },
      {
        value: '5y',
      },
      {
        value: '10y',
      },
    ];
      


    function DrawChart(props) {

      //onload hide the visibility of the autocompte:
    //document.getElementById('interval').disabled=true;
        if(!flag)
            return <h1><br></br>Enter the Stock Data to See Charts !</h1>;
        return <LineChart symbolName={symbolChangesOnSelect} interval={intervalSelection} liveinterval={intervalLiveSelection} range={rangeLiveSelection} weekly={weeklyInterval}/>;
     }

     //Search Result for the drop down of the Stock Search Query
    const searchResult = (query) =>
    stockOptionsData?.map((record, idx) => {
      
      const category= `${record["1. symbol"]}  ${record["2. name"] }`;
      const valueData = `${record["1. symbol"]}`;
      const index = `${idx}`;
        if(!isNaN(record["1. symbol"]) && !isNaN(record["2. name"] )){ category=`${record["1. symbol"]}${record["2. name"] }`};
          return {
            value: valueData,
            label: (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>
                  
                    {category}
                  
                </span>
              </div>
            ),
          };
        });

  //Handle search for the stock drop down query
  const handleSearch = (value) => {
    setSymbol(value);
    console.log('Inside handle search');
    setOptions(value ? searchResult(value) : []);
  };
  //When the Stock is being chosen this function will run setting the flag 
  //parameter to true
  //It renders again if the parameter is true it will output a new graph
  const onSelect = (value) => {
    console.log(value);
    setsymbolChangesOnSelect(value);
    setFlag(true);
    
  };

  //This runs on if the interval is selected 
  const onSelectForStockInterval = (value) => {
    console.log('Stock Interval Is Selected', value);
    setIntervalSelection(value);

    if(value=="Weekly"){
      setDisplay('inline');
    }
    else 
     setDisplay('none');
   

  };

    //This runs on if the interval is selected for the live data
    const onSelectForStockLiveInterval = (value) => {
      console.log('Stock LIVE Interval Is Selected', value);
      setIntervalLiveSelection(value);
  
    };

     //This runs on if the range is selected for the live data
    const onSelectForStockLiveRange = (value) => {
      console.log('Stock LIVE RANGE Is Selected', value);
      setRangeLiveSelection(value);
  
    };

    const IsDisabled = () => {
      console.log('Stock LIVE RANGE Is Selected');
      return false;
  
    };

    //select the year for the weekly chart:
   
    const onSelectForWeekly = (value) => {
      console.log('Weekly Year Selected', value);
      setWeeklyInterval(value);
     
  
    };
  
  //makes sure data for the api is here
  if( isStockList) return 'Loading..';
  return (
    <>
<h2>{symbol} Stock Graph</h2>
<Row>
  <Col span={12}>
<h3>Input the stocks here:</h3>
    <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{
        width: 300,
        }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}

    >
    <Input.Search size="large" placeholder="Start Typing Stock..." enterButton />
  </AutoComplete>
 

  </Col>
  <Col>
   <div id="weekly">
   <h3>Select Time Frame :</h3>
   <AutoComplete
        style={{
        width: 200,
        }}
        options={optionsWeekly}
        onSelect={onSelectForWeekly}
        placeholder="Weekly Interval"
        defaultValue="2020"
       
  />

   </div>
  </Col>
  </Row>
  <Row>
  <br></br>
  <br></br>
  <Col span={8} >
  <h3>Select Period Type:</h3>
  <AutoComplete
        style={{
        width: 200,
        }}
        options={optionsTimeInterval}
        onSelect={onSelectForStockInterval}
        placeholder="Chart Interval Here"
        defaultValue="Daily"
       
  />

  </Col>
  <br></br>
  <br></br>
  <Col span={8}>
  <h3>Select Ticks Type:(Live Only)</h3>

  <AutoComplete
        style={{
        width: 200,
        }}
        options={optionsLiveInterval}
        onSelect={onSelectForStockLiveInterval}
        placeholder="Chart Live Interval Here"
        defaultValue="5m"
        id="interval"
     
       
  />


</Col>
<br></br>
<br></br>
<Col span={8}>
<h3>Select Period Duration Type: (Live Only)</h3>

  <AutoComplete
        style={{
        width: 200,
        }}
        options={optionsLiveRange}
        onSelect={onSelectForStockLiveRange}
        placeholder="Chart Live Range Here"
        defaultValue="1d"
        id="range"
        
       
  />
</Col>
</Row>



    {DrawChart()}
  

    </>

   
  )
}

export default StockChart