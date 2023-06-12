// 1. Функция для проверки длины строки

function checkStringLength(str, maxLength) {

  if (str.length <= maxLength) {
    return true;
  }

  return false;
}

// Проверка работы функции -->

console.log(checkStringLength('проверяемая строка', 20)); // true
console.log(checkStringLength('проверяемая строка', 18)); // true
console.log(checkStringLength('проверяемая строка', 10)); // false


// 2. Функция для проверки, является ли строка палиндромом

function isPalindrome(str) {
  const normalized = str.replaceAll(' ', '').toUpperCase();
  // делаем реверс и сравниваем текущую строку с перевернутой, если true то палиндром, если false то не палиндром
  const reversed = normalized.split('').reverse().join('').toUpperCase();
  return normalized === reversed;
}

// Проверка работы функции -->

console.log(isPalindrome('топот')); // true
console.log(isPalindrome('ДовОд')); // true
console.log(isPalindrome('Кекс')); // false
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true
console.log(isPalindrome('Функция для проверки, является ли строка палиндромом')); // false

//3. Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.

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

// Проверка работы функции -->

console.log(extractNumbersFromString('2023 год'));            // 2023
console.log(extractNumbersFromString('ECMAScript 2022'));     // 2022
console.log(extractNumbersFromString('1 кефир, 0.5 батона')); // 105
console.log(extractNumbersFromString('агент 007'));           // 7
console.log(extractNumbersFromString('а я томат'));           // NaN
console.log(extractNumbersFromString(2023));                  // 2023
console.log(extractNumbersFromString(-1));                    // 1
console.log(extractNumbersFromString(1.5));                   // 15

