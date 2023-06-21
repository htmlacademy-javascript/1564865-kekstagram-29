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
