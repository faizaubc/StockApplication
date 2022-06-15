import React , {useState}from 'react';
import { useGetStockListQuery} from '../services/stock';
import Stock from './Stock';
import {Typography, Row, Col , Statistic, Select, Space, Card,Carousel, Collapse ,AutoComplete, Input, Avatar} from 'antd';
const {Title,Text} = Typography;

const StockSearch = () => {
    const [symbol, setSymbol]= useState('VET');
    const {data,isStockList}= useGetStockListQuery(symbol);
    const [options, setOptions] = useState([]);
    const stockOptionsData= data?.bestMatches;
    const [symbolChangesOnSelect, setsymbolChangesOnSelect]= useState('');
    const [flag, setFlag]= useState(false);


    
    function DrawCards(props) {
      if(!flag)
          return <h1>Welcome back!</h1>;
      let symb="";
      var splitSymbolOnDot= symbolChangesOnSelect.split(".");
      if(splitSymbolOnDot[1]=="TRT")
        symb= splitSymbolOnDot[0] +"." +"TO";
      else
        symb= symbolChangesOnSelect;
      console.log("I Split It", symb);
      return <Stock symbolName={symb} />;
   }
     //Search Result for the drop down of the Stock Search Query
     const searchResult = (query) =>
     stockOptionsData?.map((record, idx) => {
       
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
 
    
  //Handle search for the stock drop down query
  const handleSearch = (value) => {
    setSymbol(value);
    console.log('Inside handle search');
    setOptions(value ? searchResult(value) : []);
  };
  //When the Stock is being chosen this function will run setting the flag 
  //parameter to true
  //It renders again if the parameter is true it will output a new graph
  const onSelect = (value) => {
    console.log(value);
    setsymbolChangesOnSelect(value);
    setFlag(true);
    
  };

  const handleOnChange = (value) => {
    
    setFlag(false);
    
  };

    console.log(data);
  return (
    <>
     <Title level={3} className="heading">Stock Details</Title>
     <Title level={4}>Type your Stock Input Here:</Title>
     <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{
        width: 300,
        }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
        onChange={handleOnChange}

    >
    <Input.Search size="large" placeholder="Start Typing Stock..." enterButton />
  </AutoComplete>


  {DrawCards()}

    
    
    </>
  )
}

export default StockSearch