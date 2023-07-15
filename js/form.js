import { isEscapeKey, handleKeyDown } from './util.js';
import { uploadForm, formValidator, hashtagInput, commentInput } from './validation.js';

const pageBody = document.querySelector('body');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadForm.querySelector('.img-upload__cancel');
const fileInput = uploadForm.querySelector('.img-upload__input');

function showModal() {
  uploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function hideModal() {
  uploadForm.reset();
  formValidator.reset();
  uploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
}

function onFileInputChange() {
  showModal();
}

function onCancelButtonClick() {
  hideModal();
}

// Функция onFormSubmit вызывается при отправке формы
function onFormSubmit(evt) {
  evt.preventDefault();
  formValidator.validate(); // Выполняем валидацию формы при отправке
}

fileInput.addEventListener('change', onFileInputChange);
uploadCancelButton.addEventListener('click', onCancelButtonClick);
uploadForm.addEventListener('submit', onFormSubmit);
commentInput.addEventListener('keydown', handleKeyDown);
hashtagInput.addEventListener('keydown', handleKeyDown);

export { uploadForm };
