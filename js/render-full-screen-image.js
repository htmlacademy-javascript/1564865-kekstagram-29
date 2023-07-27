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
const commentsShownCountElement = bigPictureOverlay.querySelector('.comments-shown-count');
const bodyElement = document.querySelector('body');

let commentsShown = 0;
let comments = [];

const createComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsShown += COMMENTS_SHOWN_PER_CLICK;

  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const visibleComments = comments.slice(0, commentsShown);
  const fragment = document.createDocumentFragment();
  visibleComments.forEach((commentData) => {
    const comment = createComment(commentData);
    fragment.append(comment);
  });

  commentsListElement.innerHTML = '';
  commentsListElement.append(fragment);
  commentsShownCountElement.textContent = commentsShown;
  commentsCountElement.textContent = comments.length;
};

const closePictureModal = () => {
  bigPictureOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
}

const onCommentsLoaderClick = () => renderComments();

const onCancelButtonClick = () => {
  closePictureModal();
};
const renderBigPictureDetails = ({ url, likes, description }) => {
  bigPictureOverlay.querySelector('.big-picture__img img').src = url;
  bigPictureOverlay.querySelector('.big-picture__img img').alt = description;
  bigPictureOverlay.querySelector('.likes-count').textContent = likes;
  bigPictureOverlay.querySelector('.social__caption').textContent = description;
};

const openPictureModal = (data) => {
  bigPictureOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderBigPictureDetails(data);
  commentsShown = 0;
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

closePictureButton.addEventListener('click', onCancelButtonClick);
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { openPictureModal };
