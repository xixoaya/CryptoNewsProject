function getCookieId(cookie) {
    let res = null
    if (cookie) {
        const [, id] = cookie.split('=')
        res = id
    }
    return res
}

function noCookieGoHome(cookie) {
    const id = getCookieId(cookie)
    if (id) return res.redirect('/')
    
}
module.exports = {
    getCookieId,
    noCookieGoHome
}