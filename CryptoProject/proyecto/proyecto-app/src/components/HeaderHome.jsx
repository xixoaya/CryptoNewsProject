function HeaderHome(props) {
    return <>
        <div className="title layout__title">
            <h1>Latest News</h1>
        </div>
        <div className="layout__subtitle">
            <p><strong className="name">{props.name? props.name : 'Name'}</strong> See all the covers from the top newsletters</p>
        </div>
    </>
    
}

export default HeaderHome