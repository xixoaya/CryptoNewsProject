import { useState, useEffect } from 'react'
import {
    addVehicleToCart,
    retrieveCartVehicles,
    removeVehicleCart
} from '../logic'

function Cart({ onItem, name, OnBackHome, OnStartFlow, OnEndFlow, OnShowModal }) {
    const [cart, setcart] = useState([]);

    useEffect(() => {

        OnStartFlow()
        try {
            retrieveCartVehicles(sessionStorage.token, (error, vehicles) => {

                if (error) {
                    OnShowModal(error.message)
                    OnEndFlow()
                } else {
                    setcart(vehicles)
                    OnEndFlow()
                }
            })

        } catch ({ message }) {
            OnShowModal(message)
            OnEndFlow()
        }

    }, []);


    const addToCArt = (id) => {
        OnStartFlow()
        try {
            addVehicleToCart(sessionStorage.token, id, (error) => {
                if (error) {
                    OnShowModal(error.message)
                    OnEndFlow()
                } else {
                    setcart(cart.map(vehicle => {
                        if (vehicle.id === id) {
                            return { ...vehicle, qty: vehicle.qty + 1 }
                        }
                        return vehicle
                    }))
                    OnEndFlow()
                    // OnShowModal(`Car in the cart ${name}!`, 'success')
                }
            })

        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }
    }

    const removeFromCart = (id) => {
        OnStartFlow()
        try {

            removeVehicleCart(sessionStorage.token, id, (error) => {
                if (error) {
                    OnShowModal(error.message)
                    OnEndFlow()
                } else {
                    setcart(cart.reduce((acum, vehicle) => {
                        if (vehicle.id === id) {
                            if (vehicle.qty < 2) {
                                return acum
                            }
                            vehicle = { ...vehicle, qty: vehicle.qty - 1 }
                        }
                        acum.push(vehicle)
                        return acum

                    }, []))
                    OnEndFlow()
                }
            })

        } catch ({ message }) {
            OnShowModal(message)
            OnEndFlow()
        }
    }


    return cart.length ?
        <div>
            <div className="title layout__title">
                <h1>YOUR CART</h1>
            </div>
            <div className="layout__subtitle">
                <p><strong className="name">{name ? name : 'Name'}</strong> you are only one step
                </p>
            </div>
            <div className='home__results-list'>
                {
                    cart.map(item => <div key={item.id} className='home__result' onClick={() => onItem(item.id)}>
                        <h2 className='home__result-title'>{item.name}</h2>
                        <img className='home__result-img' src={item.thumbnail || item.image} ></img>
                        <span className='home__result-price'>{item.qty} x {item.price} $</span>
                        <div>
                            <button className='button--small' onClick={event => {
                                event.stopPropagation()

                                addToCArt(item.id)
                            }}>Add</button>

                            <button className='button--small' onClick={event => {
                                event.stopPropagation()

                                removeFromCart(item.id)
                            }}>Remove</button>

                            {/* <button className='button--small' onClick={event => {
                        event.stopPropagation()

                        OnClickFav(item.id)
                    }}>{item.isFav ? '🧡' : '🤍'}</button> */}
                        </div>
                    </div>)
                }
            </div>
            <div className="total-cart">
                <span>TOTAL Items: {cart.reduce((acum, { qty }) => acum + qty, 0)}</span>
                <span>TOTAL Price: {cart.reduce((acum, { price, qty }) => acum + price * qty, 0)} $</span>
            </div>
            <div className="layout__buttons--home-low layout__buttons">
                <button className='button' type='button' onClick={() => OnBackHome()}>BACK HOME</button>
            </div>
        </div>
        :
        null
}
export default Cart