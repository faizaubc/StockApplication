import React, {useState, useEffect} from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import {Link} from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined , LineChartOutlined} from '@ant-design/icons';
import icon from '../images/NASDAQLOGO.png'

const Navbar = () => {
    const[activeMenu, setActiveMenu]=useState(true);
    const[screenSize , setScreenSize]=useState(null);

    useEffect(()=>{
        //create a function called handleResize 
        const handleResize= ()=> setScreenSize(window.innerWidth);

        //add the event listener
        //when window is resized then handle the resize 
        window.addEventListener('resize', handleResize);

        //call the function
        handleResize();

        //unmount from the event listener
        return ()=> window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(()=>{
        if(screenSize< 768){
            setActiveMenu(false);
        }
        else{
            setActiveMenu(true);
        }

    }, [screenSize])
  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={icon} size="large"/>
            <Typography.Title level={3} className="logo">
                <Link to="/">StockApplication</Link>
            </Typography.Title>
            <Button className='menu-control-container' onClick={()=> setActiveMenu(!activeMenu)}>
               <MenuOutlined />
           </Button>
        </div>
        {activeMenu &&(
        <Menu theme="dark">
            <Menu.Item icon={<HomeOutlined/>}>
                <Link to="/">Home</Link>
            </Menu.Item> 
            <Menu.Item icon={<FundOutlined/>}>
                <Link to="/stock">Stock</Link>
            </Menu.Item> 
            <Menu.Item icon={<MoneyCollectOutlined/>}>
                <Link to="/indicators">Indicators</Link>
            </Menu.Item> 
            <Menu.Item icon={<LineChartOutlined/>}>
                <Link to="/stockchart">Chart</Link>
            </Menu.Item> 
            <Menu.Item icon={<BulbOutlined/>}>
                <Link to="/news">News</Link>
            </Menu.Item> 
        </Menu>
         )}
    </div>
  )
}

export default Navbar