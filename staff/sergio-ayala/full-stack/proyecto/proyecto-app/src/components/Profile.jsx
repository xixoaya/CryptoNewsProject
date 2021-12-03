import { useState, useEffect } from 'react'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'
import {
    updatePassword,
    unregisterUser
} from '../logic'

function Profile({
    name,
    OnBackHome,
    OnSignOut,
    OnDelete, 
    OnStartFlow, OnEndFlow, OnShowModal
}) {
    // const [view, setView] = useState('home')
    const [view, setView] = useState('Profile')

    const backtoprofile = () => setView('Profile')

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
        <div className="layout__subtitle">
            <p><strong className="name">{name ? name : 'Name'}</strong> {`What do you whant to do with your ${view}?`}
            </p>
        </div>

        {view === 'Profile' && <>
            <div className="layout__buttons--home-hi layout__buttons ">
                <button className='button'>UPDATE PROFILE</button>
                <button className='button' onClick={()=> setView('Password')}>CHANGE PASSWORD</button>
                <button className='button' onClick={()=> setView('Account')}>DELETE ACCOUNT</button>
            </div>

            <div className="layout__buttons--home-low layout__buttons">
                <button className='button' onClick={OnSignOut}>SIGN OUT</button>
                <button className='button' onClick={OnBackHome}>BACK HOME</button>
            </div>
        </>}

        {view === 'Password' &&
            <ChangePassword OnBackProfile={backtoprofile} OnUpdatePassword={changePassword} ></ChangePassword>}

        {view === 'Account' &&
            <DeleteAccount OnBackProfile={backtoprofile} OnDeleteAccount={deleteAccount} ></DeleteAccount>}
        
    </div>
}

export default Profile