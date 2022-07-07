function Card(props) {

    function handleClick() { 
        props.onCardClick(props.card); 
      } 

    return(
        <article class="cards__element">
          <img src={props.card.link} alt={props.card.name} class="cards__picture" onClick={handleClick} />
          <button type="button" class="cards__basket-button" aria-label="Удалить"></button>
          <div class="cards__info">
            <h2 class="cards__title">{props.card.name}</h2>
            <div class="cards__like">
              <button type="button" class="cards__like-button" aria-label="Мне нравится"></button>
              <p class="cards__like-counter">{props.card.likes.length}</p>
            </div>
          </div>
        </article>
    )
}

export default Card;