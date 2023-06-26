// 1. Функция для проверки длины строки

function checkStringLength(str, maxLength) {

  if (str.length <= maxLength) {
    return true;
  }

  return false;
}

// 2. Функция для проверки, является ли строка палиндромом

function isPalindrome(str) {
  const normalized = str.replaceAll(' ', '').toUpperCase();
  // делаем реверс и сравниваем текущую строку с перевернутой, если true то палиндром, если false то не палиндром
  const reversed = normalized.split('').reverse().join('').toUpperCase();
  return normalized === reversed;
}

// 3. Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и ...возвращает их в виде целого положительного числа.

function extractNumbersFromString(string) {
  if (typeof string === 'number') {
    string = string.toString();
  }

  let result = '';
  for (let i = 0; i < string.length; i++) {
    let digit = parseInt(string[i], 10);
    if (!Number.isNaN(digit)) {
      result += digit.toString();
    }
  }

  if (result.length === 0) {
    return NaN;
  }

  return parseInt(result, 10);
}


// Функция для проверки времени встречи
function checkMeetingTime(startTime, endTime, meetingStart, meetingDuration) {
  // Преобразуем время начала и конца рабочего дня в минуты
  const workDayStartMinutes = convertToMinutes(startTime);
  const workDayEndMinutes = convertToMinutes(endTime);

  // Преобразуем время старта встречи в минуты
  const meetingStartMinutes = convertToMinutes(meetingStart);

  // Рассчитываем время окончания встречи в минутах
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  // Проверяем, что время окончания встречи не превышает конец рабочего дня
  if (meetingEndMinutes <= workDayEndMinutes) {
    // Проверяем, что время начала встречи не раньше начала рабочего дня
    if (meetingStartMinutes >= workDayStartMinutes) {
      // Если оба условия выполняются, встреча не выходит за рамки рабочего дня
      return true;
    }
  }

  // Если хотя бы одно из условий не выполняется, встреча выходит за рамки рабочего дня
  return false;
}

// Вспомогательная функция для преобразования времени в минуты
function convertToMinutes(time) {
  const [hours, minutes] = time.split(':');
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
}

checkMeetingTime();
