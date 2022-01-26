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
import BulletinsSearched from './BulletinsSearched'

function SearchBulletins({
    name,
    OnBackHome,
    OnSignOut,
    OnDelete,
    OnStartFlow, OnEndFlow, OnShowModal
}) {
    const [view, setView] = useState('Empty')
    const [bulletinId, setbulletinId] = useState(null);
    const [bulletinQueue, setbulletinQueue] = useState(null);
    const [query, setquery] = useState(null);

    const cleanquery = () => {
        setView('Empty')
        setquery(null)
    }

    const goToDetail = (id, isQueue) => {
        setbulletinId(id)
        setbulletinQueue(isQueue)
    }

    const onSearch = (query) => {
        setView('Results')
        setquery(query)
        setbulletinId(null)
    }

    return <div className='pagelayout--shorter' > 
        {!bulletinId && <>
            <div className="title layout__title">
                <h1>Lets Search</h1>
            </div>
        
        </>}

        {view === 'Empty' && <>
            <form className="layout__buttons--iline" onSubmit={event => {
                event.preventDefault()

                const query = event.target.query.value

                query ? onSearch(query) : cleanquery()

                
            }}>
                <input type="text" id='query' className="input" name="query" placeholder="News Query" defaultValue={query ? query : ''}></input>
                <button className='button--small' type="submit">{'🔍'}</button>
            </form>
            <div className="layout__subtitle">
                <p><strong className="name">{name ? name : 'Name'}</strong> {`What should we look for 🙄?`}
                </p>
            </div>

        </>}

        {view === 'Results' && <>
            {!bulletinId && <BulletinsSearched
                cleanquery={cleanquery} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal}
                onItem={goToDetail} query={query}

            ></BulletinsSearched>}
            {bulletinId && <Detail name={name} itemid={bulletinId} itemQueue={bulletinQueue} OnBackList={() => setbulletinId(null)} OnStartFlow={OnStartFlow} OnEndFlow={OnEndFlow} OnShowModal={OnShowModal} ></Detail>}
        </>}

    </div>
}

export default SearchBulletins