// Logics
function signUpUser(name, lastName, username, password, checkbox, callback) {
    if (!name.length) throw new Error ('name is empty')
    if (!lastName.length) throw new Error ('Last name is empty')
    if (!username.length) throw new Error ('username is empty')
    if (!password.length) throw new Error ('password is empty')
    if (!checkbox.checked) throw new Error ('you have to accept terms')

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        if (status === 409 || status === 400) {
            var response = JSON.parse(xhr.responseText)
            var message = response.error
            callback(new Error(message))
        }

        if (status === 201) {
            callback(null)
        }
    }
    var user = {
        name: name,
        lastName: lastName,
        username: username,
        password: password,
        termsAccepted: checkbox
    }

    xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(JSON.stringify(user))
}




// views

var landing = document.querySelector('.landing')
var signIn = document.querySelector('.sign-in')
var signUp = document.querySelector('.sign-up')
var thankYou = document.querySelector('.thank-you')
var home = document.querySelector('.home')
var changePassword = document.querySelector('.change-pswd')
var deleteAccount = document.querySelector('.delete-account')

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

    var username_ = inputs[0].value
    var password_ = inputs[1].value

    var user = {
        username: username_,
        password: password_
    }

    if (!username_.length) return alert('username is empty')
    if (!password_.length) return alert('password is empty')

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        if (status === 401) return alert('wrong credentials')

        if (status === 200) {
            var response = xhr.responseText

            token = response.slice(10, -2)

            var xhr2 = new XMLHttpRequest

            xhr2.onload = function () {
                var response = xhr2.responseText

                webName = response.slice(9, response.indexOf(',') - 1)

                signInForm.reset()

                signIn.classList.add('container--hide')

                var nameSpan = home.querySelector('.name')

                nameSpan.innerText = webName

                home.classList.remove('container--hide')
            }

            xhr2.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')

            xhr2.setRequestHeader('Authorization', 'Bearer ' + token)

            xhr2.send()
        }
    }

    xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users/auth')

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(JSON.stringify(user))

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

    // if (!name.length) return alert('name is empty')
    // if (!lastName.length) return alert('Last name is empty')
    // if (!username.length) return alert('username is empty')
    // if (!password.length) return alert('password is empty')
    // if (!checkbox.checked) return alert('you have to accept terms')

    // var user = {
    //     name: name,
    //     lastName: lastName,
    //     username: username,
    //     password: password,
    //     termsAccepted: checkbox
    // }

    try {
    signUpUser(name, lastName, username, password, checkbox, function (error) {
        if (error) { return alert (error.message)}

        signUpForm.reset()

        signUp.classList.add('container--hide')

        thankYou.classList.remove('container--hide')

    })
    } catch (error) {
        alert(error.message)
    }

    // var xhr = new XMLHttpRequest

    // xhr.onload = function () {
    //     var status = xhr.status

    //     if (status === 409) return alert('user already exists')

    //     if (status === 201) {
    //         signUpForm.reset()

    //         signUp.classList.add('container--hide')

    //         thankYou.classList.remove('container--hide')
    //     }
    // }

    // xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    // xhr.setRequestHeader('Content-Type', 'application/json')

    // xhr.send(JSON.stringify(user))
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
var homeUpadateButton = homeButtons[0]
var homeChangePasswordButton = homeButtons[1]
var homeSignOutButton = homeButtons[2]
var homeDeleteAccountButton = homeButtons[3]

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

    var oldPassword_ = inputs[0].value
    var newPassword_ = inputs[1].value

    if (!oldPassword_.length) return alert('Old password is empty')
    if (!newPassword_.length) return alert('New password is empty')

    var user = {
        oldPassword: oldPassword_,
        password: newPassword_
    }

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        if (status === 400 || status === 401) {
            var response = xhr.responseText
            var message = response.slice(10, -2)
            return alert(message)
        }
        if (status === 204) {
            changePassword.classList.add('container--hide')
            changePasswordForm.reset()
            home.classList.remove('container--hide')
        }
    }
    xhr.open('PATCH', 'https://b00tc4mp.herokuapp.com/api/v2/users')
    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(user))
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
    var Password_ = passwordInput.value

    if (!Password_.length) return alert('Password is empty')

    var user = {
        password : Password_
    }

    xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        if (status === 400 || status === 401) {
            var response = xhr.responseText
            var message = response.slice(10, -2)
            return alert(message)
        }
        if (status === 204) {
            deleteAccount.classList.add('container--hide')
            deleteAccountForm.reset()
            landing.classList.remove('container--hide')
        }
    }
    xhr.open('DELETE', 'https://b00tc4mp.herokuapp.com/api/v2/users')
    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(user))

}