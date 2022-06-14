import React , {useState}from 'react';
import millify from "millify";
import {Typography, Row, Col , Statistic, Select, Space, Card,Carousel, Collapse ,AutoComplete, Input, Avatar} from 'antd';
import {Link} from 'react-router-dom';
import {useGetNewsDetailsQuery} from '../services/stockApi';
import { useGetStockListQuery } from '../services/stock';
import { useGetStockNewsQuery } from '../services/news';
import moment from 'moment';

const {Title,Text} = Typography;
const {Option}= Select;
const { Panel } = Collapse;

const News = () => {
  const [symbol, setSymbol]= useState('VET');
  const [searchVal, setSearchVal]= useState('Oil And Gas');
 const count = 12;
  const {data,isStockList}= useGetStockListQuery(symbol);
  const{data: stockNews}= useGetStockNewsQuery({ searchVal, count:  20});


  const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

 const stockOptionsData= data?.bestMatches;

 console.log(stockNews);
 console.log(searchVal);


 
  const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
  const optionsSearch = [
    {
      value: 'Oil And Gas',
    },
    {
      value: 'Oil and Gas USA',
    },
    {
      value: 'NASDAQ',
    },
  ];

 





  const handleSearchNews = (value) => {
    setSearchVal(value);
    console.log('Inside handle search')
  };

 
 
  const onSelectNews = (value) => {
    console.log('onSelect', value);
    setSearchVal(value);



  };
  if( isStockList || !stockNews?.value) return 'Loading..';
  
  //if( isFetching) return 'Loading..';
  return (
    <>
    
<h2>Stocks News </h2>
<h3>Input the News Here:</h3>

  <AutoComplete
    style={{
      width: 200,
    }}
    options={optionsSearch}
    onSelect={onSelectNews}
    //onSearch={handleSearchNews}
    placeholder="Enter Search News Here"
    filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  />
  <br></br>
  <br></br>
  <Row gutter= {[24,24]}>
{
      stockNews.value.map((news, i)=>(
        <Col xs ={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href= {news.url} target= "_blank" rel="noreferrer">
              <div className="news-image-container">
                    <Title className="news-title" level={4}>{news.name}</Title>
                    <img style={{maxWidth:'200px', maxHeight: '100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
              </div>
              <p>
                {   news.description > 100 ? `${news.description.sbstring(0,100)}...` 
                    : news.description
                }
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt=""/>
                  &nbsp;{news.provider[0]?.name}
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>


              </div>
            </a>

          </Card>
        </Col>
      ))
    } 
</Row>
    </>
  )

}

export default News
