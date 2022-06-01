import React from 'react';
import millify from "millify";
import {Typography, Row, Col , Statistic} from 'antd';
import {Link} from 'react-router-dom';
import { useGetMoversQuery } from '../services/stockApi';

const {Title} = Typography;


const Homepage = () => {
  const {data, isFetching}=  useGetMoversQuery();
  //const globalStats= data?.finance?.result;

  console.log(data);

  return (
    <>
        <Title level={2} className="heading">Global Stock Gainers</Title>
        <Row>
      <Col span = {12}><Statistic title="Total Cryptocurencies" value = '5'/></Col>
      <Col span = {12}><Statistic title="Total Exchanges" value = '5'/></Col>
      <Col span = {12}><Statistic title="Total Market Cap" value = '5'/></Col>
      <Col span = {12}><Statistic title="Total 24 h Volume"value = '5'/></Col>
      <Col span = {12}><Statistic title="Total Markers" value ='5'/></Col>

    </Row>
    </>
  )
}

export default Homepage