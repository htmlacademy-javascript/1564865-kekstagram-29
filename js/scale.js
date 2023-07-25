const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

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
