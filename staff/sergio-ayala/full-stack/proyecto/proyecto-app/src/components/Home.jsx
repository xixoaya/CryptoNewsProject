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
    const [vehicles, setvehicles] = useState([]);
    const [name, setname] = useState(Username);
    const [query, setquery] = useState(null);
    const [bulletinId, setbulletinId] = useState(null);
    const [bulletinQueue, setbulletinQueue] = useState(null);
    // const [vehicle, setvehicle] = useState(null);
    // const [cart, setcart] = useState([]);
    // const [favs, setfavs] = useState([]);

    const goToHome = () => setView('home')
    const goToProfile = () => setView('profile')
    const goToSearch = () => setView('search')
    //const goToCart = () => { setView('cart') }

    // const goToResults = () => {
    //     setView('home')
    //     setvehicleId(null)
    // }
    const clearDetail = () => {
        //setquery('')
        // setView('home')
        setbulletinId(null)
    }
    const goToDetail = (id, isQueue) => {
        setbulletinId(id)
        setbulletinQueue(isQueue)
        // setView('home')
    }
    // const search = query => {
    //     setvehicles([])
    //     setvehicleId(null)
    //     setquery(query)
    // }

    return <div className="pagelayout">

        <ButtonsHome OnViewProfile={goToProfile} OnViewHome={goToHome} OnViewSearch={goToSearch} view={view} ></ButtonsHome>
        {view === 'home' && <>
            <HeaderHome name={name}></HeaderHome>

            {!bulletinId && <BulletinsCoverLogged OnBackHome={clearDetail} onItem={goToDetail} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal} ></BulletinsCoverLogged>}

            {bulletinId && <Detail name={name} itemid={bulletinId} itemQueue={bulletinQueue} OnBackList={() => setbulletinId(null)} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal} ></Detail>}

        </>}

        {view === 'profile' && <Profile
            name={name} OnBackHome={goToHome} OnSignOut={OnSignOut} OnDelete={OnDelete} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
        ></Profile>}

        {view === 'favs' && <Favs
            name={name} OnBackHome={goToHome} onItem={goToDetail} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
        ></Favs>}

        {view === 'search' && <SearchBulletins
            name={name} OnBackHome={goToHome} OnSignOut={OnSignOut} OnDelete={OnDelete} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
        ></SearchBulletins>}

        {/* {view === 'cart' && <Cart
            name={name} OnBackHome={goToResults} onItem={goToDetail} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
        ></Cart>} */}

    </div>

}

export default Home