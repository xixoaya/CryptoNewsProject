import { useState, useEffect } from 'react'
import BulletinLeadPanelLogOut from './BulletinLeadPanelLogOut'
import {
    retrieveLatestBulletinsNoLogued
} from '../logic'
import ButtonsAppLogOut from './ButtonsAppLogOut'

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
        OnShowModal('Sorry but you have to LOGIN to enjoy all de news and the full experience', 'warn')
    }


    return <>
    <div className="landing pagelayout">

        <div className="title layout__title">
            <h1>WELCOME</h1>
        </div>
        <div className="layout__subtitle">
            <p>Enjoy all <strong className="strong__landing">the latest news</strong> related with crypto and blockchain <strong className="strong__landing">in just one place</strong>... you are welcome</p>
        </div>
        <div className="layout__main">
            <ButtonsAppLogOut onSignIn={OnSignIn} onSignUp={OnSignUp} />
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