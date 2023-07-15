const MAX_HASHTAG_COUNT = 5;
const REGEX = /^#[a-zа-яё0-9]{1,19}$/i; // Регулярное выражение для проверки валидности хэштега
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`, // Текст ошибки при неверном количестве хэштегов
  NOT_UNIQUE: 'Хэштеги должны быть уникальными', // Текст ошибки при повторяющихся хэштегах
  INVALID_PATTERN: 'Неправильный хэштег', // Текст ошибки при неправильном формате хэштега
};

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

// Создаем экземпляр Pristine для валидации формы uploadForm
const formValidator = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

function validateCommentInput(value) {
  return value.length <= 140; // Валидация длины комментария (не более 140 символов)
}

// Нормализация строки хэштегов - удаление пробелов, разделение по пробелам и фильтрация пустых значений
function normalizeTags(tagString) {
  return tagString
    .trim()
    .split(' ')
    .filter((tag) => Boolean(tag.length));
}

function hasValidTags(value) {
  return normalizeTags(value).every((tag) => REGEX.test(tag));
}

function hasValidCount(value) {
  return normalizeTags(value).length <= MAX_HASHTAG_COUNT;
}

function hasUniqueTags(value) {
  const normalizedTags = normalizeTags(value);
  const lowerCaseTags = [];
  for (let i = 0; i < normalizedTags.length; i++) {
    lowerCaseTags.push(normalizedTags[i].toLowerCase());
  }

  // Создаем пустой объект для хранения уникальных тегов
  const uniqueTagsObj = {};

  // Проверяем каждый тег и добавляем его в объект (ключ - сам тег, значение - true)
  for (let i = 0; i < lowerCaseTags.length; i++) {
    const tag = lowerCaseTags[i]; // Получаем текущий тег на каждой итерации
    uniqueTagsObj[tag] = true;

    // Количество уникальных тегов равно количеству ключей в объекте
    const uniqueTagsCount = Object.keys(uniqueTagsObj).length;

    // Сравниваем количество уникальных тегов с длиной исходного массива
    return lowerCaseTags.length === uniqueTagsCount;
  }
}

// Добавляем валидатор для комментария
formValidator.addValidator(commentInput, validateCommentInput);

formValidator.addValidator(
  hashtagInput,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  1,
  true
);

formValidator.addValidator(
  hashtagInput,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  2,
  true
);

formValidator.addValidator(
  hashtagInput,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

export { formValidator, uploadForm, hashtagInput, commentInput };
