/**
 * Adds a bulletin to the users history.
 * 
 * @param {string} token The that identifies the user in that session.
 * @param {string} bulletinId The id of the bulletin that is added to the users history.
 *
 */
function addClickToBulletin(token, bulletinId) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

    if (typeof bulletinId !== 'string') throw new TypeError(`${bulletinId} is not a string`)
    if (!bulletinId.trim().length) throw new Error('id is empty or blank')


    return (async () => {
        const res = await fetch(`http://localhost:8000/api/bulletins`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([ bulletinId ]) 
        })

        const { status } = res

        if (status === 401 || status === 404) {
            const { error } = res.json()

            throw new Error(error)
        } else if (status !== 401 && status !== 404 && status !== 201) {
            throw new Error('unknow error')
        }

        let { clicks = 0 } = await res.json()

        const newClicks = {
            clicks: clicks + 1,
            id: bulletinId
        }

        const res2 = await fetch(`http://localhost:8000/api/bulletins`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( newClicks )
        })

        const { status: status2  } = res2

        if (status2 === 401 || status2 === 404) {
            const { error } = res2.json()

            throw new Error(error)
        } else if (status2 !== 401 && status2 !== 404 && status2 !== 201) {
            throw new Error('unknow error')
        }

    })()
}

export default addClickToBulletin