import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {Layout, Typography, Space} from 'antd';
import {Navbar, Exchanges, Homepage, Stock, News, StockDetails, StockChart} from './components';
import './App.css';
import StockSearch from './components/StockSearch';
import StockD from './components/StockD';
import LineChartD from './components/LineChartD';


const App = () => {
  return (
    <div className="app">
        <div className="navbar">
            <Navbar/>
        </div>
        <div className="main" >
          <Layout>
            <div className="routes">
              <Switch>
                <Route exact path="/">
                  <Homepage/>
                </Route>  
                <Route exact path="/stock">
                  <StockSearch/>
                </Route>
                <Route exact path="/indicators">
                  <Exchanges/>
                </Route>
                <Route exact path ="/stock/:stockid">
                  <StockDetails/>
                </Route>
                <Route exact path ="/news">
                  <News/>
                </Route>
                <Route exact path ="/stockchart">
                  <StockChart/>
                </Route>
                <Route exact path ="/stockdetails/:stockid/:country">
                  <StockD/>
                </Route>
                <Route exact path ="/stockdetails/:stockid/:country">
                  <StockD/>
                </Route>
                <Route exact path ="/stocklinechart/:stockid/:country">
                  <LineChartD/>
                </Route>
              </Switch>

            </div>
          </Layout>
         
        <div className="footer"  >
          <Typography.Title level={5} style= {{color: 'white', textAlign: 'center'}}>
            Stocks <br/>
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/indicators">Indicators</Link>
            <Link to="news">News</Link>
          </Space>
        </div>
        </div>
    </div>
  )
}

export default App