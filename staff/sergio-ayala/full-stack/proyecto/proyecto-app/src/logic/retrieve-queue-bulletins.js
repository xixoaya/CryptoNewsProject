//import context from './context'

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
function retrieveQueueBulletins(token) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

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

        const { queue = [] } = await res.json()

        if (queue.length) {
            const res2 = await fetch(`http://localhost:8000/api/bulletins`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( queue )
            })

            const { status: status2  } = res2

            if (status2 === 401 || status2 === 404) {
                const { error } = res2.json()
    
                throw new Error(error)
            } else if (status2 !== 401 && status2 !== 404 && status2 !== 201) {
                throw new Error('unknow error')
            }

            const queueBulletins =  await res2.json()
            queueBulletins.forEach(bulletin => bulletin.isQueue = true)

            return queueBulletins


        } else {
            return queue
        }


        // if (status === 200) {
        //     return await res.json()
        // } else if (status === 401 || status === 404) {
        //     const { error } = res.json()

        //     throw new Error(error)
        // } else throw new Error('unknow error')
    })()
}

export default retrieveQueueBulletins