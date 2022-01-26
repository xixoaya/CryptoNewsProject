function SignUp({OnSignUp, OnSignIn}) {
    return <div className="pagelayout">
    <div className="title layout__title">
        <h1>SIGN UP</h1>
    </div>
    <div className="layout__subtitle">
        <p>Hello! Please take to seconds to fulfill the form with correct data, you will need it later to get in.
        </p>
    </div>
    <form action="" className="layout__main" onSubmit={(event) => {
        event.preventDefault()

        const name = event.target.name.value
        const username = event.target.username.value
        const password = event.target.password.value

        OnSignUp(name, username, password)
    }}>
        <div className=" layout__inputs">
            <input type="text" className="input" name="name" placeholder="Name"></input>
            <input type="email" className="input" name="username" placeholder="Email"></input>
            <input type="password" className="input" name="password" placeholder="Password"></input>
        </div>

        <div className="layout__buttons">
            <button type="submit" className='button'>SIGN UP</button>
            <p id="p-link">Go to <a className="link" onClick={OnSignIn}>Sign IN</a></p>
        </div>
    </form>
</div>
}

export default SignUp