import React , {useState}from 'react';
import millify from "millify";
import {Typography, Row, Col , Statistic, Select, Space, Card} from 'antd';
import {Link} from 'react-router-dom';
import { useGetMoversQuery } from '../services/stockApi';
const {Title,Text} = Typography;
const {Option}= Select;



const Homepage = () => {
  const [country, setCountry]= useState('CA');
  //const [count, setCount]= useState('5');
  let flag = true;
  console.log(country);
 // console.log(count);

  const {data, isFetching}=  useGetMoversQuery(country);


  const globalStats= data?.finance?.result[0].quotes;
  const Country = ['CA', 'US'];
  //const Count = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'
  //, '18', '19', '20', '21', '22', '23', '24','25'];


  console.log(data);
  console.log(data?.finance);
  console.log(data?.finance?.result[0]?.quotes);
  console.log(globalStats);

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
  
    </>
  )
}

export default Homepage