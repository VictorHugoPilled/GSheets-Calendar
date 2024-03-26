/**
* Base calendar function
* @constructor
* @params {Number} cellsPerHour - cells per hour
* @params {String} categoriesColumnHeader - Header for column with list of categories
*/
function Calendar(cellsPerHour,categoriesColumnHeader){

  if (typeof cellsPerHour !== 'number') {
      throw new Error('Invalid input: cellsPerHour must be a number');
    }
  
  if (typeof categoriesColumnHeader !== 'string') {
      throw new Error('Invalid input: categoriesColumnHeader must be a string');
    }

  try {

      this.sheet = SpreadsheetApp.getActiveSheet();
      this.year = this.sheet.getSheetName();
      this.cellsPerHour = cellsPerHour;
      this.categoriesColumnHeader = categoriesColumnHeader;
      
      // calendars always start at B2
      this.row1 = 2;
      this.column1 = 2;

      // use cellsPerHour to calculate how many cells are in the full calendar range
      this.hours = 24;
      this.columns = (this.hours * this.cellsPerHour); 
    
      // use sheetname to get days in the year. 
      // last row is days
      this.days = daysIn(this.year); 
      this.rows = this.days;

      // for running calculations
      this.weeklength = 7;
      this.monthLength = 30;
      
      // getRange(row, column, numRows, numColumns)
      this.Calendar = this.sheet.getRange(this.row1,this.column1, this.rows, this.columns);

  }

  catch (err) {
    handleError(err)
  }

}

/**
* @function getCalendar
* @return {Range} the full calendar
* */
Calendar.prototype.getCalendar = function() {
    
    try {
      return this.Calendar;
    }

    catch (err) {
      handleError(err)
    }

  }

/**
* @function getCalendarArray
* @return {Array<Array<String>>} the full calendar as a 2d array
* */
Calendar.prototype.getCalendarArray = function() {
    
    try {
      return this.getCalendar().getValues();
    }

    catch (err) {
      handleError(err)
    }

  }
  
/**
* @function getSheetCategories
* @return {Array<String>} the list of categories in a sheet
* */
Calendar.prototype.getSheetCategories = function() {

  try {
      // Finds Les Catégories 
      // use finder
      const categories = this.sheet.createTextFinder(this.categoriesColumnHeader).matchCase(true).matchEntireCell(true).findNext();
      
      //Begining row and column address
      const categoriesCol = categories.getColumn();
      // Add one because we don't need col
      const categoriesRow = categories.getRow() + 1;

      //Move down to last row in range of categories - 2(-1 since we added one to the first row + 
      // -1 since last we are passing the row difference)
      const rangeLength = categories.getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow() - 2;

      //return getSheetValues(startRow, startColumn, numRows, numColumns)
      // flat can be used to flatten 2d array into one array even though it's not recognized;
      return this.sheet.getRange(categoriesRow, categoriesCol, rangeLength, 1).getValues().flat();

  }
  catch (err) {
    handleError(err)
  }


}

/**
* @function notesOfAYeear
* @return {Array<String>} all notes in a 1D array
*/
Calendar.prototype.notesOfAYear = function() {

    try {
      return this.getCalendarArray().flat();
    }
    catch (err) {
      handleError(err)
    }

  }


  /**
   * @function filledNotes
   * @return {Array<string>} all filled in notes in a 1D array
   */
Calendar.prototype.filledNotes = function() {
    
    try {

      const sheetCategoriesSet = new Set(this.getSheetCategories());
      return this.notesOfAYear().filter((x) => sheetCategoriesSet.has(x));
    }
    catch (err) {
      handleError(err)
    }

  }
  

/**
* @function categoryNotes
* @params {String} category - a category
* return {Number} sum of all the notes from a single category for a year
 * */
Calendar.prototype.categoryNotes = function (category){

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {
      return categorySum(this.filledNotes(),category);
    }
    catch (err) {
      handleError(err);
    }
    
}

/** 
* @function hoursPerCategory
* @params {String} category - a category
* return {Number} sum of all the notes from a single category / cellsPerHour
*/
Calendar.prototype.hoursPerCategory = function(category){

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {
      return this.categoryNotes(category) / this.cellsPerHour;
    }
      
    catch (err) {
      handleError(err)
    }

    }
  
  /**
   * @function categoryPercentage
   * @params {String} a category
   * return {Number} percentage of the year by category
   * */
Calendar.prototype.percentagePerCategory = function(category) {
    
    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {

      return this.categoryNotes(category)/this.filledNotes().length;      

    }

    catch (err) {
      handleError(err)
    }
    
    }


  /**
   * @function percentageOfTheYear
   * return {Number} percentage of the year that has passed
   * */
Calendar.prototype.percentageOfTheYear = function() {
    try {
      
      // divide the amount of notes so far by
      // the size of the full calendar
      return this.filledNotes().length/this.notesOfAYear().length;

    }
    catch (err) {
      handleError(err)
    }

    }

  /**
   * @function hoursRegistered
  * return {Number} hours that haved passed by this year
  */
Calendar.prototype.hoursRegistered = function(){

    try {
	
      // Divide the amount of notes so far by cells per hour
      return this.filledNotes().length/this.cellsPerHour;

    }

    catch (err) {
      handleError(err)
    }

}

  /**
   * @function daysPassed
  * return {Number} days that haved passed by this year, rounded down
  */
Calendar.prototype.daysPassed = function(){

    try {
      
      // Divide the total amount hours counted so far by year hour
      return Math.floor(this.hoursRegistered()/this.hours);

    }
    catch (err) {
      handleError(err)
    }
}

/**
 *@function getDayNumber
 *@params {Number} get the number of a specific day in the range from (0,today)
 *@return {Number} day of the year (0,365)
 **/

Calendar.prototype.getDayNumber = function (difference) {
  
    try {
      return this.daysPassed() - difference;
    }

    catch (err) {
      handleError(err)
    }

}

  /**
   * @function weeksPassed
  * return {Number} weeks that haved passed by this year
  */
Calendar.prototype.weeksPassed = function() {
    try {

      return Math.floor(this.daysPassed()/this.weeklength);

    }
    catch (err) {
      handleError(err)
    }
}
  /**
   * @function daySlice
   * @params {Number} dayNumber - day of the year (0,365)
   * return {Array<String>} array of all the notes for a single day
  */
Calendar.prototype.aDay = function(dayNumber) {

    if (typeof dayNumber !== 'number') {
      throw new Error('Invalid input: dayNumber must be a number');
    }

    try {
      return this.getCalendarArray()[dayNumber];
    }

    catch (err) {
      handleError(err)
    }
}

  /**
   * @function dayOfACategory
  * @params {Number} dayNumber - day of the year (0,365)
  * @params {String} category - a category
   * return {Number} sum of the array of all notes from a specific for a specific day
  */
Calendar.prototype.dayOfACategory = function(dayNumber, category) {

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {
      return categorySum(this.aDay(dayNumber),category);
    }
    catch (err) {
      handleError(err)
    }
}
  /**
   * @function dayOfACategorylastindex
  * @params {Number} dayNumber - day of the year (0,365)
  * @params {String} category - a category
   * return {Number} last column of a note from from a particular day
  */
Calendar.prototype.dayOfACategorylastindex = function(dayNumber, category) {

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {
      return this.aDay(dayNumber).lastIndexOf(category)
    }
    catch (err) {
      handleError(err)
    }
}
  /**
   * @function todayOfACategory
  * @params {String} category - a category
   * return {Number} total notes for a category for today
  */
Calendar.prototype.todayOfACategory = function(category) {

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {

      // Today is the last filled row in the 2d array of getvalues
      return this.dayOfACategory(this.getDayNumber(0),category);
    }

    catch (err) {
      handleError(err)
    }
  }
  /**
   * @function yesterdayOfACategory
  * @params {String} category - a category
  * return {Number} sum total notes for a category for yesterday
  */
Calendar.prototype.yesterdayOfACategory = function(category) {

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {

      // Today is the last filled row in the 2d array of getvalues
      
	    return this.dayOfACategory(this.getDayNumber(1),category);
    }

    catch (err) {
      handleError(err)
    }
  }

  /**
   * @function calendarSlicer
   * @params {Number} dayNumber - day of the year (0,365)
   * @params {Number} daysToAdd - day of the year (0,365)
   * return {Array<String>} array of all the notes for a single day
  */
Calendar.prototype.calendarSlicer = function(dayNumber, daysToAdd) {

    if (typeof dayNumber !== 'number' || typeof daysToAdd !== 'number') {
      throw new Error('Invalid input: numbers only');
    }
    
    try {
      return this.getCalendarArray().slice(dayNumber,dayNumber+daysToAdd).flat()
    }

    catch (err) {
      handleError(err)
    }
}
  /**
   * @function weekSlice
   * @params {Number} dayNumber - day of the year (0,365)
   * return {Array<String>} array of all the notes for a single day
  */
Calendar.prototype.weekSlice = function(dayNumber) {

    if (typeof dayNumber !== 'number') {
      throw new Error('Invalid input: dayNumber must be a number');
    }

    try {
      return this.calendarSlicer(dayNumber, 7);
    }

    catch (err) {
      handleError(err)
    }
}
  /**
   * @function weekSliceOfACategory
  * @params {Number} dayNumber - day of the year (0,365)
  * @params {String} category - a category
  * return {Number} total notes for a category for a week
  */
Calendar.prototype.weekSliceOfACategory = function(dayNumber, category) {

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {
      return categorySum(this.weekSlice(dayNumber),category);
    }

    catch (err) {
      handleError(err)
    }
}

  /**
   * @function currentRunningWeekSliceOfACategory
   * @params {String} category - a category
   * return {Number} total notes for a category in the last running week
  */
Calendar.prototype.currentRunningWeekSliceOfACategory = function(category) {

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {
      return this.weekSliceOfACategory(this.getDayNumber(8),category);
    }

    catch (err) {
      handleError(err)
    }
}
  /**
   * @function previousRunningWeekSliceOfACategory
   * @params {String} category - a category
   * return {Number} total notes for a category in the last running week
  */
Calendar.prototype.previousRunningWeekSliceOfACategory = function(category) {

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {
      return this.weekSliceOfACategory(this.getDayNumber(15),category);
    }

    catch (err) {
      handleError(err)
    }
}

  /**
   * @function monthSlice
   * @params {Number} dayNumber - day of the year (0,365)
   * return {Array<String>} array of all the notes for a single day
  */

Calendar.prototype.monthSlice = function(dayNumber) {

    if (typeof dayNumber !== 'number') {
      throw new Error('Invalid input: dayNumber must be a number');
    }

    try {
      return this.calendarSlicer(dayNumber,30);
    }

    catch (err) {
      handleError(err)
    }
}

  /**
   * @function monthSliceOfACategory
  * @params {Number} dayNumber - day of the year (0,365)
  * @params {String} category - a category
  * return {Number} total notes for a category for a week
  */

Calendar.prototype.monthSliceOfACategory = function(dayNumber, category) {

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {
      return categorySum(this.monthSlice(dayNumber),category);
    }

    catch (err) {
      handleError(err)
    }
}

  /**
   * @function currentRunningMonthSliceOfACategory
   * @params {String} category - a category
   * return {Number} total notes for a category in the last running month
  */
Calendar.prototype.currentRunningMonthSliceOfACategory = function(category) {

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {
      // Today is the last filled row in the 2d array of getvalues
      return this.monthSliceOfACategory(this.getDayNumber(31),category);
    }

    catch (err) {
      handleError(err)
    }
}

  /**
   * @function previousRunningMonthSliceOfACategory
   * @params {String} category - a category
   * return {Number} total notes for a category in the last running month
  */
Calendar.prototype.previousRunningMonthSliceOfACategory = function(category) {

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }
    try {
      // Today is the last filled row in the 2d array of getvalues
      return this.monthSliceOfACategory(this.getDayNumber(62),category);
    }

    catch (err) {
      handleError(err)
    }
}
