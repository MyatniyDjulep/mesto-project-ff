import {
  deleteCardFromServer,
  addLike,
  deleteLike,
  handleError,
} from './api.js';

// @todo: Темплейт карточки
const templateCard = document
  .querySelector('#card-template')
  .content.querySelector('.places__item');
// @todo: Функция создания карточки

export function createCard(data, removeCard, openImagePopup, likeCard, userId) {
  const cardElement = templateCard.cloneNode(true);
  const cardElementLink = cardElement.querySelector('.card__image');
  const likesCounter = cardElement.querySelector('.card__likes-counter');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElementLink.src = data.link;
  cardElementLink.alt = data.name;
  cardTitle.textContent = data.name;

  cardElementLink.addEventListener('click', () =>
    openImagePopup(data.link, data.name)
  );

  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  cardLikeBtn.addEventListener('click', (evt) =>
    likeCard(evt, data._id, likesCounter)
  );
  likesCounter.textContent = data.likes.length;

  deleteButton.addEventListener('click', () =>
    removeCard(cardElement, data._id)
  );

  if (data.owner._id === userId) {
    deleteButton.classList.remove('card__delete-button_hidden');
  } else {
    deleteButton.classList.add('card__delete-button_hidden');
  }

  if (data.likes.some((like) => like._id === userId)) {
    cardLikeBtn.classList.add('card__like-button_is-active');
  }

  return cardElement;
}
// удаляем
export const removeCard = (card, cardId) => {
  deleteCardFromServer(cardId)
    .then(() => {
      card.remove(card);
    })
    .catch(handleError);
};

// Функция, обрабатывающая события лайка

export const likeCard = (event, cardId, likesCounter) => {
  const button = event.target;

  const likeMethod = button.classList.contains('card__like-button_is-active')
    ? deleteLike
    : addLike;
  likeMethod(cardId)
    .then((cardData) => {
      button.classList.toggle('card__like-button_is-active');
      likesCounter.textContent = cardData.likes.length;
    })
    .catch(handleError);
};
