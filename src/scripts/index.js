import '../pages/index.css';
import { openPopup, closePopup, closePopupByClick } from './modal.js';
import { createCard, likeCard, removeCard } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import {
  updateUser,
  getInitialCards,
  getUser,
  addNewCard,
  updateAvatar,
  handleError,
} from './api.js';
// DOM узлы
const cardsContainer = document.querySelector('.places__list');
//
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
const popups = document.querySelectorAll('.popup');
// Параметры формы редактирования профиля
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector(
  '.popup__input_type_description'
);
const popupList = Array.from(document.querySelectorAll('.popup'));
const profileImage = document.querySelector('.profile__image');
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddProfile = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formNewPlace = document.querySelector('form[name="new-place"]');
const placeNameInput = formNewPlace.querySelector(
  '.popup__input_type_card-name'
);
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeNewAvatar = document.querySelector('.popup_type_avatar');
const formNewAvatar = document.querySelector('form[name="edit-avatar"]');
const avatarInput = formNewAvatar.querySelector('.popup__input_type_avatar');
const profileOverlay = document.querySelector('.profile__overlay');
//Image popup
const cardImagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const name = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');
// Текущий юзер
let currentUser;

// Получаем данные карточек и пользователя с сервера
Promise.all([getInitialCards(), getUser()])
  .then(([cards, user]) => {
    name.textContent = user.name;
    description.textContent = user.about;
    profileImage.src = user.avatar;
    currentUser = user;

    cards.forEach((card) => {
      const newCard = createCard(
        card,
        removeCard,
        openImagePopup,
        likeCard,
        user._id
      );
      cardsContainer.append(newCard);
    });
  })
  .catch(handleError);

// Событие - нажатие кнопки редактирования профиля, открытие формы
btnEditProfile.addEventListener('click', () => {
  nameInput.value = name.textContent;
  jobInput.value = description.textContent;
  clearValidation(formEditProfile, validationConfig);
  openPopup(popupTypeEdit);
});

// Событие - нажатие кнопки добавления карточки
btnAddProfile.addEventListener('click', () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openPopup(popupTypeNewCard);
});

///////////////////////////////////////////////////////////////////////
// Изменение аватара
function submitAvatarForm(evt) {
  evt.preventDefault();
  const avatarValue = avatarInput.value;

  const saveButton = formNewAvatar.querySelector('.popup__button');
  const initialTextBtn = saveButton.textContent;
  saveButton.textContent = 'Сохранение...';
  saveButton.classList.add('saving');

  updateAvatar(avatarValue)
    .then((avatarData) => {
      profileImage.src = avatarData.avatar;
    })
    .catch(handleError)
    .finally(() => {
      saveButton.textContent = initialTextBtn;
      saveButton.classList.remove('saving');
      closePopup(popupTypeNewAvatar);
    });
}
formNewAvatar.addEventListener('submit', submitAvatarForm);

////////////////////////////////////////////////////////////////////////////////////////////////

// функция открытия попапа с изображением:

function openImagePopup(cardLink, cardName) {
  popupImage.src = cardLink;
  popupImage.alt = cardName;
  popupCaption.textContent = cardName;

  openPopup(cardImagePopup);
}

// обработка кликов по кнопке  добавления карточки:

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_new-card');

cardAddButton.addEventListener('click', () => {
  formCard.reset(); // Сбросить значения полей формы
  clearValidation(formCard, validationConfig); // Очистить ошибки валидации
  openPopup(cardAddPopup);
});

////////////////////////////////////////////////////////////////////////////////////

// Добавление новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = placeNameInput.value;
  const linkValue = inputLink.value;

  const saveButton = formNewPlace.querySelector('.popup__button');
  const initialTextBtn = saveButton.textContent;
  saveButton.textContent = 'Сохранение...';
  saveButton.classList.add('saving');

  addNewCard(nameValue, linkValue)
    .then((newCardData) => {
      cardsContainer.prepend(
        createCard(
          newCardData,
          removeCard,
          openImagePopup,
          likeCard,
          currentUser._id
        )
      );
      clearValidation(formNewPlace, validationConfig);
      closePopup(popupTypeNewCard);
    })
    .catch(handleError)
    .finally(() => {
      saveButton.textContent = initialTextBtn;
      saveButton.classList.remove('saving');
      closePopup(popupTypeNewCard);
    });
}

formNewPlace.addEventListener('submit', handleCardFormSubmit);

///////////////////////////////////////////////////////////////////////////////

// обработчик события submit при отправке формы редактирования профиля
// Функция замены имени и описания на HTML-странице данными из формы.
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // Заполняем форму редактирования значениями из HTML-страницы
  name.textContent = nameInput.value;
  description.textContent = jobInput.value;

  const saveButton = formEditProfile.querySelector('.popup__button');
  const initialTextBtn = saveButton.textContent;
  saveButton.textContent = 'Сохранение...';
  saveButton.classList.add('saving');

  updateUser(nameInput.value, jobInput.value)
    .then((profileData) => {
      name.textContent = user.name;
      description.textContent = user.about;
      profileAvatar.src = user.avatar;
    })
    .catch(handleError)
    .finally(() => {
      saveButton.textContent = initialTextBtn;
      saveButton.classList.remove('saving');
      closePopup(popupTypeEdit);
    });
}
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//=============================================

const formCard = cardAddPopup.querySelector('.popup__form');
const inputLink = formCard.querySelector('.popup__input_type_url');
//закрытие любого попапа кликом, по кнопке, или оверлею:
popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByClick);
});

// открываем попап для изменения аватара

profileOverlay.addEventListener('click', () => openPopup(popupTypeNewAvatar));

// Включение валидации форм
enableValidation(validationConfig);
