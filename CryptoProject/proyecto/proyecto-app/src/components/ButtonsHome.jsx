import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';

export default function ButtonsHome({OnViewProfile, OnViewHome, OnViewSearch, view}) {
    const [value, setValue] = React.useState(0);
    const ref = React.useRef(null);
    //const [messages, setMessages] = React.useState(() => refreshMessages());
  
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
            <BottomNavigationAction label="Latest News" icon={<RestoreIcon />} onClick={() => OnViewHome()}/>
            <BottomNavigationAction label="Search News" icon={<LocationSearchingIcon />} onClick={() => OnViewSearch()}/>
            <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} onClick={() => OnViewProfile()}/>
          </BottomNavigation>
        </Paper>
      </Box>
    );
  }