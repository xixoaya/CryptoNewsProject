import { useState, useEffect } from 'react'
import {
    // searchVehicles,
    // toggleFavVehicle,
    retrieveLatestBulletinsLogued,
    toggleFavBulletin,
    toggleQueueBulletin,
    retrieveFavBulletins,
    searchBulletins
} from '../logic'

import BulletinLeadPanel from './BulletinLeadPanel'


function BulletinsSearched({ onItem, cleanquery, OnStartFlow, OnEndFlow, OnShowModal, query }) {

    //const [vehicles, setvehicles] = useState([]);
    const [bulletins, setbulletins] = useState([]);

    useEffect(async () => {

        try {
            OnStartFlow()

            const bulletins = await searchBulletins(sessionStorage.token, query)

            setbulletins(bulletins)

            OnEndFlow()


        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }

    }, [query])

    const ToggleFav = async (id) => {
        try {
            OnStartFlow()

            await toggleFavBulletin(sessionStorage.token, id)

            if (bulletins.length) {
                
                setbulletins(bulletins.map(bulletin => {
                    if (bulletin.id === id) {
                        return { ...bulletin, isFav: !bulletin.isFav }
                    }
                    return bulletin
                }))
            }
            OnEndFlow()

        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }
    }

    const ToggleQueue = async (id) => {
        try {
            OnStartFlow()

            await toggleQueueBulletin(sessionStorage.token, id)

            if (bulletins.length) {
                setbulletins(bulletins.map(bulletin => {
                    if (bulletin.id === id) {
                        return { ...bulletin, isQueue: !bulletin.isQueue }
                    }
                    return bulletin
                }))
            }
            OnEndFlow()

        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }
    }

    return <>
        {bulletins.length ?
            <div className="home__results-list">
                {
                 bulletins.map( item => < BulletinLeadPanel 
                    item = { item } onItem = {onItem} OnStartFlow = {OnStartFlow} 
                    OnEndFlow = {OnEndFlow} OnShowModal = {OnShowModal}
                    ToggleFav = {ToggleFav} ToggleQueue = {ToggleQueue}
                    
                    
                    />)
                    
                }
            </div>

            :
            null
        }
        <button type='button' className='button' onClick={cleanquery}>Clean Search</button>
    </>
}

export default BulletinsSearched
