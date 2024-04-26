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
  .addSubMenu(SpreadsheetApp.getUi().createMenu('Overall')
          .addItem("Table","showOverallTable")
          .addItem("Charts","chooseCharts"))
  .addSeparator()
  .addItem("By Category","showCategories")
  .addToUi();


}


/**
 * @function showOverall
 * 
 */
function showOverallTable() {

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
 * @function popupCategoryRangeCalculations
* @param {string} category - a category
* @param {string} rangeName - name of a range to get data for
 */
function popupCategoryRangeCalculations(category,rangeName) {

  const html = categoryCalculationsHTML(category,rangeName);
  const popupTitle = `${category} ${rangeName}`;
  popupCreator(html,popupTitle);


}





