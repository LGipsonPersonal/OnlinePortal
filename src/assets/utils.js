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
  