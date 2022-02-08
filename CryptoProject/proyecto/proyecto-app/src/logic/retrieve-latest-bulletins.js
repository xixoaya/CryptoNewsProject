/**
 * Retrieve latest bulletins when user is logged.
 * 
 * @param {string} token The that identifies the user in that session.
 *
 */

function retrieveLatestBulletinsLogued(token) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

    return (async () => {
        const res = await fetch(`https://stark-eyrie-48729.herokuapp.com/api/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        let { status } = res

        if (status === 401 || status === 404) {
            const { error } = res.json()

            throw new Error(error)
        } else if (status !== 401 && status !== 404 && status !== 200) {
            throw new Error('unknow error catching user')
        }

        const { favs = [], queue = [] } = await res.json()

        const res2 = await fetch(`https://stark-eyrie-48729.herokuapp.com/api/bulletins/home`, {
            method: 'GET',
        })

        const { status: status2 } = res2

        if (status2 === 401 || status2 === 404) {
            const { error } = res2.json()

            throw new Error(error)
        } else if (status2 !== 401 && status2 !== 404 && status2 !== 201) {
            
            throw new Error('unknow error catching covers')
        }

        const CoverBulletins = await res2.json()
        CoverBulletins.forEach(bulletin => {
            bulletin.isFav = favs.includes(bulletin.id)
            bulletin.queue = queue.includes(bulletin.id)
        });

        CoverBulletins.reverse()

        return CoverBulletins

    })()
}

export default retrieveLatestBulletinsLogued