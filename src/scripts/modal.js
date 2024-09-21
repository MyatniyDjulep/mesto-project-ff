// функция открытия попапа c добавлением обработчика, запускаемого по нажатию клавиши:

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByPressEsc);
}

// функция закрытия любого попапа со снятием слушателя события:

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByPressEsc);
}

// функция закрытия попапа по нажатию клавишы Escape:

function closePopupByPressEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

export function closePopupByClick(evt) {
  const popup = evt.currentTarget; // Получаем текущий попап
  if (evt.target.classList.contains('popup__close') || evt.target === popup) {
    closePopup(popup); // Вызываем функцию закрытия, передаем нужный попап
  }
}
