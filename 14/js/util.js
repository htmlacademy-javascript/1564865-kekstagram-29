const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createGeneratorInRange = (firstIndex, lastIndex) => {
  const previousValues = [];
  return () => {
    let currentValue = firstIndex;

    if (previousValues.length >= lastIndex) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue++;
    }

    previousValues.push(currentValue);
    return currentValue;

  };
};
const generatePhotoId = createGeneratorInRange(1, 100);

const isEscapeKey = (evt) => evt.key === 'Escape';

function handleKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];

// Показываем ошибку на главной странице
const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.top = '0';
  alert.style.left = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.background = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export { getRandomArrayElement, getRandomInteger, isEscapeKey, generatePhotoId, handleKeyDown, EFFECTS, showAlert };