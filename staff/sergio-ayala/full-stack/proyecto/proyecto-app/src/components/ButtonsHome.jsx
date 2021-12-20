import React from "react"


function ButtonsHome({OnViewProfile, OnViewHome, OnViewSearch, view}) {

    return <>
        <div className="layout__buttons--home-low ">
        <button className={ view === 'home' ? 'button--small__dark' : 'button--small'} type='button' onClick={() => OnViewHome()}>{'🧡'}</button>
        <button className={ view === 'search' ? 'button--small__dark' : 'button--small'} type='button' onClick={() => OnViewSearch()}>{'🛒'}</button>
        <button className={ view === 'profile' ? 'button--small__dark' : 'button--small'} type='button' onClick={() => OnViewProfile()}>{'😃'}</button>
        {/* <button className='button' onClick={() => props.OnSignOut()}>SIGN OUT</button> */}
        </div>
    </>
}

export default ButtonsHome