import React , {useState}from 'react';
import millify from "millify";
import {Typography, Row, Col , Statistic, Select, Space, Card} from 'antd';
import {Link} from 'react-router-dom';
import {useGetStockDetailsQuery } from '../services/stockApi';
const {Title,Text} = Typography;
const {Option}= Select;


const Stock = () => {
  const [stock, setStock]= useState('VET.TO');
  console.log(stock);
  const {data, isFetching}= useGetStockDetailsQuery(stock);
 
  const StockArray = ['VET.TO', 'CVE.TO'];

  const symbol = data?.symbol;
  const calenderEvents= data?.calendarEvents;
  const defaultStatistics= data?.defaultKeyStatistics;
  console.log(data);
 
 

  if( isFetching) return 'Loading..';
  return (
    <>
        <Title level={3} className="heading">Choose To See Stock Details</Title>
  <Row>
  <Col span={30}>
    <Title  level={4}>Please Choose the Country:</Title>
    <Select defaultValue="VET.TO"
        placeholder="Select A Stock"
        onChange={(value)=> setStock(value)} 
        >
          {StockArray.map((con)=> <Option key={con}>{con}</Option>)}
        </Select>      
   </Col>
  </Row>

  <Title level={4} className="heading">{symbol} Stock Data</Title>
  <Title level={4} className="heading">Calender Events</Title>
    <Row>
      <Col span = {12}><Statistic title="Dividend Date" value = {calenderEvents?.dividendDate?.fmt}/></Col>
      <Col span = {12}><Statistic title="Earnings Date -01" value = {calenderEvents?.earnings?.earningsDate[0]?.fmt}/></Col>
      <Col span = {12}><Statistic title="Earnings Date -02" value = {calenderEvents?.earnings?.earningsDate[1]?.fmt}/></Col>
      <Col span = {12}><Statistic title="Revenue High"value = {millify(calenderEvents?.earnings?.revenueHigh?.raw)}/></Col>
      <Col span = {12}><Statistic title="Revenue Low" value = {millify(calenderEvents?.earnings?.revenueLow?.raw)}/></Col>
      <Col span = {12}><Statistic title="Last Dividend Value" value = {defaultStatistics?.lastDividendValue?.raw}/></Col>

    </Row>

    
    </>
  )
}

export default Stock