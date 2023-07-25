import { isEscapeKey, handleKeyDown, showAlert } from './util.js';
import { uploadForm, formValidator, hashtagInput, commentInput } from './validation.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';

const submitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...',
};

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

// Функции для блокировки и разблокировки кнопки отправки
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
  // Добавление обработчика события 'submit' (отправка формы)
  // Делаем обработчик события submit асинхронным и используем 'await' при вызове 'sendData' для обработки промиса
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = formValidator.validate();// Проверяем валидность данных формы с помощью formValidator
    if (isValid) {
      blockSubmitButton();// Если данные валидны, блокируем кнопку отправки
      toggleSubmitButton(true);// Меняем текст на кнопке отправки на "Отправляю..."
      try {
        // Отправляем данные формы на сервер с помощью функции sendData и объекта FormData
        await callback(new FormData(uploadForm)); // Используем 'await' для обработки промиса
        hideUploadOverlay();// Если запрос выполнен успешно, скрываем оверлей загрузки
        toggleSubmitButton(false);// Меняем текст на кнопке отправки обратно на "Опубликовать"
      } catch (err) {
        showAlert(err.message);// Если возникла ошибка при выполнении запроса, показываем сообщение об ошибке
      } finally {
        unblockSubmitButton();// Вне зависимости от успешного выполнения запроса или возникновения ошибки, разблокируем кнопку отправки формы
      }
    }
  });
};


fileInput.addEventListener('change', onFileInputChange);//Выборе файла через поле загрузки
uploadCancelButton.addEventListener('click', onCancelButtonClick);//Клике на кнопку отмены
commentInput.addEventListener('keydown', handleKeyDown);// При нажатии клавиши в поле хэштега, вызывается функция handleKeyDown
hashtagInput.addEventListener('keydown', handleKeyDown);// При нажатии клавиши в поле хэштега, вызывается функция handleKeyDown

export { uploadForm, hideUploadOverlay, setOnFormSubmit };
