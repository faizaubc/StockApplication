import React , {useState}from 'react';
import millify from "millify";
import {Typography, Row, Col , Statistic, Select, Space, Card,AutoComplete} from 'antd';
import {Link} from 'react-router-dom';
import { useGetMoversQuery } from '../services/stockApi';
import {useGetStockNewsQuery} from '../services/newsfinance';
const {Title,Text} = Typography;
const {Option}= Select;



const Homepage = () => {
  const [perfID,setPerfID]=useState('0P00008IVF');
  let flag = true;
 
  const{data: stockNews}= useGetStockNewsQuery(perfID);
  const topActives = stockNews?.Top10?.Actives?.Securities;
  const topGainers = stockNews?.Top10?.Gainers?.Securities;
  const topLosers = stockNews?.Top10?.Losers?.Securities;
  console.log("News Data Array:",stockNews);
  console.log(topActives);
  console.log(topGainers);
  console.log(topLosers);

  const optionsSearch = [
    {
      value: 'S&P/TSX Composite CA',
    },
    {
      value: 'S&P/TSX 60 CA',
    },
    {
      value: 'S&P/TSX Small Cap CA',
    },
    {
      value: 'S&P/TSX Venture CA',
    },
    {
      value: 'DJ Industrial Average US',
    },
    {
      value: 'Morningstar US Market',
    },
    {
      value: 'S&P 500 US Market',
    },
    {
      value: 'NASDAQ Composite US Market',
    },
  ];





  const onSelect = (value) => {
    console.log('onSelect', value);
  
    let perfIndex='';
    if(value=='S&P/TSX Composite CA')
    perfIndex='0P00008IVF';
    else if(value=='S&P/TSX 60 CA')
    perfIndex='0P00008PAC';
    else if (value=='S&P/TSX Small Cap CA')
    perfIndex='0P00008IVE';
    else if (value =='S&P/TSX Venture CA')
    perfIndex='0P00001QO6'
    else if (value =='DJ Industrial Average US')
    perfIndex='0P00001FJG'
    else if (value =='Morningstar US Market')
    perfIndex='0P00001GJH'
    else if (value =='S&P 500 US Market')
    perfIndex='0P00001G7J'
    else if (value =='NASDAQ Composite US Market')
    perfIndex='0P00001G7B'

    setPerfID(perfIndex);
    


  };
 

  return (
    <>
    <Title level={3} className="heading">Canadian Stock Gainers, Loosers, Actives</Title>
    <Row>
      <Col span={30}>

  <AutoComplete
        defaultValue='S&P/TSX Composite'
        style={{
          width: 200,
        }}
        options={optionsSearch}
        onSelect={onSelect}
        placeholder="Enter the market.."
        
  />
  <br></br>
  <br></br>     
   </Col>
 
    </Row>

<br></br>
<Title level={4}>Active Stocks in Canadian Market:</Title>

<Row gutter= {[24,24]}>
    {topActives?.map((record, i)=>(
        <Col xs ={24} sm={12} lg={8} key={i}>
        <Card lassName="news-card">
          <Title className="news-title" level={5}>{record?.Security?.Name}</Title> 
          <Title className="news-title" level={5}>Exchange:   {record?.Security?.ExchangeShortName}&nbsp;&nbsp;</Title> 

          <div className="provider-container">
            <Text>Sector: {record?.Security?.Sector}&nbsp;&nbsp;</Text>      
          </div> 
         
          <div>
          <Text>Day High: {millify(record?.Quote?.DayHigh)}&nbsp;&nbsp;</Text>         
          </div>
          <div>
          <Text>Day Low: {record?.Quote?.DayLow}</Text> 
          </div>
          <div>
          <Text>FiftyTwoWeekHigh: {record?.Quote?.FiftyTwoWeekHigh}</Text> 
          </div>
          <div>
          <Text>FiftyTwoWeekLow: {record?.Quote?.FiftyTwoWeekLow}</Text> 
          </div>
          <div>
          <Text>OpenPrice: {record?.Quote?.OpenPrice}</Text> 
          </div>
          <div>
          <Text>PercentChange: {record?.Quote?.PercentChange}</Text> 
          </div>
          <div>
          <Text>PriceChange: {record?.Quote?.PriceChange}</Text> 
          </div>
          <div>
          <Text>Volume: {millify(record?.Quote?.Volume)}</Text> 
          </div>
          <div>
          <Text>YesterdayPrice: {record?.Quote?.YesterdayPrice}</Text> 
          </div>
         </Card>
         </Col>
     ))
     }
  </Row>
<br></br>
<br></br>
<Title level={4}>Gainers in the Canadian Market:</Title>
<Row gutter= {[24,24]}>
    {topGainers?.map((record, i)=>(
        <Col xs ={24} sm={12} lg={8} key={i}>
        <Card lassName="news-card">
          <Title className="news-title" level={5}>{record?.Security?.Name}</Title> 
          <Title className="news-title" level={5}>Exchange:   {record?.Security?.ExchangeShortName}&nbsp;&nbsp;</Title> 

          <div className="provider-container">
            <Text>Sector: {record?.Security?.Sector}&nbsp;&nbsp;</Text>      
        
          </div>    
          <div>
          <Text>Day High: {millify(record?.Quote?.DayHigh)}&nbsp;&nbsp;</Text>         
          </div>
          <div>
          <Text>Day Low: {record?.Quote?.DayLow}</Text> 
          </div>
          <div>
          <Text>FiftyTwoWeekHigh: {record?.Quote?.FiftyTwoWeekHigh}</Text> 
          </div>
          <div>
          <Text>FiftyTwoWeekLow: {record?.Quote?.FiftyTwoWeekLow}</Text> 
          </div>
          <div>
          <Text>OpenPrice: {record?.Quote?.OpenPrice}</Text> 
          </div>
          <div>
          <Text>PercentChange: {record?.Quote?.PercentChange}</Text> 
          </div>
          <div>
          <Text>PriceChange: {record?.Quote?.PriceChange}</Text> 
          </div>
          <div>
          <Text>Volume: {millify(record?.Quote?.Volume)}</Text> 
          </div>
          <div>
          <Text>YesterdayPrice: {record?.Quote?.YesterdayPrice}</Text> 
          </div>
         </Card>
         </Col>
     ))
     }
  </Row>
<br></br>
<br></br>
<Title level={4}>Loosers in Canadian Market:</Title>
<Row gutter= {[24,24]}>
    {topLosers?.map((record, i)=>(
        <Col xs ={24} sm={12} lg={8} key={i}>
        <Card lassName="news-card">
          <Title className="news-title" level={5}>{record?.Security?.Name}</Title> 
          <Title className="news-title" level={5}>Exchange:   {record?.Security?.ExchangeShortName}&nbsp;&nbsp;</Title> 

          <div className="provider-container">
            <Text>Sector: {record?.Security?.Sector}&nbsp;&nbsp;</Text>      
        
          </div>    
          <div>
          <Text>Day High: {millify(record?.Quote?.DayHigh)}&nbsp;&nbsp;</Text>         
          </div>
          <div>
          <Text>Day Low: {record?.Quote?.DayLow}</Text> 
          </div>
          <div>
          <Text>FiftyTwoWeekHigh: {record?.Quote?.FiftyTwoWeekHigh}</Text> 
          </div>
          <div>
          <Text>FiftyTwoWeekLow: {record?.Quote?.FiftyTwoWeekLow}</Text> 
          </div>
          <div>
          <Text>OpenPrice: {record?.Quote?.OpenPrice}</Text> 
          </div>
          <div>
          <Text>PercentChange: {record?.Quote?.PercentChange}</Text> 
          </div>
          <div>
          <Text>PriceChange: {record?.Quote?.PriceChange}</Text> 
          </div>
          <div>
          <Text>Volume: {millify(record?.Quote?.Volume)}</Text> 
          </div>
          <div>
          <Text>YesterdayPrice: {record?.Quote?.YesterdayPrice}</Text> 
          </div>
         </Card>
         </Col>
     ))
     }
  </Row>
<br></br>
<br></br>
    
  
    </>
  )
}

export default Homepage