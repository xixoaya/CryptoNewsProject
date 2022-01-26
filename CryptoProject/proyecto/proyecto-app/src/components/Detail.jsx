import { useState, useEffect } from 'react'
import {
    retrieveBulletinDetail,
    toggleFavBulletin,
    toggleQueueBulletin,
} from '../logic'
import './Detail.css'

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BackspaceIcon from '@mui/icons-material/Backspace';

function Detail({ OnBackList, itemid, itemQueue, OnStartFlow, OnEndFlow, OnShowModal }) {

    const [bulletin, setbulletin] = useState(null);

    useEffect(async () => {

        try {
            OnStartFlow()

            const bulletinDetail = await retrieveBulletinDetail(sessionStorage.token, itemid)

            if (itemQueue) await toggleQueueBulletin(sessionStorage.token, itemid)

            setbulletin(bulletinDetail)
            
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
            <div className="container-detail">
                <div className="content__detail">
                    
                    <h2 className="detail__title">{bulletin.title}</h2>
                    <time className="detail__created-time">{bulletin.createdTime}</time>
                    <span className="detail__badge">{bulletin.badge}</span>

                    <span className="detail__subtitle" >{bulletin.subTitle}</span>
                    <p>{bulletin.impContent[0]}</p>
                    <p>{bulletin.impContent[1]}</p>
                    <p>{bulletin.impContent[2]}</p>
                    <p>{bulletin.impContent[3] ? bulletin.impContent[3] : null}</p>
                    <p>{bulletin.impContent[4] ? bulletin.impContent[4] : null}</p>

                    <a className="detail__url" href={bulletin.url}>Visit {bulletin.source} for more info</a>

                    <div className="detail__tags">
                        <strong>Tags:</strong>
                        <span>{bulletin.tags[0]}</span>
                        <span>{bulletin.tags[1]}</span>
                    </div>
                </div>
                <div className="buttons-detail">
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<BackspaceIcon />} onClick={OnBackList}>
                            Go Back
                        </Button>
                        <Button variant="contained" endIcon={<FavoriteIcon color={bulletin.isFav ? 'secondary' : 'action'} sx={{ fontSize: 27 }} />} onClick={() => ToggleFav(bulletin.id)}>
                            Favorite
                        </Button>
                    </Stack>
                </div>
            </div>
        </>}
    </>

}

export default Detail