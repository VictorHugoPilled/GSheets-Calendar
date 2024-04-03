function testcalendarCalculationsHTML() {

  expectToExist(calendarCalculationsHTML().getContent().length);

}


function testcategoryCalculationsHTML() {
  
  const calendar = new Calendar();

  // for each category 
  const categories = calendar.getSheetCategories();

  // get the ranges for the buttons
  const ranges = Object.keys(calendar.rangeArguments);

  categories.forEach((category) => {
    
    ranges.forEach((rangeName) => {
      expectToExist(categoryCalculationsHTML(category,rangeName).getContent().length);

  })

  })


}

