function SignUp({OnSignUp, OnSignIn}) {
    return <div className="pagelayout">
    <div className="title layout__title">
        <h1>SIGN UP</h1>
    </div>
    <div className="layout__subtitle">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis earum nostrum quis quae accusamus
        </p>
    </div>
    <form action="" className="layout__main" onSubmit={(event) => {
        event.preventDefault()

        const name = event.target.name.value
        // const lastName = event.target.surname.value
        const username = event.target.username.value
        const password = event.target.password.value
        // const checkbox = event.target.checkbox.checked

        OnSignUp(name, username, password)
    }}>
        <div className=" layout__inputs">
            <input type="text" className="input" name="name" placeholder="Name"></input>
            {/* <input type="text" className="input" name="surname" placeholder="Surname"></input> */}
            <input type="email" className="input" name="username" placeholder="Email"></input>
            <input type="password" className="input" name="password" placeholder="Password"></input>
        </div>
        {/* <div className="layout__inputs--check">
            <input type="checkbox" className="checkbox" name="checkbox" id="checkbox"></input>
            <label htmlFor="checkbox" className="checkbox__label">I accept Whatever</label>
        </div> */}
        <div className="layout__buttons">
            <button type="submit" className='button'>SIGN UP</button>
            <p id="p-link">Go to <a className="link" onClick={OnSignIn}>Sign IN</a></p>
        </div>
    </form>
</div>
}

export default SignUp