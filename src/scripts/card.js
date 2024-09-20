// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content;
// @todo: Функция создания карточки

export function createCard(
  linkCard,
  cardTitle,
  deleteCardFunction,
  likeCardFunction,
  openImageFunction
) {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  const cardElementLink = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = cardTitle;
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElementLink.src = linkCard;
  cardElementLink.alt = cardTitle;

  deleteButton.addEventListener('click', () => deleteCardFunction(cardElement));

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCardFunction);

  cardElementLink.addEventListener('click', openImageFunction);

  return cardElement;
}

// @todo: Функция удаления карточки
export function removeCard(card) {
  card.remove();
}

//функция лайка для передачи в функцию создания карточки и вызова из обработчика клика:

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
