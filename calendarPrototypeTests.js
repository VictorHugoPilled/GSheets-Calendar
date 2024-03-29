function testCalendar(){

    const cellsPerHour = 6;
    const testCalendar = new Calendar(cellsPerHour);
    
    expectToExist(testCalendar.notesOfAYear().length);

}


function testgetSheetCategories(){

    // Needs to be hardcoded
    const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];

    const cellsPerHour = 6;
    const categoriesColumnHeader = "Les Catégories";

    // store the calendar
    const calendar = new Calendar(cellsPerHour);

    const sheetCategories = new Set(calendar.getSheetCategories(categoriesColumnHeader));
    expectToEqual(categories.filter((category) => sheetCategories.has(category)).length, categories.length);
    
}
  

function testpercentageOfTheYear() {
  
  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.calendarCalculations("Percentage of the year"));

    
  }


function testhoursPassed(){

  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.calendarCalculations("Hours passed"));
}

function testdaysPassed(){

  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.calendarCalculations("Days passed"));
}


function testweeksPassed(){

  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.calendarCalculations("Weeks passed"));
}

function testmonthsPassed(){

  const cellsPerHour = 6;

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  expectToExist(calendar.calendarCalculations("Months passed"));
}



function testcalendarSlicer(){

  const cellsPerHour = 6;
  const hours = 24;

  const expectedlengthpartial = cellsPerHour * hours;

    // store the calendar
  const calendar = new Calendar(cellsPerHour);


  // For a random day, can we get a correctly sized slice, testing slice sizes of 1 to 30
  Array.from(range(1,30)).forEach((num) => expectToEqual(calendar.calendarSlicer(num,num).length,expectedlengthpartial * num))


} 


function testtotalNotesOfACategory() {

  
  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  // for each category 
  const categories = calendar.getSheetCategories(categoriesColumnHeader);
  categories.forEach((category) => expectToExist(calendar.categoryRangeCalculations(category, "Today", "Total Notes")));

}

function testpercentageOfACategory() {

  
  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  // for each category 
  const categories = calendar.getSheetCategories(categoriesColumnHeader);
  categories.forEach((category) => expectToExist(calendar.categoryRangeCalculations(category, "Current Week", "Percentage")));

}


function testaverageOfACategory() {

  
  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  // for each category 
  const categories = calendar.getSheetCategories(categoriesColumnHeader);
  categories.forEach((category) => expectToExist(calendar.categoryRangeCalculations(category, "Previous Week", "Average Time in Hours")));

}

function testtotalHoursOfACategory() {

  
  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  // for each category 
  const categories = calendar.getSheetCategories(categoriesColumnHeader);
  categories.forEach((category) => expectToExist(calendar.categoryRangeCalculations(category, "Current Month", "Total Hours")));

}

