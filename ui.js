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

  sidebarCreator(calendarNotes());

}

/**
 * @function sidebarCreator
 * 
 */
function sidebarCreator(html) {
  // pass the html to the sidebar
  SpreadsheetApp.getUi() 
  .showSidebar(html)

}

/**
* @function calendarNotes
* return {HTML} object containing notes for each calculation
 * */
function calendarNotes(){

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
* @function categoryNotes
* @params {string} category - a category
* return {Object} sum of all the notes from a single category for a year
 * */
function categoryNotes(category){

    if (typeof category !== 'string') {
      throw new Error('Invalid input: category must be a string');
    }

    try {
      const calendar = new Calendar();
      return calendar.categoryCalculations(category)

    }
    catch (err) {
      handleError(err);
    }
    
}

/**
 * @function popupCreator
 * 
 */
function popupCreator(popuptitle) {

  SpreadsheetApp.getUi().showModalDialog(htmlOutput, popuptitle);

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
  
  // callback function for each button
  const func = `popupCreator`;

  // create the table with buttons
  const html = createButtonsTable(sheetCategories,func, "My categories")
  
  // pass the html to the sidebar
  sidebarCreator(html)
}


/**
 * @function createButtonsTable
 * @params {Array<String>} data - a list of strings to create a table of buttons with
 * @params {String} header - a name for the sidebar 
 * @return {HTML} can be directly used in showSidebar 
 */
function createButtonsTable(array, buttonFunction, header = 'My Stats') {
 // Create the table
 var htmlOutput = HtmlService.createHtmlOutput().setTitle(header);

 // Start building the table.
 htmlOutput.append('<table border="1">');
 htmlOutput.append(`<style>
             table, th, td { border: 1px solid black; padding: 5px; }
             </style>`);
  
 array.forEach((item) => {
    // create a row
    htmlOutput.append(`<tr>`);

    // escape any special characters
    item = escape(item);

    // insert the button with an onclick that calls a function with item as an argument
    htmlOutput.append(`<td><input type='button' value='${item}' onclick='google.script.run.${buttonFunction}("${item}")'/></td>`);
    
    // end of the row
    htmlOutput.append(`</tr>`); // Corrected the closing tag here
 })
  
 // Close the table.
 htmlOutput.append('</table>');
 return htmlOutput;
}










