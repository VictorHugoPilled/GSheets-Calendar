function testcategoryNotes() {

  
  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";

  // store the calendar
  const calendar = new Calendar(cellsPerHour);

  // for each category 
  const categories = calendar.getSheetCategories(categoriesColumnHeader);
  
  categories.forEach((category) => expectToExist(categoryNotes(category, "Current Week", "Average Time in Hours", cellsPerHour)));

}

function testcalendarNotes() {

  
  const cellsPerHour = 6;

  console.log(calendarNotes("Days passed", cellsPerHour))

}

