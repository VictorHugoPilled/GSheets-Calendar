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


/**
 * @function chooseCharts
 * pie chart percentage - this year, this month, etc
 * bar chart - day by day per category
 * line chart - day by day per category
 * 
 */
function chooseCharts() {

  // store the calendar
  const calendar = new Calendar();

  
  const options = ["Overall"].concat(calendar.getSheetCategories());

  // get the ranges for the buttons
  const rangeNames = Object.keys(calendar.rangeArguments);

  const categoriesObject = objectFromTwoLists(options,rangeNames);
  
  // callback function for each button
  const func = `popupChart`;

  // create the table with buttons
  const html = createButtonsTable(categoriesObject,func, "My categories");
  
  // pass the html to the sidebar
  sidebarCreator(html);
}

/**
 * @function popupCategoryRangeCalculations
* @param {string} option - any option such as a category or the overall calendar
* @param {string} rangeName - name of a range to get data for
 */
function popupChart(option,rangeName) {

  const popupTitle = `${option} ${rangeName}`;
  popupCreator(html,popupTitle);


}



/**
 * add a submenu to show
 *  pie chart percentage - this year, this month, etc
 * bar chart - day by day per category
 * line chart - day by day per category
 */

function charter(dataTable, chartType) {

    var dataTable = Charts.newDataTable()
      .addColumn(Charts.ColumnType.STRING, 'Month')
      .addColumn(Charts.ColumnType.NUMBER, 'In Store')
      .addRow(data)
      .build();

    switch (chartType) {

    }

    var chart = Charts.newPieChart()
      .setDataTable(dataTable)
      .build()

  var htmlOutput = HtmlService.createHtmlOutput().setTitle('My Chart');
  var imageData = Utilities.base64Encode(chart.getAs('image/png').getBytes());
  var imageUrl = "data:image/png;base64," + encodeURI(imageData);
  htmlOutput.append("Render chart server side: <br/>");
  htmlOutput.append("<img border=\"1\" src=\"" + imageUrl + "\">");
  return htmlOutput;

}

function testcharter() {

    var data = [['January', 10, 1],
    ['February', 12, 1],
    ['March', 20, 2],
    ['April', 25, 3]
    ,['May', 30, 4]]
    
    expectToExist(charter(data).getContent().length);

}


