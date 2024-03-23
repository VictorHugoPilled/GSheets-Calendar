 /** Base function
 * @constructor
 * 
 **/
function CalendarCategories(){

  try {

    this.sheet = SpreadsheetApp.getActiveSheet();
    this.year = this.sheet.getSheetName();
    this.cellsPerHour = cellsPerHour;

  }

  catch (err) {
    handleError(err)
  }

}

 /** 
 * 
 * 
 **/
CalendarCategories.getSheetCategories = function() {

  try {
      // Finds Les Catégories 
      // use finder
      const categories = sheet.createTextFinder('Les Catégories').matchCase(true).matchEntireCell(true).findNext();
      
      //Begining row and column address
      const categoriesCol = categories.getColumn();
      // Add one because we don't need col
      const categoriesRow = categories.getRow() + 1;

      //Move down to last row in range of categories - 2(-1 since we added one to the first row + 
      // -1 since last we are passing the row difference)
      const rangeLength = categories.getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow() - 2;

      //Get the list of categories
      //return getSheetValues(startRow, startColumn, numRows, numColumns)
      //const allCategories = sheet.getSheetValues(categoriesRow, categoriesCol, rangeLength, 1);

      //allCategories is year array of arrays for some reason
      //Combine allCategories into one array


  }
  catch (err) {
    handleError(err)
  }


}

function testgetSheetCategories(){
  // test sheet
  const year = 2024;
  console.log(getSheetCategories(year));

  const categories = ["Le sommeil", "Les jeux vidéos", "Le temps d'arrêt", "Le temps en famille", "La socialisation", "La musculation", "Le travail", "La productivité", "Le dating", "Les rendez-vous", "Les tâches", "Le temps perdu",
    "Les voyages", "Le skating"];

}
