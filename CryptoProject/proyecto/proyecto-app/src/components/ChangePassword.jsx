function ChangePassword({OnUpdatePassword, OnBackProfile}) {
    return <>
        <form action="" className="layout__main" onSubmit={(event)=> {
            event.preventDefault()
            const oldpassword = event.target.oldPassword.value
            const password = event.target.newPassword.value

            OnUpdatePassword(oldpassword, password)
        }}>
            <div className="layout__inputs">
                <input type="password" className="input" name="oldPassword" placeholder="Old Password"></input>
                <input type="password" className="input" name="newPassword" placeholder="New Password"></input>
            </div>
            <div className="layout__buttons layout__buttons--change-pswd">
                <button type="submit" className='button'>UPDATE</button>
                <button type='button' className='button' onClick={()=>OnBackProfile()}>BACK PROFILE</button>
            </div>
        </form>
    </>
}

export default ChangePassword