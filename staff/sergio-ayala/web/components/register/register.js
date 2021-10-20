document.body.classList.add('register-img')

var form = document.createElement('form')
form.classList.add('form')

document.body.append(form)

var titleResgister = document.createElement('h1')
titleResgister.classList.add('formtitle')
titleResgister.innerText = '------- Register -------'

var subTitleRegister = document.createElement('p')
subTitleRegister.classList.add('formsubtitle')
subTitleRegister.innerText = 'Hello, please fullfill your info'

var formInputs = document.createElement('div')
formInputs.classList.add('forminput-register')

form.append(titleResgister, subTitleRegister, formInputs)

var inputFirstName = document.createElement('input')
inputFirstName.classList.add('forminput')
inputFirstName.type = 'text'
inputFirstName.placeholder = 'First Name'

var inputLastName = document.createElement('input')
inputLastName.classList.add('forminput')
inputLastName.type = 'text'
inputLastName.placeholder = 'Last Name'

var inputEmail = document.createElement('input')
inputEmail.classList.add('forminput')
inputEmail.type = 'email'
inputEmail.placeholder = 'Email'

var inputPassword = document.createElement('input')
inputPassword.classList.add('forminput')
inputPassword.type = 'password'
inputPassword.placeholder = 'Password'

var inputConfirmPassword = document.createElement('input')
inputConfirmPassword.classList.add('forminput')
inputConfirmPassword.type = 'password'
inputConfirmPassword.placeholder = 'Confirm Password'

formInputs.append(inputFirstName, inputLastName, inputEmail, inputPassword, inputConfirmPassword)

var terms = document.createElement('div')
terms.classList.add('formterms')

form.append(terms)

var inputTerms = document.createElement('input')
inputTerms.classList.add('formcheckbox')
inputTerms.type = 'checkbox'

var labelTerms = document.createElement('label')
labelTerms.classList.add('form__label')
labelTerms.innerText = 'I accept the'
labelTerms.htmlFor = ''

terms.append(inputTerms, labelTerms)

var linkTerms = document.createElement('a')
linkTerms.classList.add('link')
linkTerms.href = 'https://policies.google.com/terms?hl=en-US'
linkTerms.innerText = 'Terms of use'

var linkPrivacy = document.createElement('a')
linkPrivacy.classList.add('link')
linkPrivacy.href = 'https://policies.google.com/privacy?hl=es'
linkPrivacy.innerText = 'Privacy Policy'

labelTerms.append(linkTerms, linkPrivacy)

var button = document.createElement('button')
button.classList.add('button')
button.innerText = 'Register Now'

form.append(button)