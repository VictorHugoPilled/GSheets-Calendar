function testdaysIn(){

    const years = {
      2001: 365,
      2002: 365,
      2024: 366,
      2020: 366,
      2000: 366,
      1800: 365,
      1900:  365,
      1800: 365,
      1600: 366
    }

    Object.entries(years).forEach(([key, value]) => {
	expectToEqual(daysIn(key),value);
    });
    

}


function testrange(){

    const ranges = [
	[0,1],
	[5,10],
	[15,144],
	[0,144]
  ]

    ranges.forEach((value) => {
      expectToExist(Array.from(range(...value)).length);
    });
  

  

}


function testcategorySum() { 

  const categories = ["Yellow", "Blue", "Yellow", "Green", "Red", "Yellow", "Orange", "Blue", "Red"];

  const categoriesObject = Object.fromEntries([
    ["Yellow", 3], 
    ["Blue",2],
    ["Orange",1],
    ["Red",2],
    ["Green",1]
    ]);

  categories.forEach((category) => expectToEqual(categorySum(categories,category), categoriesObject[category]));
}


function testcolumnNumberToLetter() {


    const columnsObject = {
    27: "AA",
    53: "BA",
    79: "CA",
    105: "DA"
    };

    Object.keys(columnsObject).forEach(
      (columnNumber) => expectToEqual(columnNumberToLetter(columnNumber), columnsObject[columnNumber])
    );


}

function testconvertToAlNotation(){

    const notation = Object.fromEntries([
	["A1:B2", [1,1,2,2]],
	["A1:AD30", [1,1,30,30],],
	["B2:CS366", [2,2,365,96]],
	["B2:EO366", [2,2,365,144]],
	["B2:EO367", [2,2,366,144]]
    ])


    Object.entries(notation).forEach(([key, value]) => {
	expectToEqual(convertToAlNotation(...value), key);
    });
  
    
    

}

function testsheetRangeToAlNotation(){


    const sheetNotation = Object.fromEntries([
	["2024!A1:B2", [2024,1,1,2,2]],
	["2023!A1:AD30", [2023,1,1,30,30]],
	["2022!B2:CS366", [2022,2,2,365,96]],
	["2021!B2:EO366", [2021,2,2,365,144]],
	["2020!B2:EO367", [2020,2,2,366,144]]
    ])


      Object.entries(sheetNotation).forEach(([key, value]) => {
	expectToEqual(sheetRangeToAlNotation(...value), key);
    });
  

}

function testreadRange(){

  // testing 2024 calendar
  const cellsPerHour = 6;
  const categoriesColumnHeader = "Les Catégories";
  
  const calendar = new Calendar(cellsPerHour,categoriesColumnHeader);

  const range = sheetRangeToAlNotation(calendar.year,
  calendar.row1,calendar.column1,calendar.rows,calendar.columns);

  expectToExist(readRange(calendar.id,range).length);


}

function testfinder() {

  const sheet1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("2024");
  const sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("2023");
  const text = "Categories"

  expectToEqual(finder(sheet1, text).getColumn(), 148);
  expectToEqual(finder(sheet2, text).getColumn(), 100);

  const text2 = "Weekday"

  expectToEqual(finder(sheet1, text2).getColumn(),146);
  expectToEqual(finder(sheet2, text2).getColumn(),98);
  
}



function testObjectFromTwoLists() {

  const list1 = [1,2,3]
  const list2 = ["yellow", "blue"]
  const result = { 1: ["yellow", "blue"], 2: ["yellow", "blue"], 3: ["yellow", "blue"] }
  expectToEqual(Object.entries(objectFromTwoLists(list1,list2)),Object.entries(result))

}


function testgenerateTimeRange(){
 
  const interval = 10; //minutes interval
  const startHour = 0; // start time in minutes
  const endHour = 24; // end time in minutes
  const foo = generateTimeRange(startHour, endHour, interval);
  console.log(Array.from(foo));
}




