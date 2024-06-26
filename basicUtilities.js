/**
 * @generator
 * @function range
 * @param {number} start - a number 
 * @param {number} end - a number
 * @yield {number} next number in the range 
 */
function* range(start,end) {
  while (start < end) {
    yield start++;
  }
}

/**
 * @function categorySum
 * @param {Array<String>} notes - an array of notes
 * @param {string} category - a category from the sheet
 * @return {number} total sum of all the notes of a category in the array
 */
function categorySum(notes, category) {
 return notes.filter((note) => note === category).length;
}

/**
 * @customfunction
 * @param {number} year - a year
 * @return {number} days in a new year
 * 
 */
function daysIn(year) {

if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
  return 366
}
return 365;

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
 * @param {number} columnNumber - a columnNumber from 0 to infinity
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
 * @param {number} row1 - first row in range
 * @param {number} column1 - first column in the range
 * @param {number} rows - number of rows you want
 * @param {number} columns - number of columns you want
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
 * @param {number} year, eg. 2024 
 * @param {number} row1 - first row in range
 * @param {number} column1 - first column in the range
 * @param {number} rows - number of rows you want
 * @param {number} columns - number of columns you want
 * @function columnToLetter
 */
function sheetRangeToAlNotation(year,row1, column1, rows,columns){              
    return `${year}!${convertToAlNotation(row1,column1,rows,columns)}`;
}


/**
 * @customfunction
 * @param {number} spreadsheetId - a spreadsheet id
 * @param {string} range - a range in A1 Notation
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
 * @param {string} key - Anything
 * @return {any} value or null
 */
function getCache(key){

  var cache = CacheService.getScriptCache();
  var cached = cache.get(key)
  return cached || null;

}


/**
 * @function putCache
 * @param {string} key - a key name
 * @param {any} value - a value 
 * @param {number} expirationInSeconds - time that item will stay in cache
 */
function putCache(key,value, expirationInSeconds){

  var cache = CacheService.getScriptCache();
  var cached = cache.get(key)
  if (cached == null) {
    cache.put(key,value,expirationInSeconds);
  }
}


/**
* @function finder
* @param {Sheet} sheet - a sheet to search
* @param {String} value - a string to find in the sheet
* @return {Range}
*/
function finder(sheet, value) {
  return sheet.createTextFinder(value).matchCase(true).matchEntireCell(true).findNext();
} 




/**
* @function rounder
* @param {number} num - number to round
* @param {number} decimals - decimals to round
* @returns {number} 
*/
function rounder(x, digits=2) {
  return Number.parseFloat(x).toFixed(digits);
}


/**
 * @function objectFromTwoLists
 * @param {Array} keys - list of keys
 * @param {Array} values - list of values for each key
 * @return {Object}
 */
function objectFromTwoLists(keys,values) {
  return Object.fromEntries(keys.map((entry) => [entry,values]))


/**
 * @generator
 * @function generateTimeRange
 * @param {number} startHour - an hour (0,24)
 * @param {number} endHour - an hour (0,24)
 * @param {number} step - minutes (0,60)
 * */
function* generateTimeRange(startHour,endHour,step) {

  // 
  var startHourInMinute = startHour * 60;
  const endHourInMinute = endHour * 60;

  // Range is inclusive, endHour is last value in range

  while (startHourInMinute <= endHourInMinute) {

    // getting hours of day in 0-24 format
    let hh = Math.floor(startHourInMinute / 60); 
    // getting minutes of the hour in 0-55 format
    let mm = startHourInMinute % 60; 

    let time = `${('0' + (hh % 24)).slice(-2)}:${('0' + mm).slice(-2)}`;
    yield time

    startHourInMinute += step;
    }

}
}








