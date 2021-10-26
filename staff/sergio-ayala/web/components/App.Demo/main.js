// views

var landing = document.querySelector('.landing')
var signIn = document.querySelector('.sign-in')
var signUp = document.querySelector('.sign-up')
var thankYou = document.querySelector('.thank-you')
var home = document.querySelector('.home')
var changePassword = document.querySelector('.change-pswd')
var deleteAccount = document.querySelector('.delete-account')
var viewProfile = document.querySelector('.view-profile')

var token
var webName


// PAGINA LANDING
// BOTONES LANDING

var landingButtons = landing.querySelectorAll('button')

var landingSingInButton = landingButtons[0]
var landingSingUpButton = landingButtons[1]

landingSingInButton.onclick = function () {
    landing.classList.add('container--hide')
    signIn.classList.remove('container--hide')
}

landingSingUpButton.onclick = function () {
    landing.classList.add('container--hide')
    signUp.classList.remove('container--hide')
}

// PAGINA SIGN IN
// BOTONES SIGN IN

var signInButtonSignIn = signIn.querySelector('button')
var signInLinkSignUp = signIn.querySelector('a')

signInLinkSignUp.onclick = function (event) {
    event.preventDefault()

    signIn.classList.add('container--hide')
    signUp.classList.remove('container--hide')
}

var signInForm = signIn.querySelector('.sign-in__form')


signInForm.onsubmit = function (event) {
    event.preventDefault()

    var inputs = signInForm.querySelectorAll('input')

    var username = inputs[0].value
    var password = inputs[1].value

    try {
        signInUser(username, password, function (error, _token) {
            if (error) { return alert(error.message) }

            token = _token
            signInForm.reset()

            try {
                retrieveUser(token, function (error, user) {
                    if (error) { return alert(error.message) }

                    webName = user.name
                    signIn.classList.add('container--hide')

                    var nameSpan = home.querySelector('.name')

                    nameSpan.innerText = webName

                    home.classList.remove('container--hide')

                })
            } catch (error) { alert(error.message) }
        })
    } catch (error) { alert(error.message) }
}

// PAGINA SIGN UP
// BOTONES SIGN UP

var signUpButtonSignUp = signUp.querySelector('button')
var signUpLinkSignIn = signUp.querySelector('a')

signUpLinkSignIn.onclick = function (event) {
    event.preventDefault()

    signUp.classList.add('container--hide')
    signIn.classList.remove('container--hide')
}

var signUpForm = signUp.querySelector('.sign-up__form')

signUpForm.onsubmit = function (event) {
    event.preventDefault()

    var inputs = signUpForm.querySelectorAll('input')

    var name = inputs[0].value
    var lastName = inputs[1].value
    var username = inputs[2].value
    var password = inputs[3].value
    var checkbox = inputs[4]

    try {
        signUpUser(name, lastName, username, password, checkbox, function (error) {
            if (error) { return alert(error.message) }

            signUpForm.reset()

            signUp.classList.add('container--hide')

            thankYou.classList.remove('container--hide')

        })
    } catch (error) {
        alert(error.message)
    }
}



// PAGINA THANK YOU
// BOTONES THANK YOU

var thankYouButon = thankYou.querySelector('button')

thankYouButon.onclick = function (event) {
    event.preventDefault()

    thankYou.classList.add('container--hide')
    signIn.classList.remove('container--hide')
}

// PAGINA HOME
// BOTONES HOME
var homeButtons = home.querySelectorAll('button')
var homeViewButton = homeButtons[0]
var homeUpadateButton = homeButtons[1]
var homeChangePasswordButton = homeButtons[2]
var homeSignOutButton = homeButtons[3]
var homeDeleteAccountButton = homeButtons[4]

homeSignOutButton.onclick = function () {

    home.classList.add('container--hide')
    signIn.classList.remove('container--hide')
}

homeChangePasswordButton.onclick = function () {

    home.classList.add('container--hide')
    var nameSpan = changePassword.querySelector('.name')
    nameSpan.innerText = webName
    changePassword.classList.remove('container--hide')
}

homeDeleteAccountButton.onclick = function () {

    home.classList.add('container--hide')
    var nameSpan = deleteAccount.querySelector('.name')
    nameSpan.innerText = webName
    deleteAccount.classList.remove('container--hide')
}

homeViewButton.onclick = function () {

    home.classList.add('container--hide')
    var nameSpan = viewProfile.querySelector('.name')
    nameSpan.innerText = webName
    viewProfile.classList.remove('container--hide')
}

// PAGINA CHANGE PASSWORD
// BOTONES CHANGE PASSWORD

var changePasswordButtons = changePassword.querySelectorAll('button')

var changePasswordUpdateButton = changePasswordButtons[0]
var changePasswordBackButton = changePasswordButtons[1]

changePasswordBackButton.onclick = function (event) {
    event.preventDefault()

    changePassword.classList.add('container--hide')
    changePasswordForm.reset()
    home.classList.remove('container--hide')
}

var changePasswordForm = changePassword.querySelector('form')

changePasswordForm.onsubmit = function (event) {
    event.preventDefault()

    var inputs = changePasswordForm.querySelectorAll('input')

    var oldPassword = inputs[0].value
    var newPassword = inputs[1].value

    try {
        updatePassword(oldPassword, newPassword, function (error) {
            if (error) { return alert(error.message) }

            changePassword.classList.add('container--hide')
            changePasswordForm.reset()
            home.classList.remove('container--hide')
        })
    } catch (error) {
        return alert(error.message)
    }
}

// PAGINA DELETE ACCOUNT
// BOTONES DELETE ACCOUNT

var deleteAccountButtons = deleteAccount.querySelectorAll('button')
var deleteAccountDeleteButton = deleteAccountButtons[0]
var deleteAccountBackButton = deleteAccountButtons[1]
var deleteAccountForm = deleteAccount.querySelector('.delete-account__form')

deleteAccountBackButton.onclick = function (event) {
    event.preventDefault()

    deleteAccount.classList.add('container--hide')
    deleteAccountForm.reset()
    home.classList.remove('container--hide')
}

deleteAccountForm.onsubmit = function (event) {
    event.preventDefault()

    var passwordInput = deleteAccountForm.querySelector('input')
    var Password = passwordInput.value

    try {
        unregisterUser(Password, function (error) {
            if (error) { return alert(error.message) }
            deleteAccount.classList.add('container--hide')
            deleteAccountForm.reset()
            landing.classList.remove('container--hide')
        })
    } catch (error) {
        return alert(error.message)
    }
}

// PAGINA VIEW PROFILE
// BOTONES VIEW PROFILE

var viewProfileButtons = viewProfile.querySelectorAll('button')
var viewProfileEditButton = viewProfileButtons[0]
var viewProfileBackButton = viewProfileButtons[1]

viewProfileBackButton.onclick = function () {
    viewProfile.classList.add('container--hide')
    home.classList.remove('container--hide')
}

