import { getRandomArrayElement, getRandomInteger } from './util.js';
import { userComments, nameAuthors } from './data.js';
import { MAX_AVATAR_COUNT, MIN_AVATAR_COUNT } from './constants.js';

const generateRandomComment = () => {
  const randomMessageIndex = getRandomInteger(0, userComments.length - 1);
  const randomNameIndex = getRandomInteger(0, nameAuthors.length - 1);
  const randomAvatarIndex = getRandomInteger(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT);

  return {
    id: getRandomArrayElement(userComments),
    avatar: `img/avatar-${randomAvatarIndex}.svg`,
    message: userComments[randomMessageIndex],
    name: nameAuthors[randomNameIndex],
  };
};

export { generateRandomComment };
