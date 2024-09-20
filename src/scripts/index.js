import '../pages/index.css';
import { initialCards } from './cards.js';
import { openPopup, closePopup } from './modal.js';
import { createCard, likeCard, removeCard } from './card.js';

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const card = createCard(
    item.link,
    item.name,
    removeCard,
    likeCard,
    openImagePopup
  );
  cardList.append(card);
});

// функция открытия попапа с изображением:
function openImagePopup(evt) {
  const cardImagePopup = document.querySelector('.popup_type_image');
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openPopup(cardImagePopup);
}

// обработка кликов по кнопке  добавления карточки:

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_new-card');

cardAddButton.addEventListener('click', () => {
  openPopup(cardAddPopup);
});

//закрытие любого попапа кликом, по кнопке, или оверлею:

const popups = document.querySelectorAll('.popup');

popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target === item) {
      closePopup(item);
    }
  });
});

// обработка кликов по кнопке редактирования профиля:

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');

profileEditButton.addEventListener('click', () => {
  openPopup(profileEditPopup);
  fillEditFormFields();
});

// функция заполнения полей формы в попапе редактирования профиля текущими значениями:

function fillEditFormFields() {
  const formEditProfile = document.forms['edit-profile'];
  const inputName = formEditProfile.elements.name;
  const inputDescription = formEditProfile.elements.description;

  const name = document.querySelector('.profile__title').textContent;
  const description = document.querySelector(
    '.profile__description'
  ).textContent;

  inputName.value = name;
  inputDescription.value = description;
}

///// ==========================================================

// обработчик события submit при отправке формы редактирования профиля

const formProfile = profileEditPopup.querySelector('.popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
//функция обработчик "отправки" формы:
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); //отмена стандартной отправки формы.
  //получение значений полей:
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  //выбор элементов для вставки значений:
  const nameProfile = document.querySelector('.profile__title');
  const descriptionProfile = document.querySelector('.profile__description');
  //вставка новых значений:
  nameProfile.textContent = nameValue;
  descriptionProfile.textContent = jobValue;
  //закрытие попапа после отправки формы:
  closePopup(profileEditPopup);
}
//прикрепление обработчика к форме, слушатель события submit:
formProfile.addEventListener('submit', handleProfileFormSubmit);

//=============================================

// обработчик события submit при отправке формы добавления карточки

const formCard = cardAddPopup.querySelector('.popup__form');
const inputName = formCard.querySelector('.popup__input_type_card-name');
const inputLink = formCard.querySelector('.popup__input_type_url');
//функция обработчик "отправки" формы:
function handleCardFormSubmit(evt) {
  evt.preventDefault(); //отмена стандартной отправки формы.
  //получение значений полей:
  const linkValue = inputLink.value;
  const nameValue = inputName.value;
  //создание новой карточки путём передачи функции createCard новых значений через параметры:
  const cardElement = createCard(
    linkValue,
    nameValue,
    removeCard,
    likeCard,
    openImagePopup
  );
  cardList.prepend(cardElement); //добавление новой карточки в начало, перед остальными карточками.
  formCard.reset(); //сброс, очистка полей формы.
  closePopup(cardAddPopup); //закрытие попапа после отправки формы:
}
//прикрепление обработчика к форме, слушатель события submit:
formCard.addEventListener('submit', handleCardFormSubmit);
