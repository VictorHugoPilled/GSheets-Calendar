/**
 * @generator
 * @function range
 * @params {number} start - a number 
 * @params {number} end - a number
 * @yield {number} next number in the range 
 */
function* range(start,end) {
  while (start < end) {
    yield start++;
  }
}

/**
 * @function categorySum
 * @params {Array<String>} notes - an array of notes
 * @params {string} category - a category from the sheet
 * @return {number} total sum of all the notes of a category in the array
 */
function categorySum(notes, category) {
 return notes.filter((note) => note === category).length;
}

/**
 * @customfunction
 * @params {number} year - a year
 * @return {number} days in a new year
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
 * @param {number} number - a number in range (0,number)
 * @return {number} a random day in the range (0,number)
 */

function randomNumber(number) {

  // Math.random() * (max - min)
  return Math.floor(Math.random() * (number - 0))
}

/**
 * @function columnToLetter
 * @params {number} columnNumber - a columnNumber from 0 to infinity
 * @return {string} letter that corresponds to the columnNumber
 * 
 */
function columnNumberToLetter(columnNumber) {
  var temp, letter = '';
  while (columnNumber > 0) {
    temp = (columnNumber - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    columnNumber = (columnNumber - temp - 1) / 26;
  }
  return letter;
}


/**
 * @params {number} row1 - first row in range
 * @params {number} column1 - first column in the range
 * @params {number} rows - number of rows you want
 * @params {number} columns - number of columns you want
 * @function columnToLetter
 */
function convertToAlNotation(row1, column1, rows,columns) {

  const range1 = columnNumberToLetter(column1) + row1;
  // Distance from column 1 - A
  const columnDifference = column1 - 1;
  // Distance from row1 - 1
  const rowDifference = row1 - 1;
  const range2 = columnNumberToLetter(columns + columnDifference) + (rows+rowDifference);
  return `${range1}:${range2}`

}

/**
 * @params {number} year, eg. 2024 
 * @params {number} row1 - first row in range
 * @params {number} column1 - first column in the range
 * @params {number} rows - number of rows you want
 * @params {number} columns - number of columns you want
 * @function columnToLetter
 */
function sheetRangeToAlNotation(year,row1, column1, rows,columns){              
    return `${year}!${convertToAlNotation(row1,column1,rows,columns)}`;
}


/**
 * @customfunction
 * @params {number} spreadsheetId - a spreadsheet id
 * @params {string} range - a range in A1 Notation
 * @return {Array<Array<String>>} the full calendar as a 2d array
 */
function readRange(spreadsheetId,range) {
  try {
    const response = Sheets.Spreadsheets.Values.get(spreadsheetId,range);
    
    if (response.values) {
      return response.values;
    }
    console.log('Failed to get range of values from spreadsheet');

  } catch (err) {
    handleError(err)
  }
}



/**
 * @function handleError
 * @param {error}
 */
function handleError(err) {
    Logger.log(`Failed with error ${err.message}`);
    throw err;
 }

/**
 * @function expectToExist
 * A simple exists assertion check. Expects a value to exist. Errors if DNE.
 * @param {Any} value - a value that is expected to exist.
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
 * @param {any} actual - The actual value.
 * @param {any} expected - The expected value.
 */

function expectToEqual(actual, expected) {
  Logger.log(`TEST: actual: ${actual} = expected: ${expected}`);
  if (actual !== expected) {
    Logger.log(`TEST: ${expected} not equal to ${actual}`)
  }
}

/**
 * @function
 * @ params {string} key - Anything
 * @ return {any} value or null
 */
function getCache(key){

  var cache = CacheService.getScriptCache();
  var cached = cache.get(key)
  return cached || null;

}


/**
 * @function
 * @ params {string} key - a key name
 * @ params {any} value - a value 
 * @ params {number} expirationInSeconds - time that item will stay in cache
 */
function putCache(key,value, expirationInSeconds){

  var cache = CacheService.getScriptCache();
  var cached = cache.get(key)
  if (cached == null) {
    cache.put(key,value,expirationInSeconds);
  }
}












