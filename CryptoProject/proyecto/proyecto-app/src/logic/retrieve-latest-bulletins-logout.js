/**
 * Retrieve latest bulletinns when user is not logged.
 */
function retrieveLatestBulletinsNoLogued() {
    // if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    // if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

    return (async () => {

        const res2 = await fetch(`http://localhost:8000/api/bulletins/home`, {
            method: 'GET',
        })

        const { status: status2  } = res2

        if (status2 === 401 || status2 === 404) {
            const { error } = res2.json()

            throw new Error(error)
        } else if (status2 !== 401 && status2 !== 404 && status2 !== 201) {
            throw new Error('unknow error')
        }

        const CoverBulletins = await res2.json()

        const CoverBulletinsNoLogged = CoverBulletins.slice(0,10)

        CoverBulletinsNoLogged.reverse()

        return CoverBulletinsNoLogged

    })()
}

export default retrieveLatestBulletinsNoLogued