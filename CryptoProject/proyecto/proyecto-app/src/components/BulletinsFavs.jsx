import { useState, useEffect } from 'react'
import {
    toggleFavBulletin,
    toggleQueueBulletin,
    retrieveFavBulletins
} from '../logic'

import BulletinLeadPanel from './BulletinLeadPanel'


function BulletinsFavs({ onItem, OnBackProfile, OnStartFlow, OnEndFlow, OnShowModal }) {

    const [bulletins, setbulletins] = useState([]);

    useEffect(async () => {

        try {
            OnStartFlow()

            const bulletins = await retrieveFavBulletins(sessionStorage.token)

            setbulletins(bulletins)

            OnEndFlow()

        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }

    }, [])

    const ToggleFav = async (id) => {
        try {
            OnStartFlow()

            await toggleFavBulletin(sessionStorage.token, id)

            if (bulletins.length) {
                
                setbulletins(bulletins.filter(bulletin => bulletin.id !== id))
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
        <button type='button' className='button' onClick={OnBackProfile}>Back Profile</button>
    </>
}

export default BulletinsFavs
