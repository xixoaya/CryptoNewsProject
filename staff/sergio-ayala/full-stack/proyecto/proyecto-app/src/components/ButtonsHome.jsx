function ButtonsHome({OnViewProfile, OnViewFavs, OnViewCart}) {
    return <div className="layout__buttons--home-low ">
    <button className='button--small' type='button' onClick={() => OnViewFavs()}>{'🧡'}</button>
    <button className='button--small' type='button' onClick={() => OnViewCart()}>{'🛒'}</button>
    <button className='button--small' type='button' onClick={() => OnViewProfile()}>{'😃'}</button>
    {/* <button className='button' onClick={() => props.OnSignOut()}>SIGN OUT</button> */}
</div>
}

export default ButtonsHome