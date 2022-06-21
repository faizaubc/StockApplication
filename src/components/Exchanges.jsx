import React, {useState}from 'react';
import { Collapse, Typography ,Avatar ,Image} from 'antd';
import Bollinger from '../images/boll.jpeg';
import ma from '../images/ma.jpeg';
import macd from '../images/macd.jpeg';
import rsi from '../images/rsi.jpeg';
import stoc from '../images/stoc.jpeg';
import volume from '../images/volume.jpg';

const { Panel } = Collapse;
const { Title } = Typography;




const Exchanges = () => {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const onChange = (key) => {
  console.log(key);
};
  return (
   <>     
     <Title>Indicators</Title>
     <Title level={3}>Indicator Categories </Title>
   <Collapse  onChange={onChange}>
      <Panel header="Trend" key="1">
        <p>The particular indicators indicate the trend of the market 
          or the direction in which the market is moving. 
          Typically, the trend indicators are oscillators, 
          they tend to move between high and low values. Like MA, EMA</p>
      </Panel>
      <Panel header="Momentum" key="2">
        <p>Momentum indicators indicate the strength of the trend 
          and also signal whether there is any likelihood of reversal.
           Relative Strength Index (RSI) is one momentum indicator, 
           it is used for indicating the price top and bottom. Like RSI, Stochastic Oscillator</p>
      </Panel>
      <Panel header="Volume" key="3">
        <p>Volume indicators how the volume changes with time,
           it also indicates the number of stocks that are being
            bought and sold over time. When the price changes,
             volume indicates how strong the move is. On-Balance
              Volume is one of the volume indicators.</p>
      </Panel>
      <Panel header="Volatility" key="4">
        <p>Volatility is one of the most important indicators,
           it indicates how much the price is changing in 
           the given period. Volatility gives an indication 
           of how the price is changing. High volatility 
           indicates big price moves, lower volatility indicates 
           high big moves.</p>
      </Panel>
    </Collapse>
   <br></br>
   <br></br>

     <Title level={3}>Intra Day Indicators </Title>
   <Collapse  onChange={onChange}>
      <Panel header="Moving Averages" key="1">
        <p> It provides information about the momentum of the market,
           trends in the market, the reversal of trends, 
           and the stop loss and stop-loss points. Moving average allows
            the traders to find out the trading opportunities 
            in the direction of the current market trend.</p>
            <Image width={800}    src={ma} />
      </Panel>
      <Panel header="Bollinger Bands" key="2">
        <p>Bollinger bands indicate the volatility in the market.
           Bollinger bands are of 3 types: a middle bang which is a
            20-day simple moving average, a +2 standard deviation
             upper bang and a -2 lower deviation lower band. The 
             price of a stock moves between the upper and the lower 
             band. When the market is moving and the volatility is
              greater, the band widen and when the volatility is less 
              the gap decreases. Bollinger bands help traders to 
              understand the price range of a particular stock.</p>
              <Image width={800}    src={Bollinger} />
      </Panel>
      <Panel header="Relative Strength Index (RSI)" key="3">
        <p>Relative Strength Index (RSI) is a momentum indicator. 
          It is a single line ranging from 0 to 100 which indicates
           when the stock is overbought or oversold in the market.
            If the reading is above 70, it indicates an overbought
             market and if the reading is below 30, it is an oversold
              market. RSI is also used to estimate the trend of the
               market, if RSI is above 50, the market is an uptrend
                and if the RSI is below 50, the market is a downtrend.</p>

                <Image width={800}    src={rsi} />
      </Panel>
      <Panel header="Stochastic Oscillator" key="4">
        <p>The stochastic oscillator is one of the momentum indicators. 
          The oscillator compares the closing price of a stock to
           a range of prices over a period of time. The momentum 
           of the stock b=changes before the price, hence, momentum 
           is a useful indicator.</p>
           <Image width={800}    src={stoc} />
      </Panel>
    </Collapse>
    <br></br>
   <br></br>
    <Title level={3}>Swing Trading Indicators </Title>
   <Collapse  onChange={onChange}>
      <Panel header="Relative Strength Index (RSI)" key="1">
        <p> The RSI indicator is displayed as an oscillator, i.e., a line
           graph that moves between two extremes and can range between
            0 and 100. The RSI line ascends when the number and size 
            of bullish closes go up, and it declines when the magnitude
             of losses increases.

        The most straightforward RSI signal occurs when the indicator
         breaks above the 70 levels; it suggests an overbought level 
         and might anticipate an uptrend’s reversal. If the RSI enters
          the zone below the 30 marks, then it indicates an oversold
           market, meaning the bearish trend could end soon.</p>

           <Image width={800}    src={rsi} />
      </Panel>
      <Panel header="Moving Average" key="2">
        <p> As the name suggests, swing traders use MA to calculate the average of an asset’s price movement over a given period. As a result, MAs smooth out the short-term volatility that may appear confusing for traders.
        It’s important to understand that MAs are lagging indicators and rely on past price action. Thus, it would help if you used them to confirm a trend rather than predict future moves.
        The best way to use MAs is to look when a short-term MA crosses a longer-term MA. If the former crosses the more extended MA from bottom to top, this is a bullish signal, and vice versa.
        </p>

        <Image width={800}    src={ma} />
      </Panel>
      <Panel header="MACD" key="3">
        <p>Moving Average Convergence Divergence (MACD) is a more complex technical indicator that merges two regular moving averages that we discussed above. The calculation of MACD is by subtracting the 26-period EMA from the 12-period EMA, though these parameters can be adjusted manually based on your needs. To be clear, the two lines displayed on the MACD chart do not represent the two MAs used for the calculations. Instead, here are the three elements of the MACD indicator:
        </p>
        <p>
The MACD line, which calculates the distance between two MAs;
The signal line, which can spot changes in price momentum and is regarded as a trigger for bullish and bearish signals;
The histogram, which represents the difference between the MACD line and the signal line.
Swing traders would usually buy when the MACD line crosses above its signal line and go short when the MACD crosses below the signal line.
</p>
<p>
Another way to use the MACD is to look for divergence between the histogram and the price action, which usually anticipates a trend reversal.</p>

<Image width={800}    src={macd} />
      </Panel>
      <Panel header="Volume" key="4">
        <p>Volume is one of the most critical indicators for swing traders, though beginners often ignore it. This indicator can be shown by default below the main chart, and it offers insight into how robust is a newly formed trend. Basically, the volume indicator shows how many traders are buying or selling a cryptocurrency or asset at a given point. Thus, the higher is the volume, the stronger the trend.

Volume is especially useful with breakout strategies, i.e. when an asset’s price breaks above a resistance line or below a support line. If the breakout is accompanied by high volume, then the new trend is expected to be substantial.</p>
<Image width={800}    src={volume} />
      </Panel>
      <Panel header="Bollinger Band" key="5">
        <p>The Bollinger Band (BB) is a momentum indicator that consists of three lines – a moving average and two standard deviations, a positive and a negative one. Swing traders prefer this indicator because it quickly detects a trend, the overbought and oversold levels, and the volatility. Also, it looks nice and clear on the chart.

The width of the BB increases along with the volatility and declines when the market calms down. The closer the bands are to each other, the lower the volatility.

While Bollinger Bands work well in trending markets, they do a great job when the price ranges, i.e., moving up and down inside a horizontal channel. In this case, when the price touches the BB’s upper line, swing traders may go short. When the price touches the lower line of the indicator, this may precede a rebound. 

The point is that the price would always tend to move towards the center of the BB. If the band starts expanding, it means that a new trend is forming, and you shouldn’t be trading in a range anymore. </p>
    <Image width={800}    src={Bollinger} />
      </Panel>

     
      <Panel header="Stochastic" key="6">
        <p>Stochastic is another momentum indicator, and it works quite similarly to the RSI, though it has different calculations. The indicator compares the closing price of an asset to the range of its prices over a certain period.

Like the RSI, the Stochastic is represented by a chart between zero and 100. Though in this case, the overbought and oversold zones are above the 80 lines and below the 20 lines, respectively. 

Another different aspect is that it consists of two lines rather than just one as in the RSI. One line shows the current value of Stochastic, and the other one is a three-day MA.

Traders would use Stochastic to determine the overbought and oversold levels. They will also look for the two lines to cross, which generally anticipates a trend reversal. </p>

<Image width={800}    src={stoc} />
      </Panel>
    </Collapse>
   
   
   
   </>
  )
}

export default Exchanges