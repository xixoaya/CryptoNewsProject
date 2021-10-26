// data

var arrUsers = []

var myCollection = new UsersCollection

// views

var landing = document.querySelector('.landing')
var signIn = document.querySelector('.sign-in')
var signUp = document.querySelector('.sign-up')
var thankYou = document.querySelector('.thank-you')
var home = document.querySelector('.home')

// PAGINA LANDING
// BOTONES LANDING

var landingButtons = landing.querySelectorAll('button')

var landingSingInButton = landingButtons[0]
var landingSingUpButton = landingButtons[1]

landingSingInButton.onclick = function() {
    landing.classList.add('container--hide')
    signIn.classList.remove('container--hide')
}

landingSingUpButton.onclick = function() {
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

    var email = inputs[0].value
    var password = inputs[1].value

    if (!email.length) return alert('email is empty')
    if (!password.length) return alert('password is empty')

    var user = new User('', email, '', password)
    var userLogIn = myCollection.signIn(user);
    
    if(userLogIn.name === undefined) alert("Este usuario no está registrado");
    else {
        signIn.classList.add('container--hide')
        home.classList.remove('container--hide')
    }
    signInForm.reset();

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
    var email = inputs[1].value
    var username = inputs[2].value
    var password = inputs[3].value
    var checkbox = inputs[4]

    if (!name.length) return alert('name is empty')
    if (!email.length) return alert('email is empty')
    if (!username.length) return alert('username is empty')
    if (!password.length) return alert('password is empty')
    if (!checkbox.checked) return alert('you have to accept terms')

    var user = new User(name, email, username, password) 

    var userSignUp = myCollection.signUp(user);
    if(userSignUp.name === undefined) alert("Ya existe un Usuario con este email");
    else {
        signUp.classList.add('container--hide')
        thankYou.classList.remove('container--hide')
    }
    signUpForm.reset();

    // var user = {
    //     name: name,
    //     email: email,
    //     username: username,
    //     password: password,
    // }

    // users.push(user)

    // signUpForm.reset()

    // signUp.classList.add('container--hide')
    // thankYou.classList.remove('container--hide')
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

var homeButon = home.querySelector('button')

homeButon.onclick = function (event) {
    event.preventDefault()

    home.classList.add('container--hide')
    landing.classList.remove('container--hide')
}