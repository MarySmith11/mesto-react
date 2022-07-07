import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState([]);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false); 

  const closeAllPopups = () => {
    setEditProfileClick(false); 
    setAddPlaceClick(false); 
    setEditAvatarClick(false);
    setImagePopupOpen(false);
    setSelectedCard([]);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }
  return (
    <>
      <Header />
      <Main onEditProfile={() => { setEditProfileClick(true) }} onAddPlace={() => { setAddPlaceClick(true) }} onEditAvatar={() => { setEditAvatarClick(true) }} onImagePopupOpen={handleCardClick} />
      <Footer />
      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        buttonOnText="Сохранить"
        buttonDisabled={false}
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        >
        <div class="form__text-wrap">
          <input required type="text" name="name" class="form__text form__text_type_name" placeholder="Имя"
          id="name-input" minlength="2" maxlength="40" />
          <span class="form__error name-input-error"></span>
        </div>
        <div class="form__text-wrap">
          <input required type="text" name="profession" class="form__text form__text_type_info" placeholder="О себе"
          id="profession-input" minlength="2" maxlength="200" />
          <span class="form__error profession-input-error"></span>
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
          <div class="form__text-wrap">
          <input required type="text" name="name" class="form__text form__text_type_title-name" placeholder="Название"
          id="place-title-input" minlength="2" maxlength="30" />
          <span class="form__error place-title-input-error"></span>
        </div>
        <div class="form__text-wrap">
          <input required type="url" name="link" class="form__text form__text_type_link"
          placeholder="Ссылка на картинку" id="link-input" />
          <span class="form__error link-input-error"></span>
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
        <div class="form__text-wrap">
          <input required type="url" name="avatar" class="form__text form__text_type_avatar"
          placeholder="Ссылка на картинку" id="avatar-input" />
          <span class="form__error avatar-input-error"></span>
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
