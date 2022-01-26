import './Modal.css'

function Modal ({level, message, onGetIt}) {

    const classNametitle = `modal__tittle ${level ? `modal__tittle--${level}` : ''}`
    const classNamepanel = `modal__panel ${level ? `modal__panel--${level}` : ''}`
    const classNamebutton = `modal__button ${level ? `modal__button--${level}` : ''}`

    
        return <>
            <div className='modal'>
                <div className={classNamepanel}>
                    <h1 className={classNametitle}>
                        {level === 'error' && 'Error!'}
                        {level === 'warn' && 'Upss..'}
                        {level === 'success' && 'Great!'}
                    </h1>
                    <p className='modal__message'>{message}</p>
                    <button className={classNamebutton} onClick={onGetIt}>Get it</button>
                </div>
            </div>
        </>
    
}

export default Modal