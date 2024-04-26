const HOURSINADAY = 24;
const YEARSTARTNUMBER = 0;
const DAYLENGTH = 1;
const WEEKLENGTH = 7;
const MONTHLENGTH = 30;
const WEEKSINAMONTH = 4;
const TENMINUTES = 600;
const ONEHOUR = 3600;
const SIXHOURS = 21600;

/**
* Base calendar function
* @constructor
* @param {number} cellsPerHour - cells per hour
* @param {number} [row1=2] - first row in the range
* @param {number} [column1=2] - second row in the range
* @param {string} categoriesColumnHeader - header for column with list of categories
*/
function Calendar(row1 = 2, column1 = 2){

  if (typeof row1 !== 'number' || typeof column1 !== 'number') {
      throw new Error('Invalid input: numbers only');
    }

  try {

      this.id = SpreadsheetApp.getActiveSpreadsheet().getId();
      this.sheet = SpreadsheetApp.getActiveSheet();
      this.year = this.sheet.getSheetName();

      this.row1 = row1;
      this.column1 = column1;

      // use sheetname to get days in the year. 
      // last row is days
      this.days = daysIn(this.year); 
      this.rows = this.days;

      const wordInLastColumn = "Weekday";
      const lastColumn = finder(this.sheet, wordInLastColumn).getColumn() - this.column1;

      this.cellsPerHour = lastColumn/HOURSINADAY;

      // use cellsPerHour to calculate how many cells are in the full calendar range
      this.hours = HOURSINADAY;
      this.columns = (this.hours * this.cellsPerHour); 
    
      this.totalCells = (this.rows * this.columns);

      this.range = sheetRangeToAlNotation(this.year,this.row1,this.column1,this.rows,this.columns);
      this.calendar = readRange(this.id,this.range);
      
      this.rangeExpirations = Object.fromEntries([
        ['Today', TENMINUTES],
        ['Yesterday', SIXHOURS],
        ['Current Week', SIXHOURS],
        ['Previous Week', SIXHOURS],
        ['Current Month', SIXHOURS],
        ['Previous Month', SIXHOURS],
        ['This Year', SIXHOURS]
        ]);

      this.rangeArguments = Object.fromEntries([
        ['Today', [Array.from(this.calendar).length - DAYLENGTH, DAYLENGTH]],
        ['Yesterday', [Array.from(this.calendar).length - (2*DAYLENGTH), DAYLENGTH]],
        ['Current Week', [Array.from(this.calendar).length - WEEKLENGTH,WEEKLENGTH]],
        ['Previous Week', [Array.from(this.calendar).length - (WEEKLENGTH * 2),WEEKLENGTH]],
        ['Current Month', [Array.from(this.calendar).length - MONTHLENGTH,MONTHLENGTH]],
        ['Previous Month', [Array.from(this.calendar).length - (MONTHLENGTH * 2),MONTHLENGTH]],
        ['This Year', [YEARSTARTNUMBER ,Array.from(this.calendar).length - DAYLENGTH]]
        ]);

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
      return this.calendar.flat();
    }
    catch (err) {
      handleError(err)
    }

  }
  
/**
* @function getSheetCategories
* @param {string} categoriesColumnHeader - the header of the categories column in the sheet
* @param {boolean} [checkCache=false] - should cache be checked for a return value
* @return {Array<String>} the list of categories in a sheet
* */
Calendar.prototype.getSheetCategories = function(categoryColumnsHeader = "Categories",checkCache=false) {


  try {
      const key = `${this.sheet.getName()}_${categoryColumnsHeader}`;
      if (checkCache == true && getCache(key) != null) {
        return JSON.parse(getCache(key));
        }
      
      const categoriesHeader = finder(this.sheet,categoryColumnsHeader);
      
      //Begining row and column address
      const categoriesCol1 = categoriesHeader.getColumn();
      // Add one because we don't need col
      const categoriesRow1 = categoriesHeader.getRow() + 1;

      //Move down to last row in range of categories - 2(-1 since we added one to the first row + 
      // -1 since last we are passing the row difference)
      const rows = categoriesHeader.getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow() - 2;
      const columns = 1;     
      
      const categoriesA1 = sheetRangeToAlNotation(this.year,categoriesRow1,categoriesCol1,rows ,columns);
      const categories = readRange(this.id,categoriesA1).flat();
      putCache(key,categories,SIXHOURS);
      return categories;

  }
  catch (err) {
    handleError(err)
  }

}

  /**
   * @function calculations
   * @param {boolean} [checkCache=false] - should cache be checked for a return value
   * return {Object} object containing the calculation and the corresponding current number
   * */
Calendar.prototype.calendarCalculations = function(checkCache=false) {


    try {
        const key = `${this.year}`;
        if (checkCache == true && getCache(key) != null) {
          return getCache(key);
        }

        const hoursPassed = this.notesOfAYear().length/this.cellsPerHour;
        const daysPassed = Math.floor((hoursPassed/DAYLENGTH)/HOURSINADAY);
        const weeksPassed = Math.floor(daysPassed/WEEKLENGTH);
        const monthsPassed = Math.floor(weeksPassed/WEEKSINAMONTH)

        const calculations = Object.fromEntries([
        ["Percentage of the year",rounder(this.notesOfAYear().length/this.totalCells)],
        ["Hours passed", rounder(hoursPassed)],
        ["Days passed", Math.floor((hoursPassed/DAYLENGTH)/HOURSINADAY)],
        ["Weeks passed",weeksPassed],
        ["Months passed",monthsPassed]
        ])


        putCache(key,calculations,TENMINUTES);
        return calculations;

    }
      catch (err) {
        handleError(err)
    }
}

  /**
   * @function calendarSlicer
   * @param {number} dayNumber - day of the year (0,365)
   * @param {number} sliceLength - length of the range in days
   * return {Array<String>} array of all the notes for a single day
  */
Calendar.prototype.calendarSlicer = function(dayNumber, sliceLength) {

    if (typeof dayNumber !== 'number' || typeof sliceLength !== 'number') {
      throw new Error('Invalid input: numbers only');
    }
    
    try {
      return this.calendar.slice(dayNumber,dayNumber+sliceLength).flat()
    }

    catch (err) {
      handleError(err)
    }
}
  /**
   * @function categoryCalculations
  * @param {string} category - a category
  * @param {string} rangeName - name of a range to get data for
  * @param {string} calculation - a specific calculation to retrieve
  * @param {boolean} [checkCache=false] - should cache be checked for a return value
   * return {number} total notes for a category for today
  */
Calendar.prototype.categoryCalculations = function(category, rangeName, checkCache=false, calculation=null) {

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category myst be a string');
    }

    try {
          const key = `${this.year}_${category}_${rangeName}`;
          if (checkCache == true && getCache(key) != null) {
              return getCache(key);
            }

          const range = this.calendarSlicer(...this.rangeArguments[rangeName]);
          
          const calculations = Object.fromEntries([
              ["Total Notes",categorySum(range,category)],
              ["Percentage",rounder((categorySum(range,category)/range.length)*100)],
              ["Total Hours",rounder(categorySum(range,category)/this.cellsPerHour)],
              ["Average Time in Hours", rounder((categorySum(range,category)/this.cellsPerHour)/this.rangeArguments[rangeName][1])],
              ]);
          
          if (calculation != null) {
            return calculations[calculation];
          }
          
          putCache(key,calculations,this.rangeExpirations[rangeName]);
          return calculations;
    }
    
    catch (err) {
      handleError(err)
    }

 }







