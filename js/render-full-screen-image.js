import { isEscapeKey } from './util.js';
//import { photosArray } from './generation-photo.js';

//const COMMENTS_SHOWN_PER_CLICK = 5;

const bigPictureOverlay = document.querySelector('.big-picture');
const closePictureButton = document.querySelector('.big-picture__cancel');

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const commentsListElement = bigPictureOverlay.querySelector('.social__comments');
const commentsLoaderElement = bigPictureOverlay.querySelector('.comments-loader');
const commentsCountElement = bigPictureOverlay.querySelector('.comments-count');

// Функция создание комментария
const createComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  commentsListElement.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  commentsListElement.append(fragment);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureOverlay.classList.add('hidden');
  }
};

// Функция, закрывающая полноэкранный просмотр изображения
const closePictureModal = () => {
  bigPictureOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Функция рендера большой фотографии с данными
const renderBigPictureDetails = ({ url, likes, description }) => {
  bigPictureOverlay.querySelector('.big-picture__img img').src = url;
  bigPictureOverlay.querySelector('.big-picture__img img').alt = description;
  bigPictureOverlay.querySelector('.likes-count').textContent = likes;
  bigPictureOverlay.querySelector('.social__caption').textContent = description;
};

// Функция, открывающая полноэкранный просмотр изображения
const openPictureModal = (data) => {
  bigPictureOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  commentsCountElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderBigPictureDetails(data);
  renderComments(data.comments);
};


closePictureButton.addEventListener('click', closePictureModal);

export { openPictureModal };


// Функция создания комментариев
// const renderComments = (comments) => {
//   commentShown += COMMENTS_SHOWN_PER_CLICK;
//   const fragment = document.createDocumentFragment();

//   if (commentShown >= comments.length) {
//     commentShown = comments.length;
//     commentsLoaderElement.classList.add('hidden');
//   }
//   for (let i = 0; i < commentShown; i++) {
//     const commentElement = createComment(comments[i]);
//     fragment.append(commentElement);
//   }

//   commentsListElement.innerHTML = '';
//   commentsListElement.append(fragment);
//   commentsListElement.textContent = commentShown + ' из ' + comments.length + ' комментариев';
// };
