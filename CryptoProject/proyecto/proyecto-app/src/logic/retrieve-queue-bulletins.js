/**
 * retrieve bulletins that the user has in queue.
 * 
 * @param {string} token The that identifies the user in that session.
 *
 */
function retrieveQueueBulletins(token) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

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

        const { favs = [], queue = [] } = await res.json()

        if (queue.length) {
            const res2 = await fetch(`https://stark-eyrie-48729.herokuapp.com/api/bulletins`, {
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
            queueBulletins.forEach(bulletin => {
                bulletin.isQueue = true
                bulletin.isFav = favs.includes(bulletin.id)
            })

            return queueBulletins


        } else {
            return queue
        }

    })()
}

export default retrieveQueueBulletins