import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarClick] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false); 

  const closeAllPopups = () => {
    setIsEditProfileClick(false); 
    setIsAddPlaceClick(false); 
    setIsEditAvatarClick(false);
    setIsImagePopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  return (
    <>
      <Header />
      <Main onEditProfile={() => { setIsEditProfileClick(true) }} onAddPlace={() => { setIsAddPlaceClick(true) }} onEditAvatar={() => { setIsEditAvatarClick(true) }} onImagePopupOpen={handleCardClick} />
      <Footer />
      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        buttonOnText="Сохранить"
        buttonDisabled={false}
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        >
        <div className="form__text-wrap">
          <input required type="text" name="name" className="form__text form__text_type_name" placeholder="Имя"
          id="name-input" minLength="2" maxLength="40" />
          <span className="form__error name-input-error"></span>
        </div>
        <div className="form__text-wrap">
          <input required type="text" name="profession" className="form__text form__text_type_info" placeholder="О себе"
          id="profession-input" minLength="2" maxLength="200" />
          <span className="form__error profession-input-error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm
        title="Новое место"
        name="place"
        buttonOnText="Создать"
        buttonDisabled={false}
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        >
          <div className="form__text-wrap">
          <input required type="text" name="name" className="form__text form__text_type_title-name" placeholder="Название"
          id="place-title-input" minLength="2" maxLength="30" />
          <span className="form__error place-title-input-error"></span>
        </div>
        <div className="form__text-wrap">
          <input required type="url" name="link" className="form__text form__text_type_link"
          placeholder="Ссылка на картинку" id="link-input" />
          <span className="form__error link-input-error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        buttonOnText="Сохранить"
        buttonDisabled={false}
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        >
        <div className="form__text-wrap">
          <input required type="url" name="avatar" className="form__text form__text_type_avatar"
          placeholder="Ссылка на картинку" id="avatar-input" />
          <span className="form__error avatar-input-error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm
        title="Вы уверены?"
        name="confirm"
        buttonOnText="Да"
        onClose={closeAllPopups}
        buttonOnClose={false}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>
    </>
  );
}

export default App;
