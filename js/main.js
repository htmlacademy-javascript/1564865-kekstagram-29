<<<<<<< HEAD
import './random-comment.js';
import {generationPhoto} from './generation-photo.js';

generationPhoto(); // Объявил, чтобы линтер не агрился))
=======
// константы
const MAX_GENERATED_OBJECT_COUNT = 25;
const MIN_PHOTO_COUNT = 1;
const MAX_PHOTO_COUNT = 25;
const MIN_LIKE_SCORE = 15;
const MAX_LIKE_SCORE = 200;
const MAX_AVATAR_COUNT = 1;
const MIN_AVATAR_COUNT = 6;

// масивы
const nameAuthors = [
  'Эльриана',
  'Аркандр',
  'Люнарис',
  'Зефирель',
  'Иллиана',
  'Силванос',
  'Элдорин',
  'Аурелиан',
  'Мистралл',
  'Эмералда'
];

const photoDescriptions = [
  'Прекрасный закат на побережье',
  'Величественные горы во время рассвета',
  'Цветочное поле весной',
  'Игривый щенок, играющий в парке',
  'Архитектурное чудо - собор Святого Базилия в Москве',
  'Удивительный вид на Ниагарский водопад',
  'Солнечные лучи проникают сквозь плотную листву леса',
  'Замечательный момент семейного пикника на пляже',
  'Интересная графика в городском сквере',
  'Волшебный зимний пейзаж с ледяными сосульками'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// функция createIdGenerator возвращает функцию, которая генерирует уникальные идентификаторы
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const photoIdGenerator = createIdGenerator();

const randomComment = () => {

  const randomMessageIndex = getRandomInteger(0, messages.length - 1);
  const randomNameIndex = getRandomInteger(0, nameAuthors.length - 1);

  return {
    id: photoIdGenerator(),
    avatar: `img/avatar-${getRandomInteger(MAX_AVATAR_COUNT, MIN_AVATAR_COUNT)}.svg`,
    message: `${messages[randomMessageIndex]}`,
    name: `${nameAuthors[randomNameIndex]}`,
  };
};

randomComment();

// описание фотографии, опубликованной пользователем.
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

const generationPhoto = Array.from({length: MAX_GENERATED_OBJECT_COUNT}, descriptionOfThePublishedPhoto);

descriptionOfThePublishedPhoto();
>>>>>>> 5235268eabf80d7f3c7607e2cb4d49c1da40d3da
