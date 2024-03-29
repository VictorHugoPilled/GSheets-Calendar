/**
 * @function onOpen
 * Creates menu when sheets open
 */
function onOpen() {
  SpreadsheetApp.getUi()
  .createMenu("Show statistics")
  .addItem("Open", "showSidebar")
  .addToUi();

}


/**
 * @function openDialog
 * 
 */
function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Page');
  SpreadsheetApp.getUi()
  .showSidebar(html);

}




/**
* @function categoryNotes
* @params {string} category - a category
* @params {string} rangeName - the name of the range
* @params {string} calculation - the name of the calculation
* @params {number} cellsPerHour - cells per hour in the calendar
* return {number} sum of all the notes from a single category for a year
 * */
function categoryNotes(category,rangeName,calculation,cellsPerHour){

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {
      const calendar = new Calendar(cellsPerHour);
      return calendar.categoryRangeCalculations(category,rangeName,calculation)
    }
    catch (err) {
      handleError(err);
    }
    
}

/**
* @function categoryNotes
* @params {string} calculation - the name of the calculation
* @params {number} cellsPerHour - cells per hour in the calendar
* return {number} sum of all the notes from a single category for a year
 * */
function calendarNotes(calculation,cellsPerHour){

    if (typeof calculation !== 'string') {
      throw new Error('Invalid input: calculation must be a string');
    }

    if (typeof cellsPerHour !== 'number') {
      throw new Error('Invalid input: cells per hour must be a number');
    }

    try {
      const calendar = new Calendar(cellsPerHour);
      return calendar.calendarCalculations(calculation)
    }
    catch (err) {
      handleError(err);
    }
    
}





