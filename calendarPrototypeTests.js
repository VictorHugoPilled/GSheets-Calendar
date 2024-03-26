/**
* 
* @function testCalendar
*/
function testCalendar(){

  // testing 2024 calendar
  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour,categoriesColumnHeader).getCalendar();

  // test the calendar using Al notation
  const value1 = calendar.getCell(1, 1).getA1Notation();
  const expectedvalue1 = "B2";
  expectToEqual(value1, expectedvalue1);


  const expectlastRow = daysIn(calendar.year) + 1;
  const lastRow = calendar.getLastRow() - 1;
  expectToEqual(lastRow, expectlastRow);

  const lastColumn = calendar.getLastColumn() - 1;
  const hours = 24;
  const expectlastColumn = cellsPerHour * hours;
  expectToEqual(lastColumn, expectlastColumn);

}

/**
* 
* @function testGetCalendarArray
*/

function testGetCalendarArray(){

    const cellsPerHour = 6;
    const categoriesColumnHeader = "Les Catégories";

    const calendar = new Calendar(cellsPerHour,categoriesColumnHeader);
    
    expectToExist(calendar.getCalendarArray().length)

}

/**
* 
* @function testgetSheetCategories
*/

function testgetSheetCategories(){

    // Needs to be hardcoded
    const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];

    const cellsPerHour = 6;
    const categoriesColumnHeader = "Les Catégories";

    // store the calendar
    const calendar = new Calendar(cellsPerHour,categoriesColumnHeader);

    const sheetCategories = new Set(calendar.getSheetCategories());
    expectToEqual(categories.filter((category) => sheetCategories.has(category)).length, categories.length);
    
}


function testnotesOfAYear(){

  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour,categoriesColumnHeader);
 
    
  // will need to make this variable
  // Get the year, days in the year 
  const days = daysIn(calendar.year);
  const hours = 24; 

  // Days in a year * Hours in a day * Cells in an hour
  // 52704 for 2024
  const totalNotes = days * hours * calendar.cellsPerHour;

  // assert that total notes is correct using length
  expectToEqual(calendar.notesOfAYear().length, totalNotes);
  
}

function testfilledNotes() {
    
  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour,categoriesColumnHeader);
  
  expectToExist(calendar.filledNotes().length);


}

function testcategoryNotes(){

  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

  // for each category 
  const categories = calendar.getSheetCategories();

  // confirm that all categories return a value
  categories.forEach((category) =>  expectToExist(calendar.categoryNotes(category)));
    
    
}

function testhoursPerCategory(){
    
  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

  // for each category 
  const categories = calendar.getSheetCategories();
    
  // confirm that all categories return a value
  categories.forEach((category) =>  expectToExist(calendar.hoursPerCategory(category)));

  }
  

function testpercentagePerCategory() {

  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

  // for each category 
  const categories = calendar.getSheetCategories();
    
  // confirm that all categories return a value
  categories.forEach((category) =>  expectToExist(calendar.percentagePerCategory(category)));
    
  }
  


function testpercentageOfTheYear() {
  
  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

  expectToExist(calendar.percentageOfTheYear());

    
  }


function testhoursRegistered(){

  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

  expectToExist(calendar.hoursRegistered());
}

function testdaysPassed(){

  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

  expectToExist(calendar.daysPassed());

}

function testgetDayNumber(){

    const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";
    
    // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

  // Today is the last filled row in the 2d array of getvalues
  const todayNumber = calendar.daysPassed();
  
   // Up to today, all columns should be filled
   Array.from(range(0,todayNumber)).forEach((number) => expectToExist(calendar.getDayNumber(number)));
}

function testweeksPassed() {

  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

  expectToExist(calendar.weeksPassed());

}


function testaDay() {

  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

  // Today is the last filled row in the 2d array of getvalues
  const todayNumber = calendar.daysPassed();
  const hours = 24;
  const columns = hours * cellsPerHour;

  // Up to today, all columns should be filled
  Array.from(range(0,todayNumber)).forEach((number) => expectToEqual(calendar.aDay(number).length,columns));

  
  

}

// start here
function testdayOfACategory() {


  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

  // for each category 
  const categories = calendar.getSheetCategories();
  

  categories.forEach((category) => expectToExist(calendar.dayOfACategory(randomNumber(calendar.daysPassed()),category)));
  

}

function testdayOfACategorylastindex() {


  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

    // only categories we can expect to not return 0 for a given day
  const categories = ["Le sommeil", "Le temps d'arrêt", "La productivité"];


  const randomDayNumber = randomNumber(calendar.daysPassed());

  categories.forEach((category) => expectToExist(calendar.dayOfACategorylastindex(randomDayNumber,category)));

}

function testtodayOfACategory() {

  
  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

    // for each category 
  const categories = calendar.getSheetCategories();

  categories.forEach((category) => expectToExist(calendar.todayOfACategory(category)));

}

function testyesterdayOfACategory() {


  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

    // for each category 
  const categories = calendar.getSheetCategories();

  categories.forEach((category) => expectToExist(calendar.yesterdayOfACategory(category)));

}

function testcalendarSlicer(){

  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";
  const hours = 24;

  const expectedlengthpartial = cellsPerHour * hours;

    // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);


  // For a random day, can we get a correctly sized slice, testing slice sizes of 1 to 30
  Array.from(range(1,30)).forEach((num) => expectToEqual(calendar.calendarSlicer(randomNumber(365),num).length,expectedlengthpartial * num))


} 

function testweekSlice() {
  
  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";
  const hours = 24;
  const weeklength = 7;

  const expectedlength = cellsPerHour * hours * weeklength;

    // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

  // We want each slice to have the possibility of being 7 days long
  const testRange = daysIn(calendar.year) - 7;

  // Try five random days
  Array.from(range(0,5)).forEach(() =>  expectToEqual(calendar.weekSlice(randomNumber(testRange)).length,expectedlength));
  
}

function testweekSliceOfACategory() {


  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  const weeklength = 7;

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

    // for each category 
  const categories = calendar.getSheetCategories();
  

  categories.forEach((category) => expectToExist(calendar.weekSliceOfACategory(randomNumber(calendar.daysPassed()-weeklength),category)));

}

function testcurrentRunningWeekSliceOfACategory() {
  
  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

    // for each category 
  const categories = calendar.getSheetCategories();

  categories.forEach((category) => expectToExist(calendar.currentRunningWeekSliceOfACategory(category)));

}

function testpreviousRunningWeekSliceOfACategory() {
  
  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);


  const categories = calendar.getSheetCategories();

  categories.forEach((category) => expectToExist(calendar.previousRunningWeekSliceOfACategory(category)));

}

function testmonthSlice() {

  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";
  const hours = 24;
  const weeklength = 30;

  const expectedlength = cellsPerHour * hours * weeklength;

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

  // We want each slice to have the possibility of being 30 days long
  const testRange = daysIn(calendar.year) - 30;

  // Try five random days
  Array.from(range(0,5)).forEach(() =>  expectToEqual(calendar.monthSlice(randomNumber(testRange)).length,expectedlength));
  

}

function testmonthSliceOfACategory() {

  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  const weeklength = 7;

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);


  // for each category 
  const categories = calendar.getSheetCategories();
  
  
  const randomDayNumber = randomNumber(calendar.daysPassed()-weeklength);

  categories.forEach((category) => expectToExist(calendar.monthSliceOfACategory(randomDayNumber,category)));

}

function testcurrentRunningMonthSliceOfACategory() {



  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

    // for each category 
  const categories = calendar.getSheetCategories();
  

  categories.forEach((category) => expectToExist(calendar.currentRunningMonthSliceOfACategory(category)));

}

function testpreviousRunningMonthSliceOfACategory() {


  
  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour, categoriesColumnHeader);

    // for each category 
  const categories = calendar.getSheetCategories();

  categories.forEach((category) => expectToExist(calendar.previousRunningMonthSliceOfACategory(category)));

}



