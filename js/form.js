import { isEscapeKey, handleKeyDown } from './util.js';
import { uploadForm, formValidator, hashtagInput, commentInput } from './validation.js';

const pageBody = document.querySelector('body');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadForm.querySelector('.img-upload__cancel');
const fileInput = uploadForm.querySelector('.img-upload__input');


function handleEscapeKey(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideUploadOverlay();
  }
}

function showUploadOverlay() {
  uploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', handleEscapeKey);
}

function hideUploadOverlay() {
  uploadForm.reset();
  formValidator.reset();
  uploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', handleEscapeKey);
}

function onFileInputChange() {
  showUploadOverlay();
}

function onCancelButtonClick() {
  hideUploadOverlay();
}

function handleSubmitForm(evt) {
  evt.preventDefault();
  formValidator.validate();
}

fileInput.addEventListener('change', onFileInputChange);
uploadCancelButton.addEventListener('click', onCancelButtonClick);
uploadForm.addEventListener('submit', handleSubmitForm);
commentInput.addEventListener('keydown', handleKeyDown);
hashtagInput.addEventListener('keydown', handleKeyDown);

export { uploadForm };
