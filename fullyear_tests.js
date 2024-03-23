function testCalendar(){

  // testing 2024 calendar
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour).getCalendar();

  // get last row and column of calendar
  const lastRow = calendar.getLastRow() - 1;
  const lastColumn = calendar.getLastColumn() - 1;

  // test the calendar using Al notation
  const value1 = calendar.getCell(1, 1).getA1Notation();
  let expectedvalue1 = "B2";
  expectToEqual(value1, expectedvalue1);

  const value2 = calendar.getCell(lastRow, 1).getA1Notation();
  let expectedvalue2 = "B367";
  expectToEqual(value2, expectedvalue2);


  const value3 = calendar.getCell(1, lastColumn).getA1Notation();
  let expectedvalue3 = "EO2";
  expectToEqual(value3, expectedvalue3);


  // should return the cell at EO366
  const value4 = calendar.getCell(lastRow, lastColumn).getA1Notation();
  let expectedvalue4 = "EO367";
  expectToEqual(value4, expectedvalue4);

}


function testnotesOfAYear(){

  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);
  
    
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

function testcategoryNotes(){

  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  // for each category 
  const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];

  // confirm that all categories return a value
  categories.forEach((category) =>  expectToExist(calendar.categoryNotes(category)));
    
    
}

function testhoursPerCategory(){
    
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  // for each category 
  const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];
    
  // confirm that all categories return a value
  categories.forEach((category) =>  expectToExist(calendar.hoursPerCategory(category)));

  }
  

function testcategoryPercentage() {

  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  // for each category 
  const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];
    
  // confirm that all categories return a value
  categories.forEach((category) =>  expectToExist(calendar.categoryPercentage(category)));
    
  }
  

function testfilledNotes() {
    
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);
  
  expectToExist(calendar.filledNotes());


}


function testpercentageOfTheYear() {
  
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.percentageOfTheYear());

    
  }


function testhoursRegistered(){

  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.hoursRegistered());
}

function testdaysPassed(){

  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.daysPassed());

}

function testweeksPassed() {
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.weeksPassed());

}


// Start here
function testaDay() {

  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  // Today is the last filled row in the 2d array of getvalues
  const todayNumber = calendar.daysPassed();
  const columns = calendar.columns();

  // Get a random number between today and the begining of the year
  const randomNumber = randomDay(todayNumber);

  // All columns should be filled
  expectToEqual(calendar.aDay(randomNumber).length,columns)

}

function testdayOfACategory() {

  // for each category 
  const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];
  
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.dayOfACategory(1,"Le sommeil"))

}

function testdayOfACategorylastindex() {

  // only categories we can expect to not return 0 for a given day
  const categories = ["Le sommeil", "Le temps d'arrêt", "La productivité"];

  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.dayOfACategory(1,"Le sommeil"))

}

function testtodayOfACategory() {

  // for each category 
  const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];
  
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.dayOfACategory(1,"Le sommeil"))

}

function testyesterdayOfACategory() {

  // for each category 
  const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];
  
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.dayOfACategory(1,"Le sommeil"))

}

function testweekSlice() {

  // for each category 
  const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];
  
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.dayOfACategory(1,"Le sommeil"))

}

function testweekSliceOfACategory() {

  // for each category 
  const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];
  
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.dayOfACategory(1,"Le sommeil"))

}

function testcurrentRunningWeekSliceOfACategory() {

  // for each category 
  const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];
  
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.dayOfACategory(1,"Le sommeil"))

}

function testpreviousRunningWeekSliceOfACategory() {

  // for each category 
  const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];
  
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.dayOfACategory(1,"Le sommeil"))

}

function testmonthSlice() {

  // for each category 
  const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];
  
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.dayOfACategory(1,"Le sommeil"))

}

function testmonthSliceOfACategory() {

  // for each category 
  const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];
  
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.dayOfACategory(1,"Le sommeil"))

}

function testcurrentRunningMonthSliceOfACategory() {

  // for each category 
  const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];
  
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.dayOfACategory(1,"Le sommeil"))

}

function previousRunningMonthSliceOfACategory() {

  // for each category 
  const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];
  
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.dayOfACategory(1,"Le sommeil"))

}



