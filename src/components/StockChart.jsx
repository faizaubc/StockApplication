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
      ];


    function DrawChart(props) {
        if(!flag)
            return <h1>Welcome back!</h1>;
        return <LineChart symbolName={symbolChangesOnSelect} interval={intervalSelection}/>;
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

  };
  //makes sure data for the api is here
  if( isStockList) return 'Loading..';
  return (
    <>
<h2>{symbol} Stock Graph</h2>

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

  <br></br>
  <br></br>
  
  <AutoComplete
        style={{
        width: 200,
        }}
        options={optionsTimeInterval}
        onSelect={onSelectForStockInterval}
        placeholder="Chart Interval Here"
        defaultValue="Daily"
       
  />
  <br></br>
  <br></br>


    {DrawChart()}
  

    </>

   
  )
}

export default StockChart