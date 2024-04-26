# GSheets Calendar

I've crafted a Google Sheets document for tracking how I spend my time that's been enhanced with Google Apps Script. This system enhances the user interface with custom menus and dynamically generated content for sidebars and popups. On initializion, a custom menu is created for the Google Sheets UI. Depending on user interaction, it retrieves data from the Google Sheets document, generates HTML content based on this data, and displays it in a sidebar or popup. This process allows users to interactively view and analyze their time tracking data in a structured and visually appealing manner.

## Initialization
When the Google Sheets document is opened, the onOpen function is triggered, which calls baseMenu to create a custom menu in the UI. This menu includes options to view overall statistics and statistics by category.

## User Interaction
Users can select from the custom menu to view either overall statistics or statistics by category. The showOverall function is called for overall statistics, while showCategories is called for category-specific statistics.

## Data Retrieval
For overall statistics, the calendarCalculationsHTML function is invoked. It creates an instance of the Calendar class, calls its calendarCalculations method to retrieve data, and then uses createHtmlTable to generate an HTML table displaying this data. For category-specific statistics, showCategories generates a table of buttons for each category. Clicking a button triggers popupCategoryRangeCalculations, which calls categoryCalculationsHTML to generate detailed statistics for the selected category and range.

## HTML Generation

The createHtmlTable and createButtonsTable functions are used to generate HTML content. createHtmlTable takes an object containing data and generates an HTML table, while createButtonsTable creates a table with buttons for each entry in an object. Each button is configured to call a specified function with arguments derived from the button's value when clicked.

## Displaying Content
The generated HTML content is displayed in a sidebar or popup using the sidebarCreator or popupCreator functions. These functions use the Google Sheets UI to show the HTML content, allowing users to interact with the data visually.

## Error Handling and Utility Functions
The code includes error handling through the handleError function and test functions such as expectToEqual and expectToExist. I also wrote utility functions such as convertToAlNotation, sheetRangeToAlNotation, and readRange. Used together, those three functions allow me to read data from spreadsheet ranges using the Advanced Sheets service. 

