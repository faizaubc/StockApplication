import { useParams } from 'react-router-dom';
import React , {useState}from 'react';
import { useGetStockListQuery} from '../services/stock';
import DailyChart from './DailyChart';
import {Typography, Row, Col , Statistic, Select, Space, Card,Carousel, Collapse ,AutoComplete, Input, Avatar} from 'antd';
const {Title,Text} = Typography;


const LineChartD = () => {
    const {stockid,country}=useParams();
    let stock=stockid;
    if(country=="Canadian")
        stock+=".TRT";
    const [symbol, setSymbol]= useState(stock);
    const [symbolChangesOnSelect, setsymbolChangesOnSelect]= useState(stock);
    const [flag, setFlag]= useState(true);
  
    
    function DrawCards(props) {
        if(!flag)
            return <h1><br></br>Choose a Stock to see the Details!</h1>;
        
        return <DailyChart symbolName={ symbolChangesOnSelect} interval="Daily"/>;
     }
    return (
    <>
        <Title level={3} className="heading">Daily Charts { symbolChangesOnSelect}</Title>

    {DrawCards()}
    </>
  )
}

export default LineChartD
