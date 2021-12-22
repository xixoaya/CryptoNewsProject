import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import HistoryIcon from '@mui/icons-material/History';
import QueueIcon from '@mui/icons-material/Queue';
import FavoriteIcon from '@mui/icons-material/Favorite';

function ProfileButtons({name, favorites, queue, history, password, account, OnSignOut, view}) {
    
    return <>
    <div className="layout__subtitle">
        <p><strong className="name">{name ? name : 'Name'}</strong> {`What do you whant to do with your ${view}?`}
        </p>
    </div>
    <div className="layout__buttons--home-hi layout__buttons ">
        <div className='profile__panel' onClick={favorites}>
            <div className='profile__panel-icon'>
                < FavoriteIcon sx={{ fontSize: 40 }} color="primary" />
            </div>
            <div className="panel__main-content">
                <h2 className='profile__result-title'>View Your Favorite news</h2>
                <h3 className='profile__result-subTitle'>See all the news you have give your love</h3>
            </div>
        </div>
        <div className='profile__panel' onClick={queue}>
            <div className='profile__panel-icon' >
                < QueueIcon sx={{ fontSize: 40 }} color="primary" />
            </div>
            <div className="panel__main-content">
                <h2 className='profile__result-title'>View Your News in Queue</h2>
                <h3 className='profile__result-subTitle'>Check all the news you saved to read later</h3>
            </div>
        </div>
        <div className='profile__panel' onClick={history}>
            <div className='profile__panel-icon'>
                < HistoryIcon sx={{ fontSize: 40 }} color="primary" />
            </div>
            <div className="panel__main-content">
                <h2 className='profile__result-title'>View Your last news readed</h2>
                <h3 className='profile__result-subTitle'>Review all the news you have readen</h3>
            </div>
        </div>
    </div>
    <div className="layout__buttons--home-hi layout__buttons ">
        <ButtonGroup size="small" variant="contained" aria-label="outlined primary button group">
            <Button onClick={password}>Change Password</Button>
            <Button onClick={account}>Delete Account</Button>
            <Button onClick={OnSignOut}>Sign Out</Button>
        </ButtonGroup>
    </div>
</>
}

export default ProfileButtons
