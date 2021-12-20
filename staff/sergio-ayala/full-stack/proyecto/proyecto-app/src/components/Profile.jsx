import { useState, useEffect } from 'react'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'
import {
    updatePassword,
    unregisterUser
} from '../logic'
import BulletinsFavs from './BulletinsFavs'
import Detail from './Detail'
import BulletinsQueue from './BulletinsQueue'
import BulletinsHistory from './BulletinsHistory'

function Profile({
    name,
    OnBackHome,
    OnSignOut,
    OnDelete,
    OnStartFlow, OnEndFlow, OnShowModal
}) {
    // const [view, setView] = useState('home')
    const [view, setView] = useState('Profile')
    const [bulletinId, setbulletinId] = useState(null);
    const [bulletinQueue, setbulletinQueue] = useState(null);

    //const backtoprofile = () => setView('Profile')

    const backtoprofile = () => {
        //setquery('')
        setView('Profile')
        setbulletinId(null)
    }

    const goToDetail = (id, isQueue) => {
        setbulletinId(id)
        setbulletinQueue(isQueue)
        // setView('home')
    }

    const changePassword = (oldpassword, password) => {
        OnStartFlow()
        try {
            updatePassword(sessionStorage.token, oldpassword, password, (error) => {
                if (error) {
                    OnShowModal(error.message)
                    OnEndFlow()

                } else {
                    setView('Profile')
                    OnEndFlow()
                    OnShowModal(`${name}, your password has been updated!`, 'success')
                }
            })
        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }
    }

    const deleteAccount = (password) => {
        OnStartFlow()
        try {
            unregisterUser(sessionStorage.token, password, (error) => {
                if (error) {
                    OnShowModal(error.message)
                    OnEndFlow()

                } else {
                    OnEndFlow()
                    OnShowModal(`${name}, account deleted`, 'success')
                    OnDelete()
                }
            })
        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }
    }


    return <div>
        <div className="title layout__title">
            <h1>PROFILE</h1>
        </div>

        {view === 'Profile' && <>
            <div className="layout__subtitle">
                <p><strong className="name">{name ? name : 'Name'}</strong> {`What do you whant to do with your ${view}?`}
                </p>
            </div>
            <div className="layout__buttons--home-hi layout__buttons ">
                {/* <button className='button'>UPDATE PROFILE</button> */}
                <button className='button' onClick={() => setView('Favorites')}>View Favorites</button>
                <button className='button' onClick={() => setView('Queue')}>view News in Queue</button>
                <button className='button' onClick={() => setView('History')}>view News History</button>
            </div>
            <div className="layout__buttons--home-hi layout__buttons ">
                {/* <button className='button'>UPDATE PROFILE</button> */}
                <button className='button' onClick={() => setView('Password')}>CHANGE PASSWORD</button>
                <button className='button' onClick={() => setView('Account')}>DELETE ACCOUNT</button>
            </div>

            <div className="layout__buttons--home-low layout__buttons">
                <button className='button' onClick={OnSignOut}>SIGN OUT</button>
                {/* <button className='button' onClick={OnBackHome}>BACK HOME</button> */}
            </div>
        </>}

        {view === 'Password' &&
            <ChangePassword OnBackProfile={backtoprofile} OnUpdatePassword={changePassword} ></ChangePassword>}

        {view === 'Account' &&
            <DeleteAccount OnBackProfile={backtoprofile} OnDeleteAccount={deleteAccount} ></DeleteAccount>}

        {view === 'Favorites' && <>
            {!bulletinId && <BulletinsFavs
                OnBackProfile={backtoprofile} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
                onItem={goToDetail}

            ></BulletinsFavs>}
            {bulletinId && <Detail name={name} itemid={bulletinId} itemQueue={bulletinQueue} OnBackList={() => setbulletinId(null)} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal} ></Detail>}
        </>}

        {view === 'Queue' && <>
            {!bulletinId && <BulletinsQueue
                OnBackProfile={backtoprofile} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
                onItem={goToDetail}

            ></BulletinsQueue>}
            {bulletinId && <Detail name={name} itemid={bulletinId} itemQueue={bulletinQueue} OnBackList={() => setbulletinId(null)} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal} ></Detail>}
        </>}

        {view === 'History' && <>
            {!bulletinId && <BulletinsHistory
                OnBackProfile={backtoprofile} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
                onItem={goToDetail}

            ></BulletinsHistory>}
            {bulletinId && <Detail name={name} itemid={bulletinId} itemQueue={bulletinQueue} OnBackList={() => setbulletinId(null)} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal} ></Detail>}
        </>}

    </div>
}

export default Profile