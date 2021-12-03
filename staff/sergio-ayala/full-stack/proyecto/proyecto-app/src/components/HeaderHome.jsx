function HeaderHome(props) {
    return <>
    <div className="title layout__title">
        <h1>RELAX</h1>
    </div>
    <div className="layout__subtitle">
        <p><strong className="name">{props.name? props.name : 'Name'}</strong> YOU ARE AT HOME
        </p>
    </div>
    </>
    
}

export default HeaderHome