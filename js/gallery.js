import { renderPhotoMiniatures } from './render-photo-miniatures.js';
import { openPictureModal } from './render-full-screen-image.js';

// Определение функции renderGallery, которая отображает галерею с миниатюрами фотографий
const renderGallery = (pictures) => {
  const container = document.querySelector('.pictures'); // контейнер для миниатюр фотографий

  const handleThumbnailClick = (evt) => {// Функция handleThumbnailClick вызывается при клике на миниатюру фотографии
    const thumbnail = evt.target.closest('[data-photo-miniature-id]');// Находим ближайший родительский элемент с атрибутом data-photo-miniature-id
    if (!thumbnail) {// Если не найден такой элемент, то выходим из функции
      return;
    }

    evt.preventDefault();
    const { photoMiniatureId } = thumbnail.dataset;// Получаем значение атрибута photoMiniatureId у найденной миниатюры
    const picture = pictures.find((item) => item.id === +photoMiniatureId);// Находим объект фотографии в массиве pictures по его id

    openPictureModal(picture);
  };

  renderPhotoMiniatures(pictures);
  container.addEventListener('click', handleThumbnailClick);
};

export { renderGallery };
