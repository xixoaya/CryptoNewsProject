import addClickToBulletin from './add-click-to-bulletin'
import addBulletinToHistory from './add-bulletin-to-history'
/**
 * Adds a bulletin to the users history.
 * 
 * @param {string} token The that identifies the user in that session.
 * @param {string} bulletinId The id of the bulletin that is added to the users history.
 *
 */
function retrieveBulletinDetail(token, bulletinId) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

    if (typeof bulletinId !== 'string') throw new TypeError(`${bulletinId} is not a string`)
    if (!bulletinId.trim().length) throw new Error('id is empty or blank')

    return (async () => {
        const res = await fetch(`http://localhost:8000/api/users`, {
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

        const { favs = [], queue = [] } = await res.json()

        const res2 = await fetch(`http://localhost:8000/api/bulletins/detail/${bulletinId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        const { status: status2 } = res2

        if (status2 === 401 || status2 === 404) {
            const { error } = res2.json()

            throw new Error(error)
        } else if (status2 !== 401 && status2 !== 404 && status2 !== 201) {
            throw new Error('unknow error')
        }

        const bulletinDetail = await res2.json()

        bulletinDetail.isFav = favs.includes(bulletinDetail.id)

        await Promise.all([addClickToBulletin(token, bulletinId), addBulletinToHistory(token, bulletinId)])

        return bulletinDetail

    })()
}

export default retrieveBulletinDetail