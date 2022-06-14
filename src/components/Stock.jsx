import React , {useState}from 'react';
import millify from "millify";
import {Typography, Row, Col , Statistic, Select, Space, Card,Carousel, Collapse } from 'antd';
import {Link} from 'react-router-dom';
import {useGetStockDetailsQuery } from '../services/stockApi';
const {Title,Text} = Typography;
const {Option}= Select;
const { Panel } = Collapse;

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  width: '50px'
};

const Stock = ({symbolName}) => {
  const [stock, setStock]= useState('VET.TO');
  console.log(stock);
  const {data, isFetching}= useGetStockDetailsQuery(symbolName);
 
  //const StockArray = ['VET.TO', 'CVE.TO', 'OBE.TO','BTE.TO', 'MEG.TO', 'ARX.TO', 'ENB.TO'];

  const symbol = data?.symbol;
  const calenderEvents= data?.calendarEvents;
  const defaultStatistics= data?.defaultKeyStatistics;
  const financialData= data?.financialData;
  const price = data?.price;
  const earnings = data?.earnings?.financialsChart?.yearly;
  const quarterly = data?.earnings?.financialsChart?.quarterly;
  const summaryDetail = data?.summaryDetail;  
  const summaryProfile = data?.summaryProfile;



  console.log(data);
 
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  if( isFetching) return 'Loading..';
  return (
    <>
       
 <br></br>
 <br></br>
<h2>{data?.quoteType?.longName}  {symbol}</h2>
<h3>{summaryProfile?.industry}</h3>
    <Row>
      
      <Col><p>{summaryProfile?.longBusinessSummary}</p></Col>

      <Col span = {12}><Statistic title="Dividend Date" value = {calenderEvents?.dividendDate?.fmt}/></Col>
      <Col span = {12}><Statistic title="Earnings Date -01" value = {calenderEvents?.earnings?.earningsDate[0]?.fmt}/></Col>
      <Col span = {12}><Statistic title="Earnings Date -02" value = {calenderEvents?.earnings?.earningsDate[1]?.fmt}/></Col>
      <Col span = {12}><Statistic title="Revenue High"value = {millify(calenderEvents?.earnings?.revenueHigh?.raw)}/></Col>
      <Col span = {12}><Statistic title="Revenue Low" value = {millify(calenderEvents?.earnings?.revenueLow?.raw)}/></Col>
      <Col span = {12}><Statistic title="Last Dividend Value" value = {defaultStatistics?.lastDividendValue?.raw}/></Col>
      <Col span = {12}><Statistic title="Current Price" value = {financialData?.currentPrice?.fmt}/></Col>
      <Col span = {12}><Statistic title="Target High Price" value = {financialData?.targetHighPrice?.fmt}/></Col>
      <Col span = {12}><Statistic title="Average Daily Volume 3Month" value = {price?.averageDailyVolume3Month?.fmt}/></Col>
      <Col span = {12}><Statistic title="Average Daily Volume 10Day" value = {price?.averageDailyVolume10Day?.fmt}/></Col>
      <Col span = {12}><Statistic title="Day High" value = {summaryDetail?.dayHigh?.fmt}/></Col>
      <Col span = {12}><Statistic title="Day Low" value = {summaryDetail?.dayLow?.fmt}/></Col>
      <Col span = {12}><Statistic title="Fifty Day Average" value = {summaryDetail?.fiftyDayAverage?.fmt}/></Col>
      <Col span = {12}><Statistic title="Fifty Two Week High" value = {summaryDetail?.fiftyTwoWeekHigh?.fmt}/></Col>
      <Col span = {12}><Statistic title="Fifty Two Week Low" value = {summaryDetail?.fiftyTwoWeekLow?.fmt}/></Col>
      <Col span = {12}><Statistic title="Market Cap" value = {summaryDetail?.marketCap?.fmt}/></Col>
      <Col span = {12}><Statistic title="PreviousClose" value = {summaryDetail?.previousClose?.fmt}/></Col>

      <br></br>
      <br></br>
      </Row>
      <Row>
      <br></br>
      <br></br>
      <Collapse defaultActiveKey={['0']} onChange={onChange}>
              {earnings.map((record, i)=>(
              <Panel  header={record?.date} key={i}>
              <p>
              Earnings: {record?.earnings?.fmt} ,   
              Revenue: {record?.revenue?.fmt}
              </p>
              </Panel>
              ))
            
              }
      </Collapse> 

    <Collapse defaultActiveKey={['0']} onChange={onChange}>
              {quarterly.map((record, i)=>(
              <Panel  header={record?.date} key={i}>
              <p>
              Earnings: {record?.earnings?.fmt} ,   
              Revenue: {record?.revenue?.fmt}
              </p>
              </Panel>
              ))
   
      }
    </Collapse> 




    

    </Row>
<br></br>
   
    </>
  )
}

export default Stock