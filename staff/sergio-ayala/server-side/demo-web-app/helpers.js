function getCookieId(cookie) {
    let res = null
    if (cookie) {
        const [, id] = cookie.split('=')
        res = id
    }
    return res
}

// function getCookieId(cookie) { //IGUAL QUE LA DE ARRIBA MÄS CORTO
//     if (cookie) {
//         const [, id] = cookie.split('=')
//         return id
//     }   
// }

// function ifCookieGoHome(cookie) {
//     const id = getCookieId(cookie)

//     if (id) return res.redirect('/')  
// }
// ifCookieGoHome,

module.exports = {
    getCookieId,
}