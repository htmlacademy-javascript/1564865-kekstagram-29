//import { photosArray } from './generation-photo.js';

const randomUserImageTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

// Создание миниатюры фотографии
const createPhotoMiniature = ({ comments, description, url, likes, id }) => {
  const photoMiniature = randomUserImageTemplate.cloneNode(true);

  photoMiniature.querySelector('.picture__comments').textContent = comments.length;
  photoMiniature.querySelector('.picture__likes').textContent = likes;
  photoMiniature.querySelector('.picture__img').alt = description;
  photoMiniature.querySelector('.picture__img').src = url;
  photoMiniature.dataset.photoMiniatureId = id;

  return photoMiniature;
};

// Рендеринг миниатюр фотографий
const renderPhotoMiniatures = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const photoMiniature = createPhotoMiniature(picture);
    fragment.append(photoMiniature);
  });

  picturesContainer.append(fragment);
};

export { renderPhotoMiniatures };
