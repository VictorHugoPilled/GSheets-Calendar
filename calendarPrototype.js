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
* @params {number} cellsPerHour - cells per hour
* @params {number} [row1=2] - first row in the range
* @params {number} [column1=2] - second row in the range
* @params {string} categoriesColumnHeader - header for column with list of categories
*/
function Calendar(cellsPerHour, row1 = 2, column1 = 2){

  if (typeof cellsPerHour !== 'number') {
      throw new Error('Invalid input: cellsPerHour must be a number');
    }

  try {

      this.id = SpreadsheetApp.getActiveSpreadsheet().getId();
      this.sheet = SpreadsheetApp.getActiveSheet();
      this.year = this.sheet.getSheetName();
      this.cellsPerHour = cellsPerHour;
      
      this.row1 = row1;
      this.column1 = column1;

      // use cellsPerHour to calculate how many cells are in the full calendar range
      this.hours = HOURSINADAY;
      this.columns = (this.hours * this.cellsPerHour); 
    
      // use sheetname to get days in the year. 
      // last row is days
      this.days = daysIn(this.year); 
      this.rows = this.days;

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
        ['Yesterday', [Array.from(this.calendar).length - DAYLENGTH, DAYLENGTH]],
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
Calendar.prototype.getSheetCategories = function(categoriesColumnHeader, checkCache=false) {

  if (typeof categoriesColumnHeader !== 'string') {
      throw new Error('Invalid input: categoriesColumnHeader must be a string');
    }

  try {

      const key = `${this.sheet.getName()}_${categoriesColumnHeader}`;
      if (checkCache == true && getCache(key) != null) {
        return getCache(key);
        }

      // Finds Les Catégories 
      const categories = this.sheet.createTextFinder(categoriesColumnHeader).matchCase(true).matchEntireCell(true).findNext();
      
      //Begining row and column address
      const categoriesCol1 = categories.getColumn();
      // Add one because we don't need col
      const categoriesRow1 = categories.getRow() + 1;

      //Move down to last row in range of categories - 2(-1 since we added one to the first row + 
      // -1 since last we are passing the row difference)
      const rows = categories.getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow() - 2;
      const columns = 1;     
      
      const categoriesA1 = sheetRangeToAlNotation(this.year,categoriesRow1,categoriesCol1,rows ,columns);
      const categoriesRange = readRange(this.id,categoriesA1).flat();
      putCache(key,categoriesRange,SIXHOURS);
      return categoriesRange;

  }
  catch (err) {
    handleError(err)
  }

}

  /**
   * @function calculations
   * @params {string} calculation - the name of the calculation
   * @param {boolean} [checkCache=false] - should cache be checked for a return value
   * return {number} percentage of the year that has passed
   * */
Calendar.prototype.calendarCalculations = function(calculation, checkCache=false) {

    if (typeof calculation !== 'string') {
      throw new Error('Invalid input: calculation must be a string');
    }

    try {
        const key = `${this.sheet.getName()}_${calculation}`;
        if (checkCache == true && getCache(key) != null) {
          return getCache(key);
        }

      const hoursPassed = this.notesOfAYear().length/this.cellsPerHour;
      const daysPassed = Math.floor((hoursPassed/DAYLENGTH)/HOURSINADAY);
      const weeksPassed = Math.floor(daysPassed/WEEKLENGTH);
      const monthsPassed = Math.floor(weeksPassed/WEEKSINAMONTH)

      const calculations = Object.fromEntries([
        ["Percentage of the year",this.notesOfAYear().length/this.totalCells],
        ["Hours passed", hoursPassed],
        ["Days passed", Math.floor((hoursPassed/DAYLENGTH)/HOURSINADAY)],
        ["Weeks passed",weeksPassed],
        ["Months passed",monthsPassed]
        ])

      const calculationsSet = new Set(Object.keys(calculations));

      if (calculationsSet.has(calculation)){
          const result = calculations[calculation];
          putCache(key,result,SIXHOURS);
          return result;
        }

      Logger.log(`Couldn't find ${calculation} in ${calculationsSet}`);
      return;
    }
    catch (err) {
      handleError(err)
    }
}

  /**
   * @function calendarSlicer
   * @params {number} dayNumber - day of the year (0,365)
   * @params {number} sliceLength - length of the range in days
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
   * @function categoryRangeCalculations
  * @params {string} category - a category
  * @params {string} rangeName - the name of the range
  * @params {string} calculation - the name of the calculation
  * @param {boolean} [checkCache=false] - should cache be checked for a return value
   * return {number} total notes for a category for today
  */
Calendar.prototype.categoryRangeCalculations = function(category, rangeName, calculation, checkCache=false) {

    if (typeof category !== 'string' || typeof category !== 'string' || typeof category !== 'string') {
      throw new Error('Invalid input: string inputs only');
    }

    try {

        const key = `${category}_${rangeName}_${this.cellsPerHour}_${calculation}`;
        if (checkCache == true && getCache(key) != null) {
          return getCache(key);
        }

        const rangeArgumentsSet = new Set(Object.keys(this.rangeArguments));

        if (!(rangeArgumentsSet.has(rangeName))){
          Logger.log(`Couldn't find ${rangeName}`);
          return;
        }
        
        const range = this.calendarSlicer(...this.rangeArguments[rangeName]);

        const calculations = Object.fromEntries([
        ["Total Notes",categorySum(range,category)],
        ["Percentage",(categorySum(range,category)/range.length)*100],
        ["Total Hours",categorySum(range,category)/this.cellsPerHour],
        ["Average Time in Hours", (categorySum(range,category)/this.cellsPerHour)/this.rangeArguments[rangeName][1]],
        ]);
        
        const calculationsSet = new Set(Object.keys(calculations));
        
        if (!(calculationsSet.has(calculation))) {
          Logger.log(`Couldn't find ${calculation} in ${calculationsSet}`);
          return;
        }
        
        const total = calculations[calculation];
        putCache(key,total,this.rangeExpirations[rangeName]);
        return total;
    }
    
    catch (err) {
      handleError(err)
    }

 }





