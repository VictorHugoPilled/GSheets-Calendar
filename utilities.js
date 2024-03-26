/**
 * @generator
 * @function range
 * @params {Number} start - a number 
 * @params {Number} end - a number
 * @yield {Number} next number in the range 
 */
function* range(start,end) {
  while (start < end) {
    yield start++;
  }
}

/**
 * @function categorySum
 * @params {Array<String>} notes - an array of notes
 * @params {String} category - a category from the sheet
 * @return {Number} total sum of all the notes of a category in the array
 */
function categorySum(notes, category) {
 return notes.filter((note) => note === category).length;
}

/**
 * @customfunction
 * @params {Number} year - a year
 * @return {Number} days in a new year
 */
function daysIn(year) {

  // this is a switch case

  // Every year that is exactly divisible by four is a leap year
  if(year % 4 != 0){
    return 365;
  }
  
  // Centurial years are leap years if they are exactly divisible by 400
  if(year % 4 == 0 && year % 400 == 0){
    return 366;
  }

  // Every year that is exactly divisible by four is a leap year, except for years that are exactly divisible by 100.
  return year % 4 == 0 && year % 100 != 0? 366: 365;

}

/**
 * @function randomNumber
 * @param {Number} a number in range (0,number)
 * @return {Number} a random day in the range (0,number)
 */

function randomNumber(number) {

  // Math.random() * (max - min)
  return Math.floor(Math.random() * (number - 0))
}


/**
 * @function handleError
 * @param {Error}
 */
function handleError(err) {
    Logger.log(`Failed with error ${err.message}`);
    throw err;
 }

/**
 * @function expectToExist(
 * A simple exists assertion check. Expects a value to exist. Errors if DNE.
 * @param {Any} value A value that is expected to exist.
 */

function expectToExist(value){
  if (value >= 0){
    Logger.log(`TEST: Exists - ${value}`);
  }
  else {
    throw new Error('TEST: Does not exist')
  }
}


/**
 * @function expectToEqual
 * A simple exists assertion check for primatives (no nested objects).
 * Expects actual to equal expected. Logs the output.
 * @param {Any} actual The actual value.
 * @param {Any} expected The expected value.
 */

function expectToEqual(actual, expected) {
  Logger.log(`TEST: actual: ${actual} = expected: ${expected}`);
  if (actual !== expected) {
    Logger.log(`TEST: ${expected} not equal to ${actual}`)
  }
}











