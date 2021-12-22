import { useState, useEffect } from 'react'
import {
    // searchVehicles,
    // toggleFavVehicle,
    retrieveLatestBulletinsLogued,
    toggleFavBulletin,
    toggleQueueBulletin
} from '../logic'
import './BulletinLeadPanel.css'
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QueueIcon from '@mui/icons-material/Queue';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function BulletinLeadPanel({ onItem, item, ToggleFav, ToggleQueue }) {

    //const [vehicles, setvehicles] = useState([]);
    const [bulletins, setbulletins] = useState([]);


    return <>

        <div key={item.id} className='lead__result' onClick={() => onItem(item.id, item.isQueue)}>

            <div className="lead__image-butons">
                <img className='lead__result-img' src={
                    item.source === 'observatorioblockchain' ? 'https://pbs.twimg.com/profile_images/890188758397702144/nYTz3qHV_400x400.jpg' :
                        item.source === 'cointelegraph' ? 'https://www.smartdigt.es/wp-content/uploads/2020/10/Coin-Telegraph.jpg' :
                            item.source === 'cripto247' ? 'https://www.cripto247.com/resources/logos/og-image-1200x630.png' : 'https://crypto.marketswiki.com/images/e/e1/Lisk_logo.png'
                } ></img>
                <div className="lead__main-content">
                    <h2 className='lead__result-title'>{item.title === item.title.slice(0, 100) ? item.title : item.title.slice(0, 100) + '...'}</h2>
                    <h3 className='lead__result-subTitle'>{item.subTitle ? item.subTitle.slice(0, 60) : ''} ...</h3>
                    {/* <span className='lead__result-subTitle'>{item.source} ...</span> */}

                </div>
            </div>
            <div className="lead__butons">
                <button className='button--small__lead' onClick={event => {
                    event.stopPropagation()
                    ToggleFav(item.id)
                }}>{item.isFav ? <FavoriteIcon color="primary" sx={{ fontSize: 27 }} /> : <FavoriteIcon color="action" sx={{ fontSize: 27 }} />}</button>

                <button className='button--small__lead' onClick={event => {
                    event.stopPropagation()
                    ToggleQueue(item.id)
                }}>{item.isQueue ? <QueueIcon color="primary" sx={{ fontSize: 27 }} /> : <QueueIcon color="action" sx={{ fontSize: 27 }} />}</button>

                <button className='button--small__lead' >{<AddCircleIcon color="primary" sx={{ fontSize: 27 }} />}</button>
            </div>

        </div>

    </>
}

export default BulletinLeadPanel
