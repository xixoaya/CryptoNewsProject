/**
 * Adds a bulletin to the users history.
 * 
 * @param {string} token The that identifies the user in that session.
 * @param {string} query The query the user is looking for to find news related with.
 *
 */

function searchBulletins(token, query) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

    if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    query.trim()
    let newquery
    if (query.includes(' ')) { newquery = query.replace(' ', '%20')}
    else { newquery = query}

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

        const res2 = await fetch(`https://stark-eyrie-48729.herokuapp.com/api/bulletins/search?q=${newquery}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        const { status: status2  } = res2

        if (status2 === 401 || status2 === 404) {
            const { error } = res2.json()

            throw new Error(error)
        } else if (status2 !== 401 && status2 !== 404 && status2 !== 201) {
            throw new Error('unknow error')
        }

        const bulletins = await res2.json()

        const res3 = await fetch(`https://stark-eyrie-48729.herokuapp.com/api/bulletins`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bulletins)
        })

        const { status: status3  } = res3

        if (status3 === 401 || status3 === 404) {
            const { error } = res3.json()

            throw new Error(error)
        } else if (status3 !== 401 && status3 !== 404 && status3 !== 201) {
            throw new Error('unknow error')
        }

        const searchedBulletins =  await res3.json()

        searchedBulletins.forEach(bulletin => {
            bulletin.isFav = favs.includes(bulletin.id)
            bulletin.isFav = queue.includes(bulletin.id)
        });

        return searchedBulletins

    })()
}

export default searchBulletins