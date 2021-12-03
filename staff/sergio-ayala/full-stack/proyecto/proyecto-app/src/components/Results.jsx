import { useState, useEffect } from 'react'
import {
    searchVehicles,
    toggleFavVehicle,
} from '../logic'


function Results({ onItem, query, OnBackHome, OnStartFlow, OnEndFlow, OnShowModal }) {

    const [vehicles, setvehicles] = useState([]);

    useEffect(() => {

        OnStartFlow()

        try {
            searchVehicles(sessionStorage.token, query, (error, vehicles) => {
                if (error) {
                    OnShowModal(error.message)
                    OnEndFlow()

                } else {
                    setvehicles(vehicles)
                    OnEndFlow()
                }
            })
        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }

    }, [])

    const ToggleFav = (id) => {
        OnStartFlow()
        try {
            toggleFavVehicle(sessionStorage.token, id, (error => {
                if (error) {
                    OnShowModal(error.message)
                    OnEndFlow()
                    return
                }
                if (vehicles.length) {
                    setvehicles(vehicles.map(vehicle => {
                        if (vehicle.id === id) {
                            return { ...vehicle, isFav: !vehicle.isFav }
                        }
                        return vehicle
                    }))
                }
                OnEndFlow()
            }))
        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }
    }

    return <>
        {vehicles.length ?
            <div className="home__results-list">
                {
                    vehicles.map(item => <div key={item.id} className='home__result' onClick={() => onItem(item.id)}>
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
            null
        }
        <button type='button' className='button' onClick={OnBackHome}>Back Home</button>
    </>
}

export default Results
