/**
 * ARetrieve users history bulletins.
 * 
 * @param {string} token that identifies the user in that session.
 *
 */
function retrieveHistoryBulletins(token) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

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

        const { favs = [], history = [] } = await res.json()

        if (history.length) {
            const res2 = await fetch(`http://localhost:8000/api/bulletins`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( history )
            })

            const { status: status2  } = res2

            if (status2 === 401 || status2 === 404) {
                const { error } = res2.json()
    
                throw new Error(error)
            } else if (status2 !== 401 && status2 !== 404 && status2 !== 201) {
                throw new Error('unknow error')
            }

            const historyBulletins =  await res2.json()
            historyBulletins.forEach(bulletin => {
                bulletin.ishistory = true
                bulletin.isFav = favs.includes(bulletin.id)
            })

            historyBulletins.reverse()

            return historyBulletins


        } else {
            return history
        }

    })()
}

export default retrieveHistoryBulletins