import { EFFECTS } from './util.js';

const imageElement = document.querySelector('.img-upload__preview img');
const formElement = document.querySelector('.img-upload__form');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');

let currentEffect = EFFECTS[0];

noUiSlider.create(sliderElement, {
  range: {
    min: currentEffect.min,
    max: currentEffect.max
  },
  start: currentEffect.max,
  step: currentEffect.step,
  connect: 'lower'
});

const isDefaultEffect = () => currentEffect === EFFECTS[0];

const updateSlider = () => {
  sliderContainerElement.classList.toggle('hidden', isDefaultEffect());
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    },
    start: currentEffect.max,
    step: currentEffect.step
  });
};

const handleFilterChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider();
};

const handleSliderChange = () => {
  imageElement.style.filter = 'none';
  imageElement.className = '';
  effectLevel.value = '';
  if (isDefaultEffect()) {
    return;
  }

  const effectValue = sliderElement.noUiSlider.get();
  imageElement.style.filter = `${currentEffect.style}(${effectValue}${currentEffect.unit})`;
  const effectClass = `effects__preview--${currentEffect.name}`;
  imageElement.classList.add(effectClass);
  effectLevel.value = effectValue;
};

const resetEffects = () => {
  currentEffect = EFFECTS[0];
  updateSlider();
};

updateSlider();

formElement.addEventListener('change', handleFilterChange);
sliderElement.noUiSlider.on('update', handleSliderChange);

export { resetEffects };
