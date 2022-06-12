import React , {useState}from 'react';
import millify from "millify";
import {Typography, Row, Col , Statistic, Select, Space, Card} from 'antd';
import {Link} from 'react-router-dom';
import { useGetMoversQuery } from '../services/stockApi';
import {useGetStockNewsQuery} from '../services/newsfinance';
const {Title,Text} = Typography;
const {Option}= Select;



const Homepage = () => {
  const [country, setCountry]= useState('CA');
  let flag = true;
 
  const{data: stockNews}= useGetStockNewsQuery();
  const {data, isFetching}=  useGetMoversQuery(country);
  const topActives = stockNews?.Top10?.Actives?.Securities;
  const topGainers = stockNews?.Top10?.Gainers?.Securities;
  const topLosers = stockNews?.Top10?.Losers?.Securities;
  console.log("News Data Array:",stockNews);
  console.log(topActives);
  console.log(topGainers);
  console.log(topLosers);



  const globalStats= data?.finance?.result[0].quotes;
  const Country = ['CA', 'US'];



 

  if( isFetching) return 'Loading..';
  return (
    <>
    <Title level={3} className="heading">Global Stock Gainers</Title>
    <Row>
      <Col span={30}>
    <Title  level={4}>Please Choose the Country:</Title>
    <Select defaultValue="CA"
        placeholder="Select Country"
        onChange={(value)=> setCountry(value)} 
        >
          {Country.map((con)=> <Option key={con}>{con}</Option>)}
        </Select>
        
   </Col>
 
    </Row>
     <br></br>
     <Title level={4}>Latest Trending Tickets In Market:</Title>
     <Row gutter= {[24,24]}>
    {globalStats.map((record, i)=>(
        <Col xs ={24} sm={12} lg={8} key={i}>
        <Card lassName="news-card">
          <Title className="news-title" level={5}>{record.longName}</Title> 
          <Title className="news-title" level={5}>Exchange:   {record.fullExchangeName}&nbsp;&nbsp;</Title> 

          <div className="provider-container">
            <Text>Symbol: {record.symbol}&nbsp;&nbsp;</Text>      
        
          </div>    
          <p>
          <Text>Regular Market Price: {millify(record.regularMarketPrice)}&nbsp;&nbsp;</Text>         
          </p>
          <p>
          <Text>Regular Market Previous Close: {record.regularMarketPreviousClose}</Text> 
          </p>
         </Card>
         </Col>
     ))
     }
  </Row>
<br></br>
<br></br>
<Title level={4}>Active Stocks in US Market:</Title>

<Row gutter= {[24,24]}>
    {topActives?.map((record, i)=>(
        <Col xs ={24} sm={12} lg={8} key={i}>
        <Card lassName="news-card">
          <Title className="news-title" level={5}>{record?.Security?.Name}</Title> 
          <Title className="news-title" level={5}>Exchange:   {record?.Security?.ExchangeShortName}&nbsp;&nbsp;</Title> 

          <div className="provider-container">
            <Text>Sector: {record?.Security?.Sector}&nbsp;&nbsp;</Text>      
        
          </div>    
          <p>
          <Text>Day High: {millify(record?.Quote?.DayHigh)}&nbsp;&nbsp;</Text>         
          </p>
          <p>
          <Text>Day Low: {record?.Quote?.DayLow}</Text> 
          </p>
         </Card>
         </Col>
     ))
     }
  </Row>
<br></br>
<br></br>
<Title level={4}>Gainers in the US Market:</Title>
<Row gutter= {[24,24]}>
    {topGainers?.map((record, i)=>(
        <Col xs ={24} sm={12} lg={8} key={i}>
        <Card lassName="news-card">
          <Title className="news-title" level={5}>{record?.Security?.Name}</Title> 
          <Title className="news-title" level={5}>Exchange:   {record?.Security?.ExchangeShortName}&nbsp;&nbsp;</Title> 

          <div className="provider-container">
            <Text>Sector: {record?.Security?.Sector}&nbsp;&nbsp;</Text>      
        
          </div>    
          <p>
          <Text>Day High: {millify(record?.Quote?.DayHigh)}&nbsp;&nbsp;</Text>         
          </p>
          <p>
          <Text>Day Low: {record?.Quote?.DayLow}</Text> 
          </p>
         </Card>
         </Col>
     ))
     }
  </Row>
<br></br>
<br></br>
<Title level={4}>Loosers in US Market:</Title>
<Row gutter= {[24,24]}>
    {topLosers?.map((record, i)=>(
        <Col xs ={24} sm={12} lg={8} key={i}>
        <Card lassName="news-card">
          <Title className="news-title" level={5}>{record?.Security?.Name}</Title> 
          <Title className="news-title" level={5}>Exchange:   {record?.Security?.ExchangeShortName}&nbsp;&nbsp;</Title> 

          <div className="provider-container">
            <Text>Sector: {record?.Security?.Sector}&nbsp;&nbsp;</Text>      
        
          </div>    
          <p>
          <Text>Day High: {millify(record?.Quote?.DayHigh)}&nbsp;&nbsp;</Text>         
          </p>
          <p>
          <Text>Day Low: {record?.Quote?.DayLow}</Text> 
          </p>
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