/**
 * // convert columns to an object where column numbers are keys and times are values
 * // this way when we get the last index of sleep we can turn it into a time
 * Base calendar function
 * @constructor
 * @params {Number} cellsPerHour - cells per hour
 */

function Calendar(cellsPerHour){

  if (typeof cellsPerHour !== 'number') {
      throw new Error('Invalid input: cellsPerHour must be a number');
    }

  try {

    this.sheet = SpreadsheetApp.getActiveSheet();
    this.year = this.sheet.getSheetName();
    this.cellsPerHour = cellsPerHour;
    
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

    this.categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
      "Les voyages", "Le skating"];
    
    // get calendar range
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
   * @function notesOfAYeear
   * @return {Array<String>} all notes in a 1D array
   */
Calendar.prototype.notesOfAYear = function() {

    // flat can be used to flatten 2d array into one array even though it's not recognized;
    try {
      return this.getCalendarArray().flat();
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
      return categorySum(this.notesOfAYear(),category);
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
Calendar.prototype.categoryPercentage = function(category) {
    
    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {
      // filled notes only
      this.filled = this.categoryNotes(category);

      // the full calendar
      this.fullyear = this.filledNotes();
      
      // divide the amount of notes so far by
      // the size of the full calendar
      return filled/fullyear;

    }

    catch (err) {
      handleError(err)
    }
    
    }
  
  /**
   * @function filledNotes
   * @return {Number} sum of all filled in notes in a 1D array
   */
Calendar.prototype.filledNotes = function() {
    
    this.categoriesSet = new Set(this.categories);

    try {
      return this.notesOfAYear().filter((x) => categories.has(x)).length;
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
      
      // filled notes only
      this.fillednotes = this.filledNotes();
      
      // the full calendar
      this.allnotes = this.notesOfAYear().length;
      // divide the amount of notes so far by
      // the size of the full calendar
      return fillednotes/allnotes;

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

      // filled notes only
      this.filled = this.filledNotes();

      // Divide the amount of notes so far by cells per hour
      return Math.floor(filled/this.cellsPerHour);

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
      
      // use floor to round down calculation
      this.hours = 24;

      // Divide the total amount hours counted so far by year hour
      return Math.floor(this.hoursRegistered()/hours);

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

      // use floor to round down calculation
      this.weeklength = 7;
      // Divide the total amount so far by the amount of weeks in a year
      return Math.floor(this.daysPassed()/weeklength);

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
  * @params {String} category - a category
   * return {Number} total notes for a category for today
  */
Calendar.prototype.todayOfACategory = function(category) {

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {

      // Today is the last filled row in the 2d array of getvalues
      this.todayNumber = this.getCalendarArray().length-1;
      return this.dayOfACategory(todayNumber,category);
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
      this.yesterdayNumber = this.getCalendarArray().length-2;
      return this.dayOfACategory(yesterdayNumber,category);
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
  
      this.weekAgoNumber = this.getCalendarArray().length-8;
      return this.weekSliceOfACategory(weekAgoNumber,category);
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

      this.twoweeksAgoNumber = this.getCalendarArray().length-16;
      return this.weekSliceOfACategory(twoweeksAgoNumber,category);
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
      this.onemonthAgoNumber = this.getCalendarArray().length-30;
      return this.monthSliceOfACategory(onemonthAgoNumber,category);
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
      this.twoMonthsAgoNumber = this.getCalendarArray().length-60;
      return this.monthSliceOfACategory(twoMonthsAgoNumber,category);
    }

    catch (err) {
      handleError(err)
    }
}