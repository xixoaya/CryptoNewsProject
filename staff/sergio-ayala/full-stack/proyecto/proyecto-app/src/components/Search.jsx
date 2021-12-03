function Search({onSearch, query}) {

    return <form className="layout__buttons--iline" onSubmit={event => {
        event.preventDefault()

        const query = event.target.query.value

        onSearch(query)
    }}>
    <input type="text" id='query' className="input" name="query" placeholder="Car Query" defaultValue={query? query:''}></input>
    <button className='button--small' type="submit">{'🔍'}</button>
    </form>
    
}

export default Search