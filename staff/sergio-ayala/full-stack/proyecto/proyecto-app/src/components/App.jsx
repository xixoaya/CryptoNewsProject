import { useState, useEffect } from 'react'
import {
    signUpUser,
    signInUser,
    retrieveUser,
} from '../logic'
import Landing from './Landing'
import SignUp from './SignUp'
import ThankYou from './ThankYou'
import SignIn from './SignIn'
import Home from './Home'
import Spinner from './Spinner'
import Modal from './Modal'
import AppTopBar from './AppTopBar'



function App() {

    const [view, setView] = useState(sessionStorage.token ? '' : 'landing')
    const [name, setName] = useState(null)
    const [spinner, setSpinner] = useState(sessionStorage.token ? true : false)
    const [modal, setModal] = useState(null)
    const [level, setLevel] = useState('error')


    useEffect(() => {
        const { token } = sessionStorage

        if (token) {
            try {
                retrieveUser(token, (error, user) => {
                    if (error) {
                        showModal(error.message)
                        deleteTokenAndLanding()

                    } else {
                        var name = user.name

                        setName(name)
                        setView('home')
                        setSpinner(false)
                    }
                })
            } catch ({message}) {
                showModal(message, 'warn')
                deleteTokenAndLanding()
            }
        }
    }, [])

    const deleteTokenAndSignOut = () => {
        showModal(`Ok ${name} see you soon!`, 'success')
        delete sessionStorage.token
        goToSignIn()
    }

    const deleteTokenAndLanding = () => {
        delete sessionStorage.token
        goToLanding()
        setSpinner(false)
    }

    const goToSignUp = () => setView('signup')
    const goToSignIn = () => setView('signin')
    const goToLanding = () => setView('landing')
    const goToThankYou = () => setView('thank-you')
    const goToHome = () => setView('home')

    const showSpinner = () => setSpinner(true)
    const hideSpinner = () => setSpinner(false)

    const closeModal = () => setModal(null)
    const showModal = (message, level = 'error') => {
        setModal(message)
        setLevel(level)
    }


    const signUp = (name, username, password) => {
        showSpinner()
        try {
            signUpUser(name, username, password, (error) => {
                if (error) {
                    showModal(error.message)
                    hideSpinner()

                } else {
                    goToThankYou()
                    hideSpinner()
                    showModal(`Nice to meet you ${name}!`, 'success')
                }

            })
        } catch ({message}) {
            showModal(message, 'warn')
            hideSpinner()
        }
    }

    const signIn = (username, password) => {
        showSpinner()
        try {
            signInUser(username, password, (error, token) => {
                if (error) {
                    showModal(error.message)
                    hideSpinner()
                } else {
                    sessionStorage.token = token

                    try {
                        retrieveUser(sessionStorage.token, (error, user) => {
                            if (error) {
                                showModal(error.message)
                                hideSpinner()
                            } else {
                                var name = user.name
                                setName(name)
                                setView('home')
                                setSpinner(false)
                                showModal(`Nice to see you ${name}`, 'success')
                            }
                        })
                    } catch ({message}) {
                        showModal(message, 'warn')
                        hideSpinner()
                    }
                }
            })
        } catch ({message}) {
            showModal(message, 'warn')
            hideSpinner()
        }
    }


    return <div className="app-bg">
        <AppTopBar 
        Username={name} View={view} 
         OnSignIn={goToSignIn} 
        //OnGoHome={goToHome}
        // OnGoLanding={goToLanding}    
        />
        {view === 'landing' && 
            <Landing 
                OnSignIn={goToSignIn} 
                OnSignUp={goToSignUp}  
                OnStartFlow={showSpinner}
                OnEndFlow={hideSpinner}
                OnShowModal={showModal}
            ></Landing>}

        {view === 'signup' && <SignUp OnSignIn={goToSignIn} OnSignUp={signUp} ></SignUp>}
  
        {view === 'thank-you' && <ThankYou  OnSignIn={goToSignIn}  ></ThankYou>}

        {view === 'signin' && <SignIn OnSignUp={goToSignUp} OnSignIn={signIn} ></SignIn>}

        {view === 'home' &&
            <Home
                Username={name}
                OnSignOut={deleteTokenAndSignOut}
                OnDelete={deleteTokenAndLanding}
                OnStartFlow={showSpinner}
                OnEndFlow={hideSpinner}
                OnShowModal={showModal}
            ></Home>}

        {spinner && <Spinner></Spinner>}

        {modal && <Modal onGetIt={closeModal} message={modal} level={level} ></Modal>}

    </div>
}

export default App