import React , {useState}from 'react';
import millify from "millify";
import {Typography, Row, Col , Statistic, Select, Space, Card} from 'antd';
import {Link} from 'react-router-dom';
import { useGetMoversQuery } from '../services/stockApi';

const {Title} = Typography;
const {Option}= Select;



const Homepage = () => {
  const [country, setCountry]= useState('CA');
  const [count, setCount]= useState('5');
  let flag = true;
  console.log(country);
  console.log(count);

  const {data, isFetching}=  useGetMoversQuery({country,count});


  const globalStats= data?.finance?.result;
  const Country = ['CA', 'US'];
  const Count = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'
  , '18', '19', '20', '21', '22', '23', '24','25'];


  console.log(data);

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
   &nbsp; &nbsp; &nbsp;
   <Col span={30}>
    <Title  level={4}>Please Choose the Records:</Title>

      <Select 
        placeholder="Select Records"
        onChange={(value)=> setCount(value)} 
        >
          {Count.map((con)=> <Option key={con}>{con}</Option>)}
        </Select>  
        </Col>
    </Row>
     <br></br>
     <Title level={4}>{globalStats[0].title}</Title>
     <Title level={5}>{globalStats[0].description}</Title>

     {globalStats[0].quotes.map((record, i)=>(
        <Col xs ={24} sm={12} lg={8} key={i}>
        <Card >
          <Title className="news-title" level={5}>{record.exchange}:&nbsp;&nbsp;{record.symbol}</Title> 
         </Card>
         </Col>
     ))
     }

  <br></br>
     <Title level={4}>{globalStats[1].title}</Title>
     <Title level={5}>{globalStats[1].description}</Title>

     {globalStats[1].quotes.map((record, i)=>(
        <Col xs ={24} sm={12} lg={8} key={i}>
        <Card >
          <Title className="news-title" level={5}>{record.exchange}:&nbsp;&nbsp;{record.symbol}</Title> 
         </Card>
         </Col>
     ))
     }

    <br></br>
     <Title level={4}>{globalStats[2].title}</Title>
     <Title level={5}>{globalStats[2].description}</Title>

     {globalStats[2].quotes.map((record, i)=>(
        <Col xs ={24} sm={12} lg={8} key={i}>
        <Card >
          <Title className="news-title" level={5}>{record.exchange}:&nbsp;&nbsp;{record.symbol}</Title> 
         </Card>
         </Col>
     ))
     }
    </>
  )
}

export default Homepage