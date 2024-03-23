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
 * @param {String} text - any text
 * @param {Range} range - a range to search
 * @return {Range} Range of the cell
 * @customfunction
 */

function finder(text, range){

  if (typeof text !== 'string') {
      throw new Error('Invalid input: text must be a string');
    }

  try {
    return range.createTextFinder().TextFinder(text).matchCase(true).
    matchEntireCell(true).findNext();
  }
  catch (err) {
    Logger.log(`Failed with error ${err.message}`);
  }
}

/**
 * @param {Number} difference 
 * @param {Date} a date, default argument is today
 * @return {Date} a date
 */
function dateDifferenceCalculator(difference, date = new Date()){

  if (typeof difference !== 'number') {
      throw new Error('Invalid input: difference must be a number');
    }
  
  if (typeof date !== 'date') {
    throw new Error('Invalid input: date must be a date');
  }
  
  // dd/mm/yyyy
  const millisPerDay = 1000 * 60 * 60 * 24;
  const totalDifference = difference * millisPerDay;
  const newDate = new Date(date.getTime() - 7 * millisPerDay);
  const timeZone = Session.getScriptTimeZone();
  const format = "dd/mm/yyyy";
  return Utilities.formatDate(newDate, timeZone,format);


}





