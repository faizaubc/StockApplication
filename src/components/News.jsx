import React , {useState}from 'react';
import millify from "millify";
import {Typography, Row, Col , Statistic, Select, Space, Card,Carousel, Collapse ,AutoComplete, Input} from 'antd';
import {Link} from 'react-router-dom';
import {useGetNewsDetailsMutation} from '../services/stockApi';
import { useGetStockListQuery } from '../services/stock';
const {Title,Text} = Typography;
const {Option}= Select;
const { Panel } = Collapse;

const News = () => {
  const [symbol, setSymbol]= useState('VET');
  //const {getNews, isFetching}=  useGetNewsDetailsMutation(symbol);
  const [country, setCountry]= useState(symbol);
  const {data,isStockList}= useGetStockListQuery(symbol);

 const stockOptionsData= data?.bestMatches;

 
  console.log(stockOptionsData);

  //console.log(getNews);
 
  const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

  const searchResult = (query) =>
  
  stockOptionsData.map((record, idx) => {
    
    const category= `${record["1. symbol"]}  ${record["2. name"] }`;
    const index = `${idx}`;
      if(!isNaN(record["1. symbol"]) && !isNaN(record["2. name"] )){ category=`${record["1. symbol"]}${record["2. name"] }`};
        return {
          value: idx,
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
  

  const [options, setOptions] = useState([]);

  const handleSearch = (value) => {
    setSymbol(value);
    console.log('Inside handle search')
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value) => {
    console.log('onSelect', value);
  };
  if( isStockList) return 'Loading..';
  //if( isFetching) return 'Loading..';
  return (
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
  )
}

export default News
