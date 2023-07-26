import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');

// Функция для скрытия открытых сообщений
function hideMessage() {
  const messageElements = document.querySelectorAll('.success, .error');// Находим все элементы с классами .success и .error
  messageElements.forEach((element) => element.remove());// Перебираем найденные элементы и удаляем их
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.removeEventListener('click', onBodyClick);
}

// Функция для обработки кликов на <body>
function onBodyClick(evt) {
  if (// Проверяем, если клик был на элементе с классами .success__inner или .error__inner, то ничего не делаем
    evt.target.closest('.success__inner') || // Клик произошел внутри элемента с классом "success__inner" <div class="success__inner">
    evt.target.closest('.error__inner') //Клик произошел внутри элемента с классом "error__inner" <div class="error__inner">
  ) {
    return;
  }
  // Иначе, вызываем функцию hideMessage() для скрытия открытых сообщений
  hideMessage();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

// Функция для отображения сообщения и добавления обработчиков событий
const showMessage = (messageElement, closeButtonClass) => {
  hideMessage(); // Скрываем предыдущее сообщение перед отображением нового
  bodyElement.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.addEventListener('click', onBodyClick);
  messageElement
    .querySelector(closeButtonClass)
    .addEventListener('click', hideMessage);
};

// Функция для отображения сообщения об ошибке
const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  showMessage(errorMessageTemplate, '.error__button');//<button type="button" class="error__button">Попробовать ещё раз</button>
};

// Функция для отображения сообщения об успехе
const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  showMessage(successMessageTemplate, '.success__button');//<button type="button" class="success__button">Круто!</button>
};

export { showSuccessMessage, showErrorMessage };
