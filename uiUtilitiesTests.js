function testcreateHtmlTable() {
  
  const data = {"Header" : ["Column 1", "Column 2","Column 3"],
    "January": [10,9,8],
    "February": [7,6,5],
    "March": [4,3,2],
    "April": [1,0,-1],
    "May": [-2,-3,-4]
  };

 const data2 = {
    "Header": "Column 1",
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5};


  expectToExist(createHtmlTable(data, "months").getContent().length);
  expectToExist(createHtmlTable(data2, "months").getContent().length);
}


function testcreateButtonsTable(){

 const data = Object.fromEntries([
    [["Header"], ["Column 1", "Column 2","Column 3"]],
    ["January" , [10,9,8]],
    ["February" , [7,6,5]],
    ["March" , [4,3,2]],
        ["April" , [1,0,-1]],
        ["May" , [-2,-3,-4]]
]);

 const data2 = Object.fromEntries([
    [["Header"], ["Column 1"]],
    ["January" , 1],
    ["February" , 2],
    ["March" , 3],
        ["April" , 4],
        ["May" , 5]
]);

  const func = `popupCreator`;

  expectToExist(createButtonsTable(data,func,"months").getContent().length);
  expectToExist(createButtonsTable(data2,func,"months").getContent().length);
  
}


function testescapeHTML() {
  
  expectToEqual(escapeHTML("yes & no"), "yes &amp; no");
  expectToEqual(escapeHTML("yes < no"), "yes &lt; no");
  expectToEqual(escapeHTML("yes > no"), "yes &gt; no");
  expectToEqual(escapeHTML(`yes " no`), "yes &quot; no");
  expectToEqual(escapeHTML(`yes ' no`), "yes &#39; no");        

}


function testcalendarCalculationsHTML() {

  expectToExist(calendarCalculationsHTML().getContent().length);

}


function testcategoryCalculationsHTML() {
  
  const calendar = new Calendar();

  // for each category 
  const categories = calendar.getSheetCategories();

  // get the ranges for the buttons
  const ranges = Object.keys(calendar.rangeArguments);

  categories.forEach((category) => {
    
    ranges.forEach((rangeName) => {
      expectToExist(categoryCalculationsHTML(category,rangeName).getContent().length);

  })

  })


}


function testcharter() {

    var data = [['January', 10, 1],
    ['February', 12, 1],
    ['March', 20, 2],
    ['April', 25, 3]
    ,['May', 30, 4]]
    
    expectToExist(charter(data).getContent().length);

}


