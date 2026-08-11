function getDashboardData(selectedCity, selectedRole) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const employeeSheet =
    ss.getSheetByName("Employee_Master");

  const attritionSheet =
    ss.getSheetByName("Monthly_Attrition");


  // =====================================================
  // EMPLOYEE MASTER
  // =====================================================

  const employeeData =
    employeeSheet
      .getDataRange()
      .getValues();

  const employeeHeaders =
    employeeData[0];

  const employeeRows =
    employeeData.slice(1);


  const employeeCityIndex =
    employeeHeaders.indexOf("City");

  const employeeRoleIndex =
    employeeHeaders.indexOf("Role");


  // =====================================================
  // FILTER EMPLOYEE DATA
  // =====================================================

  const filteredEmployees =
    employeeRows.filter(function(row) {

      const cityMatch =
        !selectedCity ||
        selectedCity === "All" ||
        row[employeeCityIndex] === selectedCity;

      const roleMatch =
        !selectedRole ||
        selectedRole === "All" ||
        row[employeeRoleIndex] === selectedRole;

      return cityMatch && roleMatch;

    });


  // =====================================================
  // WORKFORCE BY CITY
  // =====================================================

  const cityWorkforce = {};

  filteredEmployees.forEach(function(row) {

    const city =
      row[employeeCityIndex];

    if (city) {

      cityWorkforce[city] =
        (cityWorkforce[city] || 0) + 1;

    }

  });


  // =====================================================
  // ATTRITION DATA
  // =====================================================

  const attritionData =
    attritionSheet
      .getDataRange()
      .getValues();

  const attritionHeaders =
    attritionData[0];

  const attritionRows =
    attritionData.slice(1);


  const cityIndex =
    attritionHeaders.indexOf("City");

  const roleIndex =
    attritionHeaders.indexOf("Role");

  const monthIndex =
    attritionHeaders.indexOf("Month");

  const beforeIndex =
    attritionHeaders.indexOf(
      "AttritionBefore"
    );

  const afterIndex =
    attritionHeaders.indexOf(
      "AttritionAfter"
    );


  // =====================================================
  // FILTER ATTRITION DATA
  // =====================================================

  const filteredAttrition =
    attritionRows.filter(function(row) {

      const cityMatch =
        !selectedCity ||
        selectedCity === "All" ||
        row[cityIndex] === selectedCity;

      const roleMatch =
        !selectedRole ||
        selectedRole === "All" ||
        row[roleIndex] === selectedRole;

      return cityMatch && roleMatch;

    });


  // =====================================================
  // MONTHLY ATTRITION
  // =====================================================

  const monthly = {};


  filteredAttrition.forEach(function(row) {

    const month =
      row[monthIndex];

    const before =
      Number(row[beforeIndex]);

    const after =
      Number(row[afterIndex]);


    if (!monthly[month]) {

      monthly[month] = {

        before: 0,

        after: 0,

        count: 0

      };

    }


    monthly[month].before +=
      before;

    monthly[month].after +=
      after;

    monthly[month].count++;

  });


  const monthlyAttrition =
    Object.keys(monthly)
      .sort()
      .map(function(month) {

        return {

          month: month,

          before:
            monthly[month].before /
            monthly[month].count,

          after:
            monthly[month].after /
            monthly[month].count

        };

      });


  // =====================================================
  // CITY ATTRITION
  // =====================================================

  const cityAttrition = {};


  filteredAttrition.forEach(function(row) {

    const city =
      row[cityIndex];

    const before =
      Number(row[beforeIndex]);

    const after =
      Number(row[afterIndex]);


    if (!cityAttrition[city]) {

      cityAttrition[city] = {

        before: 0,

        after: 0,

        count: 0

      };

    }


    cityAttrition[city].before +=
      before;

    cityAttrition[city].after +=
      after;

    cityAttrition[city].count++;

  });


  const cityAttritionResult =
    Object.keys(cityAttrition)
      .map(function(city) {

        return {

          city: city,

          before:
            cityAttrition[city].before /
            cityAttrition[city].count,

          after:
            cityAttrition[city].after /
            cityAttrition[city].count

        };

      });


  // =====================================================
  // ROLE ATTRITION
  // =====================================================

  const roleAttrition = {};


  filteredAttrition.forEach(function(row) {

    const role =
      row[roleIndex];

    const before =
      Number(row[beforeIndex]);

    const after =
      Number(row[afterIndex]);


    if (!roleAttrition[role]) {

      roleAttrition[role] = {

        before: 0,

        after: 0,

        count: 0

      };

    }


    roleAttrition[role].before +=
      before;

    roleAttrition[role].after +=
      after;

    roleAttrition[role].count++;

  });


  const roleAttritionResult =
    Object.keys(roleAttrition)
      .map(function(role) {

        return {

          role: role,

          before:
            roleAttrition[role].before /
            roleAttrition[role].count,

          after:
            roleAttrition[role].after /
            roleAttrition[role].count

        };

      });


  // =====================================================
  // CITY × ROLE MATRIX
  // =====================================================

  const matrix = {};


  filteredAttrition.forEach(function(row) {

    const city =
      row[cityIndex];

    const role =
      row[roleIndex];

    const before =
      Number(row[beforeIndex]);


    if (!matrix[city]) {

      matrix[city] = {};

    }


    if (!matrix[city][role]) {

      matrix[city][role] = {

        total: 0,

        count: 0

      };

    }


    matrix[city][role].total +=
      before;

    matrix[city][role].count++;

  });


  const matrixResult = [];


  Object.keys(matrix).forEach(function(city) {

    Object.keys(matrix[city])
      .forEach(function(role) {

        matrixResult.push({

          city: city,

          role: role,

          attrition:
            matrix[city][role].total /
            matrix[city][role].count

        });

      });

  });


  // =====================================================
  // KPI
  // =====================================================

  let beforeTotal = 0;

  let afterTotal = 0;


  filteredAttrition.forEach(function(row) {

    beforeTotal +=
      Number(row[beforeIndex]);

    afterTotal +=
      Number(row[afterIndex]);

  });


  let currentAttrition = 0;

  let postCanteenAttrition = 0;

  let attritionReduction = 0;


  if (filteredAttrition.length > 0) {

    currentAttrition =
      beforeTotal /
      filteredAttrition.length;

    postCanteenAttrition =
      afterTotal /
      filteredAttrition.length;

    attritionReduction =
      currentAttrition -
      postCanteenAttrition;

  }


  // =====================================================
  // RETURN FILTERED DATA
  // =====================================================

  return {

    totalEmployees:
      filteredEmployees.length,

    currentAttrition:
      currentAttrition,

    postCanteenAttrition:
      postCanteenAttrition,

    attritionReduction:
      attritionReduction,

    cityWorkforce:
      cityWorkforce,

    monthlyAttrition:
      monthlyAttrition,

    cityAttrition:
      cityAttritionResult,

    roleAttrition:
      roleAttritionResult,

    matrix:
      matrixResult

  };

}

function doGet() {
  return HtmlService
    .createTemplateFromFile("Index")
    .evaluate()
    .setTitle("RentoMojo Workforce Analytics")
    .setXFrameOptionsMode(
      HtmlService.XFrameOptionsMode.ALLOWALL
    );
}