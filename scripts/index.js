// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(linkCard, cardTitle, deleteCardFunction) {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  const cardElementLink = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = cardTitle;
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElementLink.src = linkCard;
  cardElementLink.alt = 'photo';

  deleteButton.addEventListener('click', () => deleteCardFunction(cardElement));

  return cardElement;
}
// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const card = createCard(item.link, item.name, removeCard);
  cardList.append(card);
});
