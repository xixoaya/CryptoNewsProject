function retrieveLatestBulletinsNoLogued() {
    // if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    // if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

    return (async () => {

        const res2 = await fetch(`http://localhost:8000/api/bulletins/home`, {
            method: 'GET',
            // headers: {
            //     'Authorization': `Bearer ${token}`
            // },
            //body: JSON.stringify({ favs })
        })

        const { status } = res2

        if (status === 401 || status === 404) {
            const { error } = res2.json()

            throw new Error(error)
        } else if (status !== 401 && status !== 404 && status !== 201) {
            throw new Error('unknow error')
        }

        const CoverBulletins = await res2.json()
        // CoverBulletins.forEach(bulletin => {
        //     bulletin.isFav = favs.includes(bulletin.id)
        //     bulletin.isFav = queue.includes(bulletin.id)
        // });

        return CoverBulletins

    })()
}

export default retrieveLatestBulletinsNoLogued