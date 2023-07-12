import { photoDescriptions } from './data.js';
import { getRandomInteger, generatePhotoId } from './util.js';
import { generateRandomComment } from './random-comment.js';
import { MIN_PHOTO_COUNT, MAX_PHOTO_COUNT, MIN_LIKE_SCORE, MAX_LIKE_SCORE, MAX_GENERATED_OBJECT_COUNT } from './constants.js';

const descriptionOfThePublishedPhoto = () => {
  const randomPhotoDescriptionsIndex = getRandomInteger(0, photoDescriptions.length - 1);
  const photoId = generatePhotoId();
  const photoUrl = `photos/${getRandomInteger(MIN_PHOTO_COUNT, MAX_PHOTO_COUNT)}.jpg`;

  return {
    id: photoId,
    url: photoUrl,
    description: `${photoDescriptions[randomPhotoDescriptionsIndex]}`,
    likes: getRandomInteger(MIN_LIKE_SCORE, MAX_LIKE_SCORE),
    comments: Array.from({ length: getRandomInteger(0, MAX_GENERATED_OBJECT_COUNT) }, generateRandomComment)
  };
};

const generatePhotosArray = (count) => Array.from({ length: count }, descriptionOfThePublishedPhoto);
const photosArray = generatePhotosArray(MAX_PHOTO_COUNT);

export { photosArray };
