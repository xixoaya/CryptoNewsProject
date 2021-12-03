function searchVehicles(token, query, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

    if (typeof query !== 'string') throw new TypeError(query + ' is not a string')

    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')
    
    const xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText } = xhr


        if (status === 401 || status === 404) {
            const response = JSON.parse(responseText)
            const message = response.error
            callback(new Error(message))

        } else if (status === 200) {
            const user = JSON.parse(responseText)
            
            const { favs = [] } = user
            
            const xhr2 = new XMLHttpRequest

            xhr2.onload = function () {
                const { status, responseText } = xhr2

                if (status === 200) {
                    const vehicles = JSON.parse(responseText)

                    vehicles.forEach(vehicle => {
                        vehicle.isFav = favs.includes(vehicle.id)
                    });

                    callback(null, vehicles)
                }
            }

            xhr2.open('GET', `https://b00tc4mp.herokuapp.com/api/hotwheels/vehicles?q=${query}`)

            xhr2.send()

        }
    }
    xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.send()

}

export default searchVehicles