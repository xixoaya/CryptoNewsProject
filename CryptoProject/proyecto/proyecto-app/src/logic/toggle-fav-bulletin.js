/**
 * Include or exclude bulletin id of users favs .
 * 
 * @param {string} token The that identifies the user in that session.
 * @param {string} bulletinId The id of the bulletin that is added to the users favs.
 *
 */

import addFavToBulletin from './add-fav-to-bulletin'

function toggleFavBulletin(token, bulletinId) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

    if (typeof bulletinId !== 'string') throw new TypeError(`${bulletinId} is not a string`)
    if (!bulletinId.trim().length) throw new Error('id is empty or blank')


    return (async () => {
        const res = await fetch(`https://stark-eyrie-48729.herokuapp.com/api/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        const { status } = res

        if (status === 401 || status === 404) {
            const { error } = res.json()

            throw new Error(error)
        } else if (status !== 401 && status !== 404 && status !== 200) {
            throw new Error('unknow error')
        }

        const { favs = [] } = await res.json()

        const index = favs.indexOf(bulletinId)

            if (index < 0){
                favs.push(bulletinId)
                await addFavToBulletin(token, bulletinId)
            }else
                favs.splice(index, 1)

        const res2 = await fetch(`https://stark-eyrie-48729.herokuapp.com/api/users`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ favs })
        })

        const { status: status2  } = res2

        if (status2 === 401 || status2 === 404) {
            const { error } = res2.json()

            throw new Error(error)
        } else if (status2 !== 401 && status2 !== 404 && status2 !== 204) {
            throw new Error('unknow error')
        }

    })()
}

export default toggleFavBulletin