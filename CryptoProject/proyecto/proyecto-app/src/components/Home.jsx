import { useState } from 'react'
import {
    updatePassword,
    unregisterUser,
    searchVehicles,
} from '../logic'
import HeaderHome from './HeaderHome'
//import Search from './Search'
import Results from './Results'
import Detail from './Detail'
import ButtonsHome from './ButtonsHome'
import Profile from './Profile'
import SearchBulletins from './SearchBulletins'
import Favs from './Favs'
import Cart from './Cart'
import BulletinsCoverLogged from './BulletinsCoverLogged'

// import ChangePassword from './ChangePassword'
// import DeleteAccount from './DeleteAccount'


function Home({ Username, OnSignOut, OnDelete, OnStartFlow, OnEndFlow, OnShowModal }) {

    const [view, setView] = useState('home');
    const [name, setname] = useState(Username);
    const [bulletinId, setbulletinId] = useState(null);
    const [bulletinQueue, setbulletinQueue] = useState(null);

    const goToHome = () => {
        setView('home')
        setbulletinId(null)
    }
    const goToProfile = () => {
        setView('profile')
        setbulletinId(null)
    }
    const goToSearch = () => {
        setView('search')
        setbulletinId(null)
    }

    const clearDetail = () => {

        setbulletinId(null)
    }
    const goToDetail = (id, isQueue) => {
        setbulletinId(id)
        setbulletinQueue(isQueue)
        
    }


    return <div className="pagelayout">

        <ButtonsHome OnViewProfile={goToProfile} OnViewHome={goToHome} OnViewSearch={goToSearch} view={view} ></ButtonsHome>
        {view === 'home' && <>
            {!bulletinId && <HeaderHome name={name}></HeaderHome>}

            {!bulletinId && <BulletinsCoverLogged OnBackHome={clearDetail} onItem={goToDetail} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal} ></BulletinsCoverLogged>}

            {bulletinId && <Detail name={name} itemid={bulletinId} itemQueue={bulletinQueue} OnBackList={() => setbulletinId(null)} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal} ></Detail>}

        </>}

        {view === 'profile' && <Profile
            name={name} OnBackHome={goToHome} OnSignOut={OnSignOut} OnDelete={OnDelete} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
        ></Profile>}

        {view === 'search' && <SearchBulletins
            name={name} OnBackHome={goToHome} OnSignOut={OnSignOut} OnDelete={OnDelete} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
        ></SearchBulletins>}

    </div>

}

export default Home