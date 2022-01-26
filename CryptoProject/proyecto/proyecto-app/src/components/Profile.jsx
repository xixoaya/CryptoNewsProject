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
import ProfileButtons from './ProfileButtons'
import './Profile.css'

import * as React from 'react';


function Profile({
    name,
    OnSignOut,
    OnDelete,
    OnStartFlow, OnEndFlow, OnShowModal
}) {
    const [view, setView] = useState('Profile')
    const [bulletinId, setbulletinId] = useState(null);
    const [bulletinQueue, setbulletinQueue] = useState(null);

    const backtoprofile = () => {
        setView('Profile')
        setbulletinId(null)
    }

    const goToDetail = (id, isQueue) => {
        setbulletinId(id)
        setbulletinQueue(isQueue)
    }

    const goToFavs = () => {setView('Favorites')}

    const goToQueue = () => {setView('Queue')}

    const goToHistory = () => {setView('History')}

    const goToPassword = () => {setView('Password')}

    const goToAccount = () => {setView('Account')}


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


    return <div className='pagelayout--shorter'>
        {!bulletinId && <> <div className="title layout__title"><h1>Profile</h1></div></>}

        {view === 'Profile' && <ProfileButtons 
            name={name} view={view} favorites={goToFavs} queue={goToQueue} 
            history={goToHistory} password={goToPassword} account={goToAccount} OnSignOut={OnSignOut}
        />}

        {view === 'Password' && <ChangePassword OnBackProfile={backtoprofile} OnUpdatePassword={changePassword} />}

        {view === 'Account' && <DeleteAccount OnBackProfile={backtoprofile} OnDeleteAccount={deleteAccount} />}

        {view === 'Favorites' && <>

            {!bulletinId && <BulletinsFavs
                OnBackProfile={backtoprofile} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
                onItem={goToDetail}></BulletinsFavs>
            }

            {bulletinId && <Detail 
                name={name} itemid={bulletinId} itemQueue={bulletinQueue} OnBackList={() => setbulletinId(null)} 
                OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal} ></Detail>
            }
        </>}

        {view === 'Queue' && <>

            {!bulletinId && <BulletinsQueue
                OnBackProfile={backtoprofile} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
                onItem={goToDetail} ></BulletinsQueue>
            }

            {bulletinId && <Detail 
                name={name} itemid={bulletinId} itemQueue={bulletinQueue} OnBackList={() => setbulletinId(null)} 
                OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal} ></Detail>
            }
        </>}

        {view === 'History' && <>

            {!bulletinId && <BulletinsHistory
                OnBackProfile={backtoprofile} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
                onItem={goToDetail}></BulletinsHistory>
            }

            {bulletinId && <Detail 
                name={name} itemid={bulletinId} itemQueue={bulletinQueue} OnBackList={() => setbulletinId(null)} 
                OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal} ></Detail>
            }

        </>}

    </div>
}

export default Profile