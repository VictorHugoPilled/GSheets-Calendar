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
/**
 * @function randomDay
 * @param {Number} dayNumber - a day (0,365)
 * @return {Number} a random day in the range (0,dayNumber)
 */

function randomDay(dayNumber) {

  // Math.random() * (max - min)
  return Math.floor(Math.random() * (dayNumber - 0))
}


