function DeleteAccount({OnDeleteAccount, OnBackProfile}) {
    return <>
    <form action="" className="layout__main" onSubmit={(event)=> {
        event.preventDefault()
        const password = event.target.password.value
        OnDeleteAccount(password)
    }}>
        <div className="layout__inputs">
            <input type="password" className="input" name="password" placeholder="Password"></input>
        </div>
        <div className="layout__buttons--delete-account layout__buttons">
            <button type="submit" className='button'>DELETE</button>
            <button type='button' className='button' onClick={()=> OnBackProfile()}>BACK PROFILE</button>
        </div>
    </form>
    </>
}

export default DeleteAccount