import { useState, useEffect } from 'react'
import {
    retrieveBulletinDetail,
    toggleFavBulletin,
    toggleQueueBulletin,
} from '../logic'

function Detail({ name, OnBackList, itemid, itemQueue, OnStartFlow, OnEndFlow, OnShowModal }) {

    //const [vehicle, setvehicle] = useState(null);
    const [bulletin, setbulletin] = useState(null);
    // const [cart, setcart] = useState(null);

    useEffect(async () => {

        try {
            OnStartFlow()

            const bulletinDetail = await retrieveBulletinDetail(sessionStorage.token, itemid)

            if (itemQueue) await toggleQueueBulletin(sessionStorage.token, itemid)

            setbulletin(bulletinDetail)
            // OnGoToDetail(vehicle)
            // goToHome()
            OnEndFlow()


        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }

    }, []);

    const ToggleFav = async (id) => {
        try {
            OnStartFlow()

            await toggleFavBulletin(sessionStorage.token, id)

            if (bulletin) {
                
                setbulletin({ ...bulletin, isFav: !bulletin.isFav })
            }
            OnEndFlow()

        } catch ({ message }) {
            OnShowModal(message, 'warn')
            OnEndFlow()
        }
    }


    return <>
        {bulletin && <>
            <div className="home__detail">
                <img className="home__detail-image" src={(bulletin.imageSrc) ? bulletin.imageSrc : "src/default/detail"} alt=""></img>
                
                <h2>{bulletin.title}</h2>
                <time>{bulletin.createdTime}</time>
                <span>{bulletin.badge}</span>
                
                <span>{bulletin.subTitle}</span>

                {/* <div className="home__detail-main"> */}
                {/* </div> */}

                {/* <div className="home__detail-second"> */}
                <p>{bulletin.impContent[0]}</p>
                <p>{bulletin.impContent[1]}</p>
                <p>{bulletin.impContent[2]}</p>
                <p>{bulletin.impContent[3] ? bulletin.impContent[3] : null}</p>
                <p>{bulletin.impContent[4] ? bulletin.impContent[4] : null}</p>
                {/* </div> */}
                <p>{bulletin.tags[0]}</p>
                <p>{bulletin.tags[1]}</p>
                <a href={bulletin.url}>Visit {bulletin.source} for more info</a>
            </div>
            <div className="buttons-detail">
                <button type='button' className='button--small' onClick={OnBackList}>Back</button>
                <button type='button' className='button--small' onClick={() => ToggleFav(bulletin.id)}>{bulletin.isFav ? '🧡' : '🤍'}</button>
                
            </div>
        </>}
    </>

}

export default Detail