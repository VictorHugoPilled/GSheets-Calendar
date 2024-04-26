function testCalendar(){

    // check without cache
    const testCalendar = new Calendar();
    expectToExist(testCalendar.cellsPerHour);
    expectToExist(testCalendar.notesOfAYear().length);


}


function testgetSheetCategories(){

    // Needs to be hardcoded
    const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];

    // store the calendar
    const calendar = new Calendar();

    // check without cache
    const sheetCategories = new Set(calendar.getSheetCategories("Categories"));

    expectToEqual(categories.filter((category) => sheetCategories.has(category)).length, categories.length);

    // check with cache
    const sheetCategories2 = new Set(calendar.getSheetCategories("Categories", true));

    expectToEqual(categories.filter((category) => sheetCategories2.has(category)).length, categories.length);

    
}
  

function testcalendarCalculations() {
  

  // store the calendar
  const calendar = new Calendar();

  // check without cache
  Object.entries(calendar.calendarCalculations()).forEach((entry) => {
    const [_, value] = entry;
    expectToExist(value);
  }
  );

  // check with cache
  Object.entries(calendar.calendarCalculations(true)).forEach((entry) => {
    const [_, value] = entry;
    console.log(entry)
  }
  );



    
  }


function testcalendarSlicer(){

  
  const hours = 24;

  // store the calendar
  const calendar = new Calendar();

  const expectedlengthpartial = calendar.cellsPerHour * hours;

  // For a random day, can we get a correctly sized slice, testing slice sizes of 1 to 30
  Array.from(range(1,30)).forEach((num) => expectToEqual(calendar.calendarSlicer(num,num).length,expectedlengthpartial * num))


} 


function testcategoryCalculationsToday() {

  
  // store the calendar
  const calendar = new Calendar();

  const categories = calendar.getSheetCategories();

  // check without cache
  categories.forEach((category) => {
    Object.entries(calendar.categoryCalculations(category, "Today")).forEach((entry) => {
    const [_, value] = entry;

      expectToExist(value);
    })
  
    }
    )

  
  

  }

function testcategoryCalculationsYesterday() {

  
  // store the calendar
  const calendar = new Calendar();

  const categories = calendar.getSheetCategories();

  // check without cache
  categories.forEach((category) => {
    Object.entries(calendar.categoryCalculations(category, "Yesterday")).forEach((entry) => {
    const [_, value] = entry;

      expectToExist(value);
    })
  
    }
    )

  
  

  }

function testcategoryCalculationsCurrentWeek() {

  
  // store the calendar
  const calendar = new Calendar();

  const categories = calendar.getSheetCategories();

  // check without cache
  categories.forEach((category) => {
    Object.entries(calendar.categoryCalculations(category, "Current Week")).forEach((entry) => {
    const [_, value] = entry;

      expectToExist(value);
    })
  
    }
    )

  
  

  }

function testcategoryCalculationsPreviousWeek() {

  
  // store the calendar
  const calendar = new Calendar();

  const categories = calendar.getSheetCategories();

  // check without cache
  categories.forEach((category) => {
    Object.entries(calendar.categoryCalculations(category, "Previous Week")).forEach((entry) => {
    const [_, value] = entry;

      expectToExist(value);
    })
  
    }
    )

  
  

  }

function testcategoryCalculationsCurrentMonth() {

  
  // store the calendar
  const calendar = new Calendar();

  const categories = calendar.getSheetCategories();

  // check without cache
  categories.forEach((category) => {
    Object.entries(calendar.categoryCalculations(category, "Current Month")).forEach((entry) => {
    const [_, value] = entry;

      expectToExist(value);
    })
  
    }
    )

  
  

  }

function testcategoryCalculationsPreviousMonth() {

  
  // store the calendar
  const calendar = new Calendar();

  const categories = calendar.getSheetCategories();

  // check without cache
  categories.forEach((category) => {
    Object.entries(calendar.categoryCalculations(category, "Previous Month")).forEach((entry) => {
    const [_, value] = entry;

      expectToExist(value);
    })
  
    }
    )

  
  

  }

function testcategoryCalculationsThisYear() {

  
  // store the calendar
  const calendar = new Calendar();

  const categories = calendar.getSheetCategories();

  // check without cache
  categories.forEach((category) => {
    Object.entries(calendar.categoryCalculations(category, "This Year")).forEach((entry) => {
    const [_, value] = entry;

      expectToExist(value);
    })
  
    }
    )

  
  

  }

function testspecificcategoryCalculationsThisYear() {

  
  // store the calendar
  const calendar = new Calendar();

  const categories = calendar.getSheetCategories();

  // check without cache
  categories.forEach((category) => {
    console.log(calendar.categoryCalculations(category, "This Year", false, "Percentage"))
  
    }
    )

  
  

  }





