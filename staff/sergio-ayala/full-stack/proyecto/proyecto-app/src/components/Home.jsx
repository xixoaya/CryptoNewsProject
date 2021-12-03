import { useState } from 'react'
import {
    updatePassword,
    unregisterUser,
    searchVehicles,
} from '../logic'
import HeaderHome from './HeaderHome'
import Search from './Search'
import Results from './Results'
import Detail from './Detail'
import ButtonsHome from './ButtonsHome'
import Profile from './Profile'
import Favs from './Favs'
import Cart from './Cart'
// import ChangePassword from './ChangePassword'
// import DeleteAccount from './DeleteAccount'


function Home({ Username, OnSignOut, OnDelete, OnStartFlow, OnEndFlow, OnShowModal }) {

    const [view, setView] = useState('home');
    const [vehicles, setvehicles] = useState([]);
    const [name, setname] = useState(Username);
    const [query, setquery] = useState(null);
    const [vehicleId, setvehicleId] = useState(null);
    // const [vehicle, setvehicle] = useState(null);
    // const [cart, setcart] = useState([]);
    // const [favs, setfavs] = useState([]);

    const goToHome = () => setView('home')
    const goToProfile = () => setView('profile')
    const goToFavs = () => { setView('favs') }
    const goToCart = () => { setView('cart') }

    const goToResults = () => {
        setView('home')
        setvehicleId(null)
    }
    const clearHome = () => {
        setquery('')
        setView('home')
        setvehicleId(null)
    }
    const goToDetail = (id) => {
        setvehicleId(id)
        setView('home')
    }
    const search = query => {
        setvehicles([])
        setvehicleId(null)
        setquery(query)
    }

    return <div className="pagelayout">

            <ButtonsHome OnViewProfile={goToProfile} OnViewFavs={goToFavs} OnViewCart={goToCart} ></ButtonsHome>
        {view === 'home' && <>
            <HeaderHome name={name}></HeaderHome>
            <Search onSearch={search} query={query} ></Search>

            {query && !vehicleId && <Results query={query} OnBackHome={clearHome} onItem={goToDetail} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal} ></Results>}
            {vehicleId && <Detail name={name} itemid={vehicleId} OnBackList={() => setvehicleId(null)} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal} ></Detail>}

        </>}

        {view === 'profile' && <Profile
            name={name} OnBackHome={goToHome} OnSignOut={OnSignOut} OnDelete={OnDelete} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
        ></Profile>}

        {view === 'favs' && <Favs
            name={name} OnBackHome={goToHome} onItem={goToDetail} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
        ></Favs>}

        {view === 'cart' && <Cart
            name={name} OnBackHome={goToResults} onItem={goToDetail} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
        ></Cart>}

    </div>

}

export default Home