// import Results from "./Results";

import { useState, useEffect } from 'react'
import {
    toggleFavVehicle,
    retrieveFavVehicles,
} from '../logic'

function Favs({ onItem, OnBackHome, name, OnStartFlow, OnEndFlow, OnShowModal}) {

    const [favs, setfavs] = useState([]);

    useEffect(() => {

        OnStartFlow()
        try {
            retrieveFavVehicles(sessionStorage.token, (error, favs) => {
                if (error) {
                    OnShowModal(error.message)
                    OnEndFlow()
                } else {
                    // setView('favs')
                    setfavs(favs)
                    OnEndFlow()
                }
            })
        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }

    }, []);

    const ToggleFav = (id) => {
        OnStartFlow()
        try {
            toggleFavVehicle(sessionStorage.token, id, (error => {
                if (error) {
                    OnShowModal(error.message)
                    OnEndFlow()
                    return
                }
                if (favs.length) {
                    setfavs(favs.filter(vehicle => vehicle.id !== id))
                }
                OnEndFlow()
            }))
        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }
    }


    return <div>
        <div className="title layout__title">
            <h1>YOUR FAVS</h1>
        </div>
        <div className="layout__subtitle">
            <p><strong className="name">{name ? name : 'Name'}</strong> here you can see your favorite cars
            </p>
        </div>
        {favs.length ?
        <div className="home__results-list">
            {
                favs.map(item => <div key={item.id} className='home__result' onClick={() => onItem(item.id)}>
                    <h2 className='home__result-title'>{item.name}</h2>
                    <img className='home__result-img' src={item.thumbnail || item.image} ></img>
                    <span className='home__result-price'>{item.price} $</span>
                    <button className='button--small' onClick={event => {
                        event.stopPropagation()

                        ToggleFav(item.id)
                    }}>{item.isFav ? '🧡' : '🤍'}</button>
                </div>)
            }
        </div>

        :
        null}
        <div className="layout__buttons--home-low layout__buttons">
            <button className='button' type='button' onClick={() => OnBackHome()}>BACK HOME</button>
        </div>
    </div>
}
export default Favs