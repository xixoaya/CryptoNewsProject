//import React from "react"
import * as React from 'react';
import Box from '@mui/material/Box';
import { pink } from '@mui/material/colors';
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }


function ButtonsHome({OnViewProfile, OnViewHome, OnViewSearch, view}) {

    return <>
        <div className="layout__buttons--home-low ">
        
      
      <HomeIcon sx={{ fontSize: 40 }} color={ view === 'home' ? "primary"  : "action"  } onClick={() => OnViewHome()} />
      {/* <HomeIcon color="primary" />
      {/* <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" /> */}
      {/* <HomeIcon sx={{ color: pink[500] }} /> */} 
    
        <button className={ view === 'home' ? 'button--small__dark' : 'button--small'} type='button' onClick={() => OnViewHome()}>{'🧡'}</button>
        <button className={ view === 'search' ? 'button--small__dark' : 'button--small'} type='button' onClick={() => OnViewSearch()}>{'🛒'}</button>
        <button className={ view === 'profile' ? 'button--small__dark' : 'button--small'} type='button' onClick={() => OnViewProfile()}>{'😃'}</button>
        {/* <button className='button' onClick={() => props.OnSignOut()}>SIGN OUT</button> */}
        </div>
    </>
}

export default ButtonsHome