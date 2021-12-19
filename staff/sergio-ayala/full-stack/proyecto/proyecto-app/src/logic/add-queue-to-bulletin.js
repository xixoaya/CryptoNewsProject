import context from './context'

/**
 * Signs up a user in the application.
 * 
 * @param {string} name The full name of the user to be registered.
 * @param {string} username The username of the user to be registered.
 * @param {string} password The password of the user to be registered.
 * @param {function} callback The callback function to manage the response.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format.
 */
function addQueueToBulletin(token, bulletinId) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

    if (typeof id !== 'string') throw new TypeError(`${bulletinId} is not a string`)
    if (!bulletinId.trim().length) throw new Error('id is empty or blank')


    return (async () => {
        const res = await fetch(`http://localhost:8000/api/bulletins`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{ bulletinId }]) 
        })

        const { status } = res

        if (status === 401 || status === 404) {
            const { error } = res.json()

            throw new Error(error)
        } else if (status !== 401 && status !== 404 && status !== 201) {
            throw new Error('unknow error')
        }

        let { clicksQueue = 0 } = await res.json()

        clicksQueue = clicksQueue + 1

        //history.push(bulletinId)

        const res2 = await fetch(`http://localhost:8000/api/bulletins`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clicksQueue })
        })

        const { status } = res2

        if (status === 401 || status === 404) {
            const { error } = res2.json()

            throw new Error(error)
        } else if (status !== 401 && status !== 404 && status !== 201) {
            throw new Error('unknow error')
        }
        
        // const favBulletins = await res2.json()
        // favBulletins.forEach(bulletin => bulletin.isFav = true)

        // return favBulletins

    })()
}

export default addQueueToBulletin