import { useParams } from 'react-router-dom';
import React , {useState}from 'react';
import { useGetStockListQuery} from '../services/stock';
import Stock from './Stock';
import {Typography, Row, Col , Statistic, Select, Space, Card,Carousel, Collapse ,AutoComplete, Input, Avatar} from 'antd';
const {Title,Text} = Typography;


const StockD = () => {
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
        let symb="";
        var splitSymbolOnDot= symbolChangesOnSelect.split(".");
        if(splitSymbolOnDot[1]=="TRT")
          symb= splitSymbolOnDot[0] +"." +"TO";
        else
          symb= symbolChangesOnSelect;
        console.log("I Split It", symb);
        return <Stock symbolName={symb} />;
     }
    
     
  return (
     <>
     <Title level={3} className="heading">Stock Details</Title>
    
    


  {DrawCards()}

    
    
    </>
  )
}

export default StockD