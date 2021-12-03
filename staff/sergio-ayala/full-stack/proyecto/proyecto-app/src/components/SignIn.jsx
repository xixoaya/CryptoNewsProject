function SignIn({OnSignIn, OnSignUp}) {
    return <div className="pagelayout">
    <div className="title layout__title">
        <h1>SIGN IN</h1>
    </div>
    <div className="layout__subtitle">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis earum nostrum quis quae accusamus
        </p>
    </div>
    <form action="" className="layout__main" onSubmit={(event) => {
        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value

        OnSignIn(username, password)
    }}>
        <div className="layout__inputs">
            <input type="email" className="input" name="username" placeholder="Email"></input>
            <input type="password" className="input" name="password" placeholder="Password"></input>
        </div>
        <div className="layout__buttons">
            <button type="submit" className='button'>SIGN IN</button>
            <p id="p-link">Go to <a className="link" onClick={OnSignUp}>Sign Up</a></p>
        </div>
    </form>
</div>
    
}
export default SignIn