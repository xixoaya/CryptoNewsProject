import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';

import { useState, useEffect } from 'react'

export default function AppTopBar({ View, OnSignIn, Username }) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ position: 'fixed', top: 0, left: 0, right: 0 }} elevation={3}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Logo"
            //onClick={View === 'home' ? {OnGoHome} : {OnGoLanding}}
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
            <Avatar alt="Cnews Logo" src='https://crypto.marketswiki.com/images/e/e1/Lisk_logo.png' />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Crypto Hot News
          </Typography>
          {View !== 'home' && <Button color="inherit" onClick={OnSignIn}>Login</Button>}
          {View === 'home' && <>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 0.5 }}>
            {Username ? Username : ''}
          </Typography> */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logged"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
            <Avatar alt="Cnews Logo" src='https://www.logoarena.com/userimg/biglogo/1836_1565166571_biglogo.jpg' />
          </IconButton>
          </>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}