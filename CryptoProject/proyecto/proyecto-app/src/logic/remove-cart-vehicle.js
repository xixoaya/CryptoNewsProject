function removeVehicleCart(token, id, callback) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

    if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)
    if (!id.trim().length) throw new Error('id is empty or blank')

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status, responseText } = xhr

        if (status === 401 || status === 400) {
            const response = JSON.parse(responseText)
            const message = response.Error
            callback(new Error(message))
        } else if (status === 200) {
            const user = JSON.parse(responseText)

            const { cart = [] } = user

            const index = cart.findIndex(vehicle => vehicle.id === id)

            if (index < 0) {
                return callback(new Error(`the vehicle with id:${id} is not in your cart`))
            }
            const item = cart[index]

            item.qty--

            if (item.qty === 0) {
                cart.splice(index, 1)
            }

            const xhr2 = new XMLHttpRequest
            
            xhr2.onload = () => {
                const {status, responseText} = xhr2

                if (status === 400 || status === 401) {
                    const response = JSON.parse(responseText)

                    const message = response.error

                    callback(new Error(message))
                } else if (status === 204) {
                    callback(null)
                }
            }
            xhr2.open('PATCH', 'https://b00tc4mp.herokuapp.com/api/v2/users')
            xhr2.setRequestHeader('Authorization', `Bearer ${token}`)   
            xhr2.setRequestHeader('Content-Type', 'application/json') 
            const body = { cart }
            xhr2.send(JSON.stringify(body))
        }
    }
    
    xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.send()
}
export default removeVehicleCart