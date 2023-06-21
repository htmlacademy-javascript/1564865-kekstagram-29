import { getRandomArrayElement, getRandomInteger } from './util.js';
import { messages, nameAuthors } from './arrays.js';
import { MAX_AVATAR_COUNT, MIN_AVATAR_COUNT } from './constans.js';

const randomComment = () => {

  const randomMessageIndex = getRandomInteger(0, messages.length - 1);
  const randomNameIndex = getRandomInteger(0, nameAuthors.length - 1);

  return {
    id: getRandomArrayElement,
    avatar: `img/avatar-${getRandomInteger(MAX_AVATAR_COUNT, MIN_AVATAR_COUNT)}.svg`,
    message: `${messages[randomMessageIndex]}`,
    name: `${nameAuthors[randomNameIndex]}`,
  };
};

export { randomComment };
