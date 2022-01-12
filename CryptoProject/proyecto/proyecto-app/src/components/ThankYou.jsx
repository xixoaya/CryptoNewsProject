function ThankYou({OnSignIn}) {
    return <div className="pagelayout">
    <div className="title layout__title">
        <h1>Thanks!</h1>
    </div>
    <div className="layout__subtitle">
        <p>we have correctly receive your info, now just log in and enjoy
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