import { SCALE_STEP, MIN_SCALE, MAX_SCALE, DEFAULT_SCALE } from './constants.js';

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const scaleImage = (scalePercentage) => {
  imageElement.style.transform = `scale(${scalePercentage / 100})`;
  scaleInputElement.value = `${scalePercentage}%`;
};

const updateScale = (scaleStep) => {
  const currentValue = parseInt(scaleInputElement.value, 10);
  const newValue = currentValue + scaleStep;

  if (newValue < MIN_SCALE) {
    scaleImage(MIN_SCALE);
  } else if (newValue > MAX_SCALE) {
    scaleImage(MAX_SCALE);
  } else {
    scaleImage(newValue);
  }
};

const onSmallerButtonClick = () => {
  updateScale(-SCALE_STEP);
};

const onBiggerButtonClick = () => {
  updateScale(SCALE_STEP);
};

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export { resetScale };
