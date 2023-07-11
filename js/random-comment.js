import { getRandomArrayElement, getRandomInteger } from './util.js';
import { userComments, nameAuthors } from './data.js';
import { MAX_AVATAR_COUNT, MIN_AVATAR_COUNT } from './constants.js';

const randomComment = () => {

  const randomMessageIndex = getRandomInteger(0, userComments.length - 1);
  const randomNameIndex = getRandomInteger(0, nameAuthors.length - 1);

  return {
    id: getRandomArrayElement,
    avatar: `img/avatar-${getRandomInteger(MAX_AVATAR_COUNT, MIN_AVATAR_COUNT)}.svg`,
    message: `${userComments[randomMessageIndex]}`,
    name: `${nameAuthors[randomNameIndex]}`,
  };
};

export { randomComment };
