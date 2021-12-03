import { useState, useEffect } from 'react'
import {
    retrieveVehicle,
    toggleFavVehicle,
    addVehicleToCart,
} from '../logic'

function Detail({ name, OnBackList, itemid, OnStartFlow, OnEndFlow, OnShowModal }) {

    const [vehicle, setvehicle] = useState(null);
    // const [cart, setcart] = useState(null);

    useEffect(() => {

        OnStartFlow()
        try {
            retrieveVehicle(sessionStorage.token, itemid, (error, vehicle) => {
                if (error) {
                    OnShowModal(error.message)
                    OnEndFlow()

                } else {
                    setvehicle(vehicle)
                    // OnGoToDetail(vehicle)
                    // goToHome()
                    OnEndFlow()
                }
            })
        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }

    }, [itemid]);

    const ToggleFav = (id) => {
        OnStartFlow()
        try {
            toggleFavVehicle(sessionStorage.token, id, (error => {
                if (error) {
                    OnShowModal(error.message)
                    OnEndFlow()
                    return
                }
                if (vehicle && vehicle.id === id) {
                    setvehicle({ ...vehicle, isFav: !vehicle.isFav })
                }
                
                OnEndFlow()
            }))
        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }
    }
    
    const addToCArt = (id) => {
        OnStartFlow()
        try {
            addVehicleToCart(sessionStorage.token, id, (error) => {
                if (error) {
                    OnShowModal(error.message)
                    OnEndFlow()
                } else {
                    // setcart(cart.map(vehicle => {
                    //     if (vehicle.id === id) {
                    //         return { ...vehicle, qty: vehicle.qty + 1 }
                    //     }
                    //     return vehicle
                    // }))
                    OnEndFlow()
                    OnShowModal(`Car in the cart ${name}!`, 'success')
                }
            })

        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }
    }



    return <>
        {vehicle && <>
        <div className="home__detail">
        <h2>{vehicle.name}</h2>
        <img className="home__detail-image" src={vehicle.image} alt=""></img>

        {/* <div className="home__detail-main"> */}
        <span>{vehicle.maker}</span>
        <time>{vehicle.year}</time>
        <span>{vehicle.price} $</span>
        {/* </div> */}

        {/* <div className="home__detail-second"> */}
        <span>{vehicle.color}</span>
        <span>{vehicle.style}</span>
        <span>{vehicle.collection}</span>
        {/* </div> */}
        <p>{vehicle.description}</p>
        <a href={vehicle.url}>original</a>
        </div>
        <div className="buttons-detail">
            <button type='button' className='button--small' onClick={OnBackList}>Back</button>
            <button type='button' className='button--small' onClick={() => ToggleFav(vehicle.id)}>{vehicle.isFav ? '🧡' : '🤍'}</button>
            <button type='button' className='button--small' onClick={() => addToCArt(vehicle.id)}>Add to Cart</button>
        </div>
        </>}
    </>

}

export default Detail