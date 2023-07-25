const randomUserImageTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

// Функция для создания миниатюры фотографии на основе переданных данных
const createPhotoMiniature = ({ comments, description, url, likes, id }) => {
  const photoMiniature = randomUserImageTemplate.cloneNode(true);
  // Заполнение информации о количестве комментариев, лайках, описании и URL изображения
  photoMiniature.querySelector('.picture__comments').textContent = comments.length;
  photoMiniature.querySelector('.picture__likes').textContent = likes;
  photoMiniature.querySelector('.picture__img').alt = description;
  photoMiniature.querySelector('.picture__img').src = url;
  // Установка атрибута data-photo-miniature-id для идентификации фотографии
  photoMiniature.dataset.photoMiniatureId = id;

  return photoMiniature;// Возвращение созданной миниатюры
};

// Рендеринг миниатюр фотографий
const renderPhotoMiniatures = (pictures) => {
  const fragment = document.createDocumentFragment();

  // Проход по массиву фотографий и создание миниатюры для каждой фотографии
  pictures.forEach((picture) => {
    const photoMiniature = createPhotoMiniature(picture);
    fragment.append(photoMiniature);
  });

  // Добавление всех миниатюр в контейнер
  picturesContainer.append(fragment);
};

export { renderPhotoMiniatures, picturesContainer };
