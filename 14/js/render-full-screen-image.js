import { isEscapeKey } from './util.js';

const COMMENTS_SHOWN_PER_CLICK = 5;

const bigPictureOverlay = document.querySelector('.big-picture');
const closePictureButton = document.querySelector('.big-picture__cancel');

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const commentsListElement = bigPictureOverlay.querySelector('.social__comments');
const commentsLoaderElement = bigPictureOverlay.querySelector('.comments-loader');
const commentsCountElement = bigPictureOverlay.querySelector('.comments-count');
const commentShowCountElement = bigPictureOverlay.querySelector('.social__comment-count');

let commentsShow = 0;
let comments = [];

// Функция создание комментария
const createComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsShow += COMMENTS_SHOWN_PER_CLICK;

  if (commentsShow >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShow = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const visibleComments = comments.slice(0, commentsShow);
  const fragment = document.createDocumentFragment();
  visibleComments.forEach((commentData) => {
    const comment = createComment(commentData);
    fragment.append(comment);
  });

  commentsListElement.innerHTML = '';
  commentsListElement.append(fragment);

  commentShowCountElement.textContent = `${commentsShow} из ${comments.length} комментариев`;
  commentsCountElement.textContent = comments.length;
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
  commentsShow = 0;
};

const onCommentsLoaderClick = () => renderComments();

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
  commentsShow = 0; // Обнуление значения commentsShow
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

closePictureButton.addEventListener('click', closePictureModal);
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { openPictureModal };
