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


    function UserGreeting(props) {
        if(!flag)
            return <h1>Welcome back!</h1>;
        return <LineChart symbolName={symbolChangesOnSelect}/>;
     }
    const searchResult = (query) =>
    stockOptionsData.map((record, idx) => {
      
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
      
  const handleSearch = (value) => {
    setSymbol(value);
    console.log('Inside handle search')
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log(value);
    setsymbolChangesOnSelect(value);
    setFlag(true);
    
  };
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
    <Input.Search size="large" placeholder="input here" enterButton />
  </AutoComplete>

  <br></br>
  <br></br>
  <br></br>


    {UserGreeting()}
  

    </>

   
  )
}

export default StockChart