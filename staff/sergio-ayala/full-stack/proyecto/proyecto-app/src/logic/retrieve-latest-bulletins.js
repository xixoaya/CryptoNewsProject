function retrieveLatestBulletinsLogued(token) {
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

        let { status } = res

        if (status === 401 || status === 404) {
            const { error } = res.json()

            throw new Error(error)
        } else if (status !== 401 && status !== 404 && status !== 200) {
            throw new Error('unknow error catching user')
        }

        const { favs = [], queue = [] } = await res.json()

        const res2 = await fetch(`http://localhost:8000/api/bulletins/home`, {
            method: 'GET',
            // headers: {
            //     'Authorization': `Bearer ${token}`
            // },
            //body: JSON.stringify({ favs })
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
            bulletin.isFav = queue.includes(bulletin.id)
        });

        return CoverBulletins


        // if (status === 200) {
        //     return await res.json()
        // } else if (status === 401 || status === 404) {
        //     const { error } = res.json()

        //     throw new Error(error)
        // } else throw new Error('unknow error')
    })()
}

export default retrieveLatestBulletinsLogued