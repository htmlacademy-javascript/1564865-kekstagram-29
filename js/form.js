import { isEscapeKey, handleKeyDown, showAlert } from './util.js';
import { uploadForm, formValidator, hashtagInput, commentInput } from './validation.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';
import { sendData } from './api.js';

const pageBody = document.querySelector('body');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadForm.querySelector('.img-upload__cancel');
const fileInput = uploadForm.querySelector('.img-upload__input');
const submitButton = uploadForm.querySelector('.img-upload__submit');

// Функция для обработки события нажатия клавиши Escape
function handleEscapeKey(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideUploadOverlay();
  }
}

// Функция для отображения оверлея загрузки изображения
function showUploadOverlay() {
  uploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', handleEscapeKey);
}

// Функция для скрытия оверлея загрузки изображения
function hideUploadOverlay() {
  uploadForm.reset();
  formValidator.reset();
  resetScale();
  resetEffects();
  uploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', handleEscapeKey);
}

// Функция обработки события изменения файла в поле загрузки изображения
function onFileInputChange() {
  showUploadOverlay();
}

// Функция обработки события клика на кнопке отмены загрузки
function onCancelButtonClick() {
  hideUploadOverlay();
}

// Функция обработки события отправки формы
// function handleSubmitForm(evt) {
//   evt.preventDefault();
//   formValidator.validate();
// }

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

// Добавление обработчика события 'submit' (отправка формы)
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = formValidator.validate();// Вызов функции formValidator.validate() для валидации данных формы
  if (isValid) {// Проверка, прошла ли валидация успешно
    blockSubmitButton();// Если валидация успешна, блокируем кнопку отправки формы (предотвращаем повторные клики)
    // Отправка данных формы на сервер с помощью функции sendData и объекта FormData
    sendData(new FormData(uploadForm))
      .then(() => {
        hideUploadOverlay();// Если запрос выполнен успешно, скрываем оверлей загрузки
      })
      .catch((err) => {// Если возникла ошибка при выполнении запроса, вызываем функцию showAlert, чтобы показать сообщение об ошибке
        showAlert(err.message);
      })
      .finally(unblockSubmitButton);
    // Вне зависимости от успешного выполнения запроса или возникновения ошибки, разблокируем кнопку отправки формы
  }
});

fileInput.addEventListener('change', onFileInputChange);//Выборе файла через поле загрузки
uploadCancelButton.addEventListener('click', onCancelButtonClick);//Клике на кнопку отмены
//uploadForm.addEventListener('submit', handleSubmitForm);// При отправке формы, вызывается функция handleSubmitForm
commentInput.addEventListener('keydown', handleKeyDown);// При нажатии клавиши в поле хэштега, вызывается функция handleKeyDown
hashtagInput.addEventListener('keydown', handleKeyDown);// При нажатии клавиши в поле хэштега, вызывается функция handleKeyDown

export { uploadForm };
