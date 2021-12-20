import { useState, useEffect } from 'react'
import {
    // searchVehicles,
    // toggleFavVehicle,
    retrieveLatestBulletinsLogued,
    toggleFavBulletin,
    toggleQueueBulletin
} from '../logic'
import './BulletinLeadPanel.css'


function BulletinLeadPanel({ onItem, item, ToggleFav, ToggleQueue }) {

    //const [vehicles, setvehicles] = useState([]);
    const [bulletins, setbulletins] = useState([]);


    return <>

        <div key={item.id} className='home__result' onClick={() => onItem(item.id, item.isQueue)}>
            <img className='home__result-img' src={
                item.source === 'observatorioblockchain' ? 'src/sergio.png' :
                    item.source === 'cointelegraph' ? 'src/mannu.png' :
                        item.source === 'cripto247' ? 'src/lucatiel.png' : 'src/default'
            } ></img>
            <div>
                <h2 className='home__result-title'>{item.title}</h2>
                <h3 className='home__result-subTitle'>{item.subTitle ? item.subTitle.slice(0, 60) : ''} ...</h3>
                <span className='home__result-subTitle'>{item.source} ...</span>
            </div>
            <div>
                <button className='button--small' onClick={event => {
                    event.stopPropagation()
                    ToggleFav(item.id)
                }}>{item.isFav ? '🧡' : '🤍'}</button>
                <button className='button--small' onClick={event => {
                    event.stopPropagation()
                    ToggleQueue(item.id)
                }}>{item.isQueue ? '👌' : '✊'}</button>
            </div>
        </div>

    </>
}

export default BulletinLeadPanel
