import { EFFECTS } from './util.js';

const imageElement = document.querySelector('.img-upload__preview img');
const formElement = document.querySelector('.img-upload__form');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');

let currentEffect = EFFECTS[0]; // Инициализация текущего эффекта с эффектом по умолчанию

noUiSlider.create(sliderElement, { // Инициализация слайдера
  range: {
    min: currentEffect.min,
    max: currentEffect.max
  },
  start: currentEffect.max,
  step: currentEffect.step,
  connect: 'lower'
});

const isDefaultEffect = () => currentEffect === EFFECTS[0]; // Функция для проверки, является ли текущий эффект эффектом по умолчанию

// Обновление видимости контейнера слайдера в зависимости от текущего эффекта
const updateSlider = () => { // Функция для обновления слайдера
  sliderContainerElement.classList.toggle('hidden', isDefaultEffect());
  sliderElement.noUiSlider.updateOptions({ // Обновление опций слайдера
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    },
    start: currentEffect.max,
    step: currentEffect.step
  });
};

const handleFilterChange = (evt) => { // Функция, вызываемая при изменении фильтра
  if (!evt.target.classList.contains('effects__radio')) { // Если изменение произошло не на элементе с классом 'effects__radio', выходим из функции
    return;
  }
  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value); // Обновление текущего эффекта на основе выбранного значения фильтра
  updateSlider();
};

// Обновление текущего эффекта и слайдера при изменении фильтра
const handleSliderChange = () => { // Функция, вызываемая при изменении слайдера
  imageElement.style.filter = 'none';
  imageElement.className = '';
  effectLevel.value = '';
  if (isDefaultEffect()) {
    return;
  }

  // Сброс стилей и значений, если текущий эффект является эффектом по умолчанию
  const effectValue = sliderElement.noUiSlider.get(); // Получение значения слайдера
  imageElement.style.filter = `${currentEffect.style}(${effectValue}${currentEffect.unit})`;
  const effectClass = `effects__preview--${currentEffect.name}`;
  imageElement.classList.add(effectClass);
  effectLevel.value = effectValue;
};

const resetEffects = () => { // Функция для сброса эффектов
  currentEffect = EFFECTS[0];
  updateSlider();
};

updateSlider(); // Обновление слайдера

formElement.addEventListener('change', handleFilterChange); // Добавление обработчика событий на форму для отслеживания изменений фильтра
sliderElement.noUiSlider.on('update', handleSliderChange); // Добавление обработчика событий на слайдер для отслеживания изменений значения слайдера

export { resetEffects };

