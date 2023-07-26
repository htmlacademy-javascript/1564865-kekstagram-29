const MAX_DISPLAYED_PICTURES = 10;

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterContainerElement = document.querySelector('.img-filters');
let currentFilterType = FilterType.DEFAULT;
let picturesData = [];
const sortByRandom = () => Math.random() - 0.5;

const sortByCommentsCount = (firstPicture, secondPicture) =>
  secondPicture.comments.length - firstPicture.comments.length;

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

const setFilterButtonClickHandler = (callback) => {
  filterContainerElement.addEventListener('click', (evt) => {
    const clickedButton = evt.target;

    if (!clickedButton.classList.contains('img-filters__button') || clickedButton.id === currentFilterType) {
      return;
    }

    const activeButton = filterContainerElement.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilterType = clickedButton.id;
    callback(getFilteredPictures());
  });
};

const initFilterModule = (loadedPicturesData, callback) => {
  filterContainerElement.classList.remove('img-filters--inactive');
  picturesData = [...loadedPicturesData];
  setFilterButtonClickHandler(callback);
};

export { initFilterModule, getFilteredPictures };
