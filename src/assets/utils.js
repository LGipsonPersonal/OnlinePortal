/**
 * converts a string from camel case to a normal case. 
 * @param {string} str - the text in camel case 
 * @returns {string} the given text with a space between the two words
 */
export function camelCaseToWords(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase();
}
function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function titleCase(sentence) {
    return sentence
        .split(' ') // Split the sentence into words
        .map(word => capitalizeFirstLetter(word)) // Capitalize each word
        .join(' '); // Join the words back into a sentence
}
export function selfOnly(fn) {
    return function(event) {
      if (event.target === event.currentTarget) {
        fn.call(this, event);
      }
    };
  }

export function getFirstMonday(year) {
  const jan1 = new Date(year, 0, 1);
  const day = jan1.getDay();
  const offset = (day === 0) ? 1 : (8 - day); // Sunday is 0, Monday is 1
  return new Date(year, 0, 1 + offset);
}

export function getTwoWeekIntervals(year) {
  const firstMonday = getFirstMonday(year);
  const intervals = [];
  let start = new Date(firstMonday);

  while (start.getFullYear() === year || (start.getMonth() === 11 && start.getDate() > 17)) {
    const end = new Date(start);
    end.setDate(end.getDate() + 13); // 14-day interval

    intervals.push({
      start: new Date(start),
      end: new Date(end),
    });

    start.setDate(start.getDate() + 14);
  }

  return intervals;
}

export function getTwoWeekIntervalForDate(date) {
  const year = date.getFullYear();
  const firstMonday = getFirstMonday(year);
  const diffInDays = Math.floor((date - firstMonday) / (1000 * 60 * 60 * 24));

  const intervalIndex = Math.floor(diffInDays / 14);
  const start = new Date(firstMonday);
  start.setDate(start.getDate() + intervalIndex * 14);
  
  const end = new Date(start);
  end.setDate(start.getDate() + 13);

  return { start, end };
}

export function toLocalDate(date) {
  const pad = n => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
