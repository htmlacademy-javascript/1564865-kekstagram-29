import { isEscapeKey, handleKeyDown, showAlert } from './util.js';
import { uploadForm, formValidator, hashtagInput, commentInput } from './validation.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';

const submitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...',
};

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const pageBody = document.querySelector('body');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadForm.querySelector('.img-upload__cancel');
const fileChooser = uploadForm.querySelector('.img-upload__input[type=file]');
const imageElement = document.querySelector('.img-upload__preview img');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const effectsPreviewElement = document.querySelectorAll('.effects__preview');

const isTextFieldFocused = () =>
  document.activeElement === hashtagInput ||
  document.activeElement === commentInput;

function handleEscapeKey(evt) {
  const error = document.querySelector('.error');
  if (isEscapeKey(evt) && !isTextFieldFocused() && !error) {
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
  resetScale();
  resetEffects();
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

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled
    ? submitButtonText.SUBMITTING
    : submitButtonText.IDLE;
};

const setOnFormSubmit = (callback) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = formValidator.validate();
    if (isValid) {
      blockSubmitButton();
      toggleSubmitButton(true);
      try {
        await callback(new FormData(uploadForm));
        toggleSubmitButton(false);
      } catch (err) {
        showAlert(err.message);
      } finally {
        unblockSubmitButton();
      }
    }
  });
};

fileChooser.addEventListener('change', () => {
  const selectedFile = fileChooser.files[0];
  const fileName = selectedFile.name.toLowerCase();

  const isValidFileType = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (isValidFileType) {
    imageElement.src = URL.createObjectURL(selectedFile);
    effectsPreviewElement.forEach((previewElement) => (previewElement.style.backgroundImage = `url(${imageElement.src})`));
    showUploadOverlay();
  }
});

fileChooser.addEventListener('change', onFileInputChange);
uploadCancelButton.addEventListener('click', onCancelButtonClick);
commentInput.addEventListener('keydown', handleKeyDown);
hashtagInput.addEventListener('keydown', handleKeyDown);

export {
  hideUploadOverlay, setOnFormSubmit
};
