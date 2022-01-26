import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';

export default function ButtonsAppLogOut({onSignIn, onSignUp}) {
    const [value, setValue] = React.useState(0);
    const ref = React.useRef(null);
  
    React.useEffect(() => {
      ref.current.ownerDocument.body.scrollTop = 0;
    }, [value]);
  
    return (
      <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(view, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Login In" icon={<ExitToAppIcon />} onClick={() => onSignIn()}/>
            <BottomNavigationAction label="Register" icon={<HowToRegIcon />} onClick={() => onSignUp()}/>
            
          </BottomNavigation>
        </Paper>
      </Box>
    );
  }