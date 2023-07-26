import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');

function hideMessage() {
  const messageElements = document.querySelectorAll('.success, .error');
  messageElements.forEach((element) => element.remove());
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.removeEventListener('click', onBodyClick);
}

function onBodyClick(evt) {
  if (
    evt.target.closest('.success__inner') ||
    evt.target.closest('.error__inner')
  ) {
    return;
  }

  hideMessage();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

const showMessage = (messageElement, closeButtonClass) => {
  hideMessage();
  bodyElement.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.addEventListener('click', onBodyClick);
  messageElement
    .querySelector(closeButtonClass)
    .addEventListener('click', hideMessage);
};

const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  showMessage(errorMessageTemplate, '.error__button');
};

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  showMessage(successMessageTemplate, '.success__button');
};

export { showSuccessMessage, showErrorMessage };
