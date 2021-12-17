module.exports = {
    authenticateUser: require('./authenticate-user'),
    registerUser: require('./register-user'),
    unregisterUser: require('./unregister-user'),
    retrieveUser: require('./retrieve-user'),
    modifyUser: require('./modify-user'),

    modifyBulletin: require('./modify-bulletin'),
    retrieveBulletins: require('./retrieve-bulletins'),
    retrieveBulletinDetail: require('./retrieve-bulletin-detail'),
    retrieveHomeLeads: require('./retrieve-home-leads'),
    retrieveSearchedBulletins: require('./retrieve-searched-bulletins')

}