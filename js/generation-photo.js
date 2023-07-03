import { photoDescriptions } from './data.js';
import { getRandomInteger } from './util.js';
import { randomComment } from './random-comment.js';
import { MIN_PHOTO_COUNT, MAX_PHOTO_COUNT, MIN_LIKE_SCORE, MAX_LIKE_SCORE, MAX_GENERATED_OBJECT_COUNT } from './constants.js';

const descriptionOfThePublishedPhoto = () => {

  const randomPhotoDescriptionsIndex = getRandomInteger(0, photoDescriptions.length - 1);

  return {
    id: getRandomInteger(MIN_PHOTO_COUNT, MAX_PHOTO_COUNT),
    url: `photos/${getRandomInteger(MIN_PHOTO_COUNT, MAX_PHOTO_COUNT)}.jpg`,
    description: `${photoDescriptions[randomPhotoDescriptionsIndex]}`,
    likes: getRandomInteger(MIN_LIKE_SCORE, MAX_LIKE_SCORE),
    comments: Array.from({ length: getRandomInteger(0, MAX_GENERATED_OBJECT_COUNT) }, randomComment)
  };
};

const generationPhoto = (count) => Array.from({ length: count }, descriptionOfThePublishedPhoto);
const photosArray = generationPhoto(26);

export { photosArray };
