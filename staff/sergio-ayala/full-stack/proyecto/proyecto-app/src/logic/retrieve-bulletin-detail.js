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
function retrieveBulletinDetail(token, bulletinId) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

    if (typeof id !== 'string') throw new TypeError(`${bulletinId} is not a string`)
    if (!bulletinId.trim().length) throw new Error('id is empty or blank')

    return (async () => {
        const res = await fetch(`http://localhost:8000/api/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            //body: JSON.stringify({ username, password }) if its a post with body
        })

        const { status } = res

        if (status === 401 || status === 404) {
            const { error } = res.json()

            throw new Error(error)
        } else if (status !== 401 && status !== 404 && status !== 200) {
            throw new Error('unknow error')
        }

        const { favs = [], queue = [] } = await res.json()

        if (favs.length) {
            const res2 = await fetch(`http://localhost:8000/api/bulletins/detail/${bulletinId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                //body: JSON.stringify({ favs })
            })

            const { status } = res2

            if (status === 401 || status === 404) {
                const { error } = res2.json()
    
                throw new Error(error)
            } else if (status !== 401 && status !== 404 && status !== 201) {
                throw new Error('unknow error')
            }

            const bulletinDetail =  await res2.json()
            
            bulletinDetail.isFav = favs.includes(bulletinDetail.id)
            bulletinDetail.isQueue = queue.includes(bulletinDetail.id)

            return bulletinDetail


        } else {
            return favs
        }


        // if (status === 200) {
        //     return await res.json()
        // } else if (status === 401 || status === 404) {
        //     const { error } = res.json()

        //     throw new Error(error)
        // } else throw new Error('unknow error')
    })()
}

export default retrieveBulletinDetail