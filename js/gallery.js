import { renderPhotoMiniatures } from './render-photo-miniatures.js';
import { openPictureModal } from './render-full-screen-image.js';

const renderGallery = (pictures) => {
  const container = document.querySelector('.pictures'); // контейнер для миниатюр фотографий

  const handleThumbnailClick = (evt) => {
    const thumbnail = evt.target.closest('[data-photo-miniature-id]');
    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const { photoMiniatureId } = thumbnail.dataset;
    const picture = pictures.find((item) => item.id === +photoMiniatureId);

    openPictureModal(picture);
  };

  renderPhotoMiniatures(pictures);
  container.addEventListener('click', handleThumbnailClick);
};

export { renderGallery };
