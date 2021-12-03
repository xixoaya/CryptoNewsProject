function ThankYou({OnSignIn}) {
    return <div className="pagelayout">
    <div className="title title--font-height layout__title">
        <h1>Gracias Por Registrarte</h1>
    </div>
    <div className="layout__subtitle">
        <p>Ve a SIGN IN para acceder a la home con tus credenciales.
        </p>
    </div>
    <form action="" className="layout__main">

        <div className="layout__buttons">
            <button className='button' onClick={OnSignIn}> GO SIGN IN</button>
        </div>
    </form>
</div>
    
}

export default ThankYou