
function testcreateButtons(){

  const array = ["Yellow", "Blue", "Yellow", "Green", "Red", "Yellow", "Orange", "Blue", "Red"];

  const func = `google.script.run.popupCreator(this.value)`;

  expectToExist(createButtons(array,func).getContent().length);

  
}

function testcalendarNotes() {

  expectToExist(calendarNotes().getContent().length);

}


function testcategoryNotes() {
  
  // for each category 
  const categories = calendar.getSheetCategories();

  categories.forEach((category) => {

  })

}

