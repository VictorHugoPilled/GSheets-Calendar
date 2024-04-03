/**
 * @function createHtmlTable
 * @param {Object} data - an object containing date that will be used to fill the table
 * @param {String} header - a name for the sidebar 
 * @return {HTML} can be directly used in showSidebar 
 */
function createHtmlTable(data, header = 'My Stats') {

 // Create the table
 var htmlOutput = HtmlService.createHtmlOutput().setTitle(header);

 // Start building the table.
 htmlOutput.append('<table border="1">');
 htmlOutput.append(`<style>"
             "table, th, td { border: 1px solid black; padding: 5px; text-align: center; }"
             "</style>`);

  // Iterate through the object
 Object.entries(data).forEach(entry => {
  var [key, value] = entry;

  // escapeHTML any special characters
  if (typeof key == 'string') {
    key = escapeHTML(key);
   }

  if (typeof value == 'string') {
    value = escapeHTML(value);
   }
  
  // create a row
  htmlOutput.append(`<tr>`);

  // insert the key
  htmlOutput.append(`<td> ${key} </td>`);

  // input can be a list or single item
  typeof value == "object" ? 
  value.forEach((val) => {

    if (typeof val == 'string') {
    val = escapeHTML(val);
    }

    htmlOutput.append(`<td> ${val} </td>`)}) : htmlOutput.append(`<td> ${value} </td>`);

  
  // end of the row
  htmlOutput.append(`<tr>`);
});

 // Close the table.
 htmlOutput.append('</table>');
 return htmlOutput;
}


/**
 * @function createButtonsTable
 * @param {Object} data - a list of strings to create a table of buttons with
 * @param {String} header - a name for the sidebar 
 * @return {HTML} can be directly used in showSidebar 
 */
function createButtonsTable(data, buttonFunction, header) {

 // Create the table
 var htmlOutput = HtmlService.createHtmlOutput().setTitle(header);

 // Start building the table.
 htmlOutput.append('<table border="1">');
 htmlOutput.append(`<style>
             table, th, td { border: 1px solid black; padding: 5px; text-align: center;}
             </style>`);
  
  // Iterate through the object
 Object.entries(data).forEach(entry => {
  var [key, value] = entry;

  // escapeHTML any special characters
  if (typeof key == 'string') {
    key = escapeHTML(key);
   }

  if (typeof value == 'string') {
    value = escapeHTML(value);
   }
  
  // create a row
  htmlOutput.append(`<tr>`);

  // insert the key
  htmlOutput.append(`<td> ${key} </td>`);

  if (typeof value == "object") {
    value.forEach((val) => {
      // insert the button with an onclick that calls a function with value as an argument
      htmlOutput.append(`<td><input type='button' value='${val}' onclick='google.script.run.${buttonFunction}("${key}", "${val}")'/></td>`);
      }) 
    }

    else {
      // insert the button with an onclick that calls a function with value as an argument
      htmlOutput.append(`<td><input type='button' value='${value}' onclick='google.script.run.${buttonFunction}("${key}", "${value}")'/></td>`);
    }
    
    // end of the row
    htmlOutput.append(`</tr>`); // Corrected the closing tag here
 })
  
 // Close the table.
 htmlOutput.append('</table>');
 return htmlOutput;
}


/**
 * @function sidebarCreator
 * @param {HTML}
 */
function sidebarCreator(html) {
  // pass the html to the sidebar
  SpreadsheetApp.getUi() 
  .showSidebar(html);

}

/**
 * @function popupCreator
 * @param {HTML} html - to be displayed
 * @param {string} popuptite - any string to be used as a title
 */
function popupCreator(html,popuptitle) {

  SpreadsheetApp.getUi().showModalDialog(html, popuptitle);

}



/**
* @function escapeHTML
* @param {string} htmlStr - any string 
* @return {string} a string with special character escapeHTMLd
*/
function escapeHTML(htmlStr) {

   return htmlStr.replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#39;");
}        