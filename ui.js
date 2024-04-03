/**
 * @function onOpen
 */
function onOpen() {
  baseMenu();
}


/**
 * @function baseMenu
 */
function baseMenu() {

  SpreadsheetApp.getUi()
  .createMenu("Show statistics")
  .addItem("Show Overall Stats","showOverall")
  .addSeparator()
  .addItem("By Category","showCategories")
  .addToUi();

}


/**
 * @function showOverall
 * 
 */
function showOverall() {

  sidebarCreator(calendarCalculationsHTML());

}

/**
 * @function showCategories
 * 
 */
function showCategories() {

  // store the calendar
  const calendar = new Calendar();

  // get the list of categories
  const sheetCategories = calendar.getSheetCategories();

  // get the ranges for the buttons
  const rangeNames = Object.keys(calendar.rangeArguments);

  const categoriesObject = objectFromTwoLists(sheetCategories,rangeNames);
  
  // callback function for each button
  const func = `popupCategoryRangeCalculations`;

  // create the table with buttons
  const html = createButtonsTable(categoriesObject,func, "My categories");
  
  // pass the html to the sidebar
  sidebarCreator(html);
}


/**
* @function calendarCalculationsHTML
* return {HTML} object containing notes for each calculation
 * */
function calendarCalculationsHTML(){

    try {
      const calendar = new Calendar();
      const calculations = calendar.calendarCalculations();
      return createHtmlTable(calculations,calendar.year);

    }
    catch (err) {
      handleError(err);
    }
    
}


/**
* @function categoryCalculationsHTML
* @param {string} category - a category
* @param {string} rangeName - name of a range to get data for
* return {Object} sum of all the notes from a single category for a year
 * */
function categoryCalculationsHTML(category, rangeName){

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {
      const calendar = new Calendar();
      const calculations = calendar.categoryCalculations(category,rangeName);
      return createHtmlTable(calculations,category);

    }
    catch (err) {
      handleError(err);
    }
    
}


/**
 * @function popupCategoryRangeCalculations
* @param {string} category - a category
* @param {string} rangeName - name of a range to get data for
 */
function popupCategoryRangeCalculations(category,rangeName) {

  const html = categoryCalculationsHTML(category,rangeName);
  const popupTitle = `${category} ${rangeName}`;
  popupCreator(html,popupTitle);


}











