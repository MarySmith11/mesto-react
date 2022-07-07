function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <form action="#" className="form" name={`${props.name}-profile`} novalidate>
                    {props.children}
                    <button type="submit" className='form__button' disabled={props.buttonDisabled}>{props.buttonOnText}</button>
                </form>
                <button type="button" className="popup__close-button" onClick={props.onClose} aria-label="Закрыть"></button>
            </div>
        </div>
    )
}

export default PopupWithForm;