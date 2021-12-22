import { useState, useEffect } from 'react'
import BulletinLeadPanelLogOut from './BulletinLeadPanelLogOut'
import {
    retrieveLatestBulletinsNoLogued
} from '../logic'

function Landing({OnSignIn, OnSignUp, OnStartFlow, OnEndFlow, OnShowModal}) {
    const [bulletins, setbulletins] = useState([]);

    useEffect(async () => {

        try {
            OnStartFlow()

            const bulletins = await retrieveLatestBulletinsNoLogued(sessionStorage.token)

            setbulletins(bulletins)

            OnEndFlow()


        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }

    }, [])

    const onItem = () => {
        OnShowModal('Sorry but you have to log in to enjoy all de news and the full experience', 'warn')
    }


    return <>
    <div className="landing pagelayout">

        <div className="title layout__title">
            <h1>WELCOME</h1>
        </div>
        <div className="layout__subtitle">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis earum nostrum quis quae accusamus
                repellat velit ipsum sapiente corrupti natus aspernatur, deserunt eveniet. Eveniet, nesciunt deleniti
                assumenda sequi nobis neque?</p>
        </div>
        <div className="layout__main">
            <button className='button' onClick ={OnSignIn}>SIGN IN</button>
            <button className='button' onClick ={OnSignUp}>SIGN UP</button>
        </div>
        {bulletins.length ?
            <div className="home__results-list">
                {
                 bulletins.map( item => < BulletinLeadPanelLogOut 
                    item = { item } onItem = {onItem} 
                    
                    
                    />)
                    
                }
            </div>

            :
            null
        }

    </div>
</>
}

export default Landing