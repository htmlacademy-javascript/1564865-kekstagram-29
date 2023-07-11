import { renderPhotoMiniatures } from './render-photo-miniatures.js';
import { openPictureModal } from './render-full-screen-image.js';
import {photosArray} from './generation-photo.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-photo-miniature-id]'); // находим ближайшего родителя элемента
    if (!thumbnail) {
      return; // если не найден, выходим ничего не обрабатывам
    }

    evt.preventDefault();
    const picture = photosArray.find(
      (item) => item.id === +thumbnail.dataset.photoMiniatureId // приводим к числу, исп. унарный плюс
    );

    openPictureModal(picture);

  });

  renderPhotoMiniatures(pictures, container);
};

export { renderGallery };
