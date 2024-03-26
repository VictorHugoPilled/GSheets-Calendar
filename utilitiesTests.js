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

  expectToExist(Array.from(range(0,1).next().value))
  expectToExist(Array.from(range(5,10).next().value))
  expectToExist(Array.from(range(15,144).next().value))
  expectToExist(Array.from(range(0,144).next().value))
  
  

}

function testcategorySum() { 
  
}




