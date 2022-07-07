import React from "react";
import apiInstance from '../utils/api';
import Card from "./Card";

function Main(props) {
    const [userName, setUserName] = React.useState('Captain Flint');
    const [userDescription, setUserDescription] = React.useState('Marinero');
    const [userAvatar, setUserAvatar] = React.useState('https://img.desktopwallpapers.ru/rocks/pics/wide/1920x1200/27640f370156a0e0ae3ee9608fc8480a.jpg');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        apiInstance.getUserInfo().then((res) => {
            setUserName(res.name);
            setUserDescription(res.about);
            setUserAvatar(res.avatar);
        }).catch((err) => {
            console.log(err);
        });

        apiInstance.getInitialCards().then((res) => {
            setCards(res);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-wrap" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={userAvatar} alt="аватар" />
                </div>
                <div className="profile__info">
                    <div className="profile__name-wrap">
                        <h1 className="profile__name">{userName}</h1>
                        <button onClick={props.onEditProfile} type="button" className="profile__edit-button" aria-label="Редактировать"></button>
                    </div>
                    <p className="profile__profession">{userDescription}</p>
                </div>
                <button onClick={props.onAddPlace} type="button" className="profile__add-button" aria-label="Добавить"></button>
            </section>

            <section className="cards">
                {cards.map((card, i) => (
                    <Card key={i} card={card} onCardClick={props.onImagePopupOpen} />
                ))}
            </section>
        </main>
    )
}

export default Main;