// Константа, определяющая количество картинок, которые будут отображаться после фильтрации.
const MAX_DISPLAYED_PICTURES = 10;

// Перечисление для определения типа фильтрации.
const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

// Элемент, представляющий контейнер с кнопками фильтров.
const filterContainerElement = document.querySelector('.img-filters'); //<section class="img-filters  img-filters--inactive  container">
//const filterButtons = filterContainerElement.querySelectorAll('.img-filters__button');

// Текущий выбранный тип фильтра.
let currentFilterType = FilterType.DEFAULT;

// Массив объектов картинок, которые будут фильтроваться.
let picturesData = [];

// Функция для сортировки картинок в случайном порядке.
const sortByRandom = () => Math.random() - 0.5;

// Функция для сортировки картинок по количеству комментариев (по убыванию).
const sortByCommentsCount = (firstPicture, secondPicture) =>
  secondPicture.comments.length - firstPicture.comments.length;

// Функция, которая возвращает отфильтрованные картинки в зависимости от текущего типа фильтра.
const getFilteredPictures = () => {
  switch (currentFilterType) {
    case FilterType.RANDOM:
      return [...picturesData].sort(sortByRandom).slice(0, MAX_DISPLAYED_PICTURES);
    case FilterType.DISCUSSED:
      return [...picturesData].sort(sortByCommentsCount);
    default:
      return [...picturesData];
  }
};

// Функция для установки обработчика клика на кнопки фильтров.
const setFilterButtonClickHandler = (callback) => {
  filterContainerElement.addEventListener('click', (evt) => {
    const clickedButton = evt.target; // Получаем кнопку, на которую произведен клик.
    // Проверяем, является ли элемент кнопкой фильтра и не равен ли он текущему выбранному типу фильтра.
    if (!clickedButton.classList.contains('img-filters__button') || clickedButton.id === currentFilterType) {
      return;
    }

    // Убираем класс "img-filters__button--active" у предыдущей активной кнопки.
    const activeButton = filterContainerElement.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');

    // Добавляем класс "img-filters__button--active" на выбранную кнопку фильтра.
    clickedButton.classList.add('img-filters__button--active');

    // Обновляем текущий тип фильтра и вызываем колбэк с отфильтрованными картинками.
    currentFilterType = clickedButton.id;
    callback(getFilteredPictures());
  });
};

// Инициализация модуля фильтрации.
const initFilterModule = (loadedPicturesData, callback) => {
  // Убираем класс "img-filters--inactive", чтобы показать контейнер с кнопками фильтров.
  filterContainerElement.classList.remove('img-filters--inactive'); //<section class="img-filters  img-filters--inactive  container">

  // Записываем загруженные данные картинок в переменную.
  picturesData = [...loadedPicturesData];

  // Устанавливаем обработчик клика на кнопки фильтров.
  setFilterButtonClickHandler(callback);
};

// Экспортируем функции, которые будут доступны для использования в других модулях.
export { initFilterModule, getFilteredPictures };
