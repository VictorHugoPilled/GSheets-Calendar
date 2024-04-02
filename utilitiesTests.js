function testjoursDans(){

  expectToEqual(joursDans(2001),365);
  expectToEqual(joursDans(2002),365);
  expectToEqual(joursDans(2024),366);
  expectToEqual(joursDans(2020),366);
  expectToEqual(joursDans(2000),366);
  expectToEqual(joursDans(1700),365);
  expectToEqual(joursDans(1800),365);
  expectToEqual(joursDans(1900),365);
  expectToEqual(joursDans(1800),365);
  expectToEqual(joursDans(1600),366);
}


function testrange(){

  expectToExist(Array.from(range(0,1).next().value));
  expectToExist(Array.from(range(5,10).next().value));
  expectToExist(Array.from(range(15,144).next().value));
  expectToExist(Array.from(range(0,144).next().value));
  

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


    const columnsObject = Object.fromEntries([
    [27, "AA"], 
    [53,"BA"],
    [79,"CA"],
    [105,"DA"]
    ]);

    Object.keys(columnsObject).forEach(
      (columnNumber) => expectToEqual(columnNumberToLetter(columnNumber), columnsObject[columnNumber])
    );


}

function testconvertToAlNotation(){
     
    expectToEqual(convertToAlNotation(1,1,2,2), "A1:B2");
    expectToEqual(convertToAlNotation(1,1,30,30), "A1:AD30");
    expectToEqual(convertToAlNotation(2,2,365,96), "B2:CS366");
    expectToEqual(convertToAlNotation(2,2,365,144), "B2:EO366"); 
    expectToEqual(convertToAlNotation(2,2,366,144), "B2:EO367");
    

}

function testsheetRangeToAlNotation(){
                                          
    expectToEqual(sheetRangeToAlNotation(2024,1,1,2,2), "2024!A1:B2");
    expectToEqual(sheetRangeToAlNotation(2023,1,1,30,30), "2023!A1:AD30");
    expectToEqual(sheetRangeToAlNotation(2022,2,2,365,96), "2022!B2:CS366");
    expectToEqual(sheetRangeToAlNotation(2021,2,2,365,144), "2021!B2:EO366");
    expectToEqual(sheetRangeToAlNotation(2020,2,2,366,144), "2020!B2:EO367");
    

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

function testcreateHtmlTable() {
  
  var data = Object.fromEntries([
    [["Header"], ["Column 1", "Column 2","Column 3"]],
    ["January" , [10,9,8]],
    ["February" , [7,6,5]],
    ["March" , [4,3,2]],
        ["April" , [1,0,-1]],
        ["May" , [-2,-3,-4]]
]);

  expectToExist(createHtmlTable(data).getContent().length);
}







