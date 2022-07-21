import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import apiInstance from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarClick] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    apiInstance.getUserInfo().then((res) => {
      setCurrentUser(res);
    })
  }, []);

  const closeAllPopups = () => {
    setIsEditProfileClick(false);
    setIsAddPlaceClick(false);
    setIsEditAvatarClick(false);
    setIsImagePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const handleUpdateUser = (userData) => {
    apiInstance.updateUserProfile(userData).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userData) {
    apiInstance.updateUserAvatar(userData.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });

  }

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    apiInstance.getInitialCards().then((res) => {
      setCards(res);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const method = isLiked ? 'DELETE' : 'PUT';
    // Отправляем запрос в API и получаем обновлённые данные карточки
    apiInstance.likeAction(card._id, method).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    apiInstance.removeCard(card._id).then((newCard) => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
  }

  function handleAddPlaceSubmit(newCard) {
    apiInstance.addNewCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main cards={cards} onEditProfile={() => { setIsEditProfileClick(true) }} onAddPlace={() => { setIsAddPlaceClick(true) }} onEditAvatar={() => { setIsEditAvatarClick(true) }} onImagePopupOpen={handleCardClick} onCardDelete={handleCardDelete} onCardLike={handleCardLike} />
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
      <PopupWithForm
        title="Вы уверены?"
        name="confirm"
        buttonOnText="Да"
        onClose={closeAllPopups}
        buttonOnClose={false}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
    </CurrentUserContext.Provider>
  );
}

export default App;
