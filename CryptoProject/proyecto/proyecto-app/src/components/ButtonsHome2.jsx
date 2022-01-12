import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
//import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

export default function ButtonsHome({OnViewProfile, OnViewHome, OnViewSearch, view}) {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<HomeIcon />} onClick={() => OnViewHome()}/>
        <BottomNavigationAction label="Favorites" icon={<RestoreIcon />} onClick={() => OnViewSearch()} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} onClick={() => OnViewProfile()}/>
      </BottomNavigation>
    </Box>
  );
}


// function ButtonsHome({OnViewProfile, OnViewHome, OnViewSearch, view}) {

//     return <>
//         <div className="layout__buttons--home-low ">
        
      
//       <HomeIcon sx={{ fontSize: 40 }} color={ view === 'home' ? "primary"  : "action"  } onClick={() => OnViewHome()} />
//       {/* <HomeIcon color="primary" />
//       {/* <HomeIcon color="secondary" />
//       <HomeIcon color="success" />
//       <HomeIcon color="action" />
//       <HomeIcon color="disabled" /> */}
//       {/* <HomeIcon sx={{ color: pink[500] }} /> */} 
    
//         <button className={ view === 'home' ? 'button--small__dark' : 'button--small'} type='button' onClick={() => OnViewHome()}>{'🧡'}</button>
//         <button className={ view === 'search' ? 'button--small__dark' : 'button--small'} type='button' onClick={() => OnViewSearch()}>{'🛒'}</button>
//         <button className={ view === 'profile' ? 'button--small__dark' : 'button--small'} type='button' onClick={() => OnViewProfile()}>{'😃'}</button>
//         {/* <button className='button' onClick={() => props.OnSignOut()}>SIGN OUT</button> */}
//         </div>
//     </>
// }

