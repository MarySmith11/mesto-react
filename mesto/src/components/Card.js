function Card(props) {

    function handleClick() { 
        props.onCardClick(props.card); 
      } 

    return(
        <article className="cards__element">
          <img src={props.card.link} alt={props.card.name} className="cards__picture" onClick={handleClick} />
          <button type="button" className="cards__basket-button" aria-label="Удалить"></button>
          <div className="cards__info">
            <h2 className="cards__title">{props.card.name}</h2>
            <div className="cards__like">
              <button type="button" className="cards__like-button" aria-label="Мне нравится"></button>
              <p className="cards__like-counter">{props.card.likes.length}</p>
            </div>
          </div>
        </article>
    )
}

export default Card;