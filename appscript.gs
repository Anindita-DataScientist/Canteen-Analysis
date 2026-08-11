To activate the page
function testConnection() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  Logger.log(ss.getName());
}

Apps Script reads my three sheets.

function checkData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const employeeSheet = ss.getSheetByName("Employee_Master");
  const canteenSheet = ss.getSheetByName("Canteen_Usage");
  const attritionSheet = ss.getSheetByName("Monthly_Attrition");

  Logger.log("Employee_Master rows: " + employeeSheet.getLastRow());
  Logger.log("Canteen_Usage rows: " + canteenSheet.getLastRow());
  Logger.log("Monthly_Attrition rows: " + attritionSheet.getLastRow());
}
Calculate the dashboard KPIs
For the first version, we only need these 4 KPI cards:
1.Total Employees → 2,000 
2.Current Attrition → 10% 
3.Post-Canteen Attrition → 7% 
4.Attrition Reduction → 3 percentage points
function createKPIs() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Get sheets
  const employeeSheet = ss.getSheetByName("Employee_Master");
  const attritionSheet = ss.getSheetByName("Monthly_Attrition");

  // Total employees
  const totalEmployees = employeeSheet.getLastRow() - 1;

  // Read attrition data
  const data = attritionSheet.getDataRange().getValues();

  const headers = data[0];
  const rows = data.slice(1);

  // Find columns
  const beforeIndex = headers.indexOf("AttritionBefore");
  const afterIndex = headers.indexOf("AttritionAfter");

  // Calculate average attrition
  let beforeTotal = 0;
  let afterTotal = 0;

  rows.forEach(row => {
    beforeTotal += Number(row[beforeIndex]);
    afterTotal += Number(row[afterIndex]);
  });

  // Your source data stores percentages as 10 and 7,
  // so convert them to decimal values for Google Sheets.
  const currentAttrition = (beforeTotal / rows.length) / 100;
  const postCanteenAttrition = (afterTotal / rows.length) / 100;

  const attritionReduction =
    currentAttrition - postCanteenAttrition;

  // Create / get Dashboard
  let dashboard = ss.getSheetByName("Dashboard");

  if (!dashboard) {
    dashboard = ss.insertSheet("Dashboard");
  }

  dashboard.clear();

  // Title
  dashboard.getRange("A1").setValue(
    "Canteen Workforce Analytics Dashboard"
  );

  // KPI labels and values
  dashboard.getRange("A3").setValue("Total Employees");
  dashboard.getRange("B3").setValue(totalEmployees);

  dashboard.getRange("A4").setValue("Current Attrition");
  dashboard.getRange("B4").setValue(currentAttrition);

  dashboard.getRange("A5").setValue("Post-Canteen Attrition");
  dashboard.getRange("B5").setValue(postCanteenAttrition);

  dashboard.getRange("A6").setValue("Attrition Reduction");
  dashboard.getRange("B6").setValue(attritionReduction);

  // Percentage formatting
  dashboard.getRange("B4:B6").setNumberFormat("0.00%");

  // Basic formatting
  dashboard.getRange("A1:B1")
    .merge()
    .setFontSize(16)
    .setFontWeight("bold");

  dashboard.getRange("A3:A6")
    .setFontWeight("bold");

  dashboard.autoResizeColumns(1, 2);

  // Log results
  Logger.log("Total Employees: " + totalEmployees);
  Logger.log("Current Attrition: " + currentAttrition);
  Logger.log("Post-Canteen Attrition: " + postCanteenAttrition);
  Logger.log("Attrition Reduction: " + attritionReduction);
}

Created City-wise Workforce Data
function createCityWorkforceData() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const employeeSheet = ss.getSheetByName("Employee_Master");
  const dashboard = ss.getSheetByName("Dashboard");

  // Read employee data
  const data = employeeSheet.getDataRange().getValues();

  const headers = data[0];
  const rows = data.slice(1);

  // Find City column
  const cityIndex = headers.indexOf("City");

  // Count employees by city
  const cityCounts = {};

  rows.forEach(row => {

    const city = row[cityIndex];

    if (city) {
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    }

  });

  // Start writing city data
  dashboard.getRange("D3:E10").clearContent();

  dashboard.getRange("D3").setValue("City");
  dashboard.getRange("E3").setValue("Employees");

  let rowNumber = 4;

  Object.keys(cityCounts).forEach(city => {

    dashboard.getRange(rowNumber, 4).setValue(city);
    dashboard.getRange(rowNumber, 5).setValue(cityCounts[city]);

    rowNumber++;

  });

  // Formatting
  dashboard.getRange("D3:E3")
    .setFontWeight("bold");

  dashboard.autoResizeColumns(4, 2);

  Logger.log("City-wise workforce data created.");
}

STEP 10 — Monthly Attrition Trend.
This is Visual 4 from your original project: showing how attrition changes month by month before vs. after the canteen intervention
function createMonthlyAttritionData() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const attritionSheet = ss.getSheetByName("Monthly_Attrition");
  const dashboard = ss.getSheetByName("Dashboard");

  // Read attrition data
  const data = attritionSheet.getDataRange().getValues();

  const headers = data[0];
  const rows = data.slice(1);

  // Find columns
  const monthIndex = headers.indexOf("Month");
  const beforeIndex = headers.indexOf("AttritionBefore");
  const afterIndex = headers.indexOf("AttritionAfter");

  // Store monthly values
  const monthlyData = {};

  rows.forEach(row => {

    const month = row[monthIndex];
    const before = Number(row[beforeIndex]);
    const after = Number(row[afterIndex]);

    if (!monthlyData[month]) {
      monthlyData[month] = {
        beforeTotal: 0,
        afterTotal: 0,
        count: 0
      };
    }

    monthlyData[month].beforeTotal += before;
    monthlyData[month].afterTotal += after;
    monthlyData[month].count += 1;

  });

  // Clear previous helper data
  dashboard.getRange("G3:I20").clearContent();

  // Headers
  dashboard.getRange("G3").setValue("Month");
  dashboard.getRange("H3").setValue("Before Canteen");
  dashboard.getRange("I3").setValue("After Canteen");

  // Sort months
  const months = Object.keys(monthlyData).sort();

  let rowNumber = 4;

  months.forEach(month => {

    const item = monthlyData[month];

    const beforeAverage =
      (item.beforeTotal / item.count) / 100;

    const afterAverage =
      (item.afterTotal / item.count) / 100;

    dashboard.getRange(rowNumber, 7).setValue(month);
    dashboard.getRange(rowNumber, 8).setValue(beforeAverage);
    dashboard.getRange(rowNumber, 9).setValue(afterAverage);

    rowNumber++;

  });

  // Format percentages
  dashboard
    .getRange("H4:I15")
    .setNumberFormat("0.00%");

  dashboard.getRange("G3:I3")
    .setFontWeight("bold");

  dashboard.autoResizeColumns(7, 3);

  Logger.log("Monthly attrition data created.");
}

City-wise Attrition
function createCityAttritionData() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const attritionSheet = ss.getSheetByName("Monthly_Attrition");
  const dashboard = ss.getSheetByName("Dashboard");

  // Read attrition data
  const data = attritionSheet.getDataRange().getValues();

  const headers = data[0];
  const rows = data.slice(1);

  // Find columns
  const cityIndex = headers.indexOf("City");
  const beforeIndex = headers.indexOf("AttritionBefore");
  const afterIndex = headers.indexOf("AttritionAfter");

  // Store city values
  const cityData = {};

  rows.forEach(row => {

    const city = row[cityIndex];
    const before = Number(row[beforeIndex]);
    const after = Number(row[afterIndex]);

    if (!cityData[city]) {
      cityData[city] = {
        beforeTotal: 0,
        afterTotal: 0,
        count: 0
      };
    }

    cityData[city].beforeTotal += before;
    cityData[city].afterTotal += after;
    cityData[city].count += 1;

  });

  // Clear previous helper data
  dashboard.getRange("K3:M15").clearContent();

  // Headers
  dashboard.getRange("K3").setValue("City");
  dashboard.getRange("L3").setValue("Before Canteen");
  dashboard.getRange("M3").setValue("After Canteen");

  // Write city data
  const cities = Object.keys(cityData);

  let rowNumber = 4;

  cities.forEach(city => {

    const item = cityData[city];

    const beforeAverage =
      (item.beforeTotal / item.count) / 100;

    const afterAverage =
      (item.afterTotal / item.count) / 100;

    dashboard.getRange(rowNumber, 11).setValue(city);
    dashboard.getRange(rowNumber, 12).setValue(beforeAverage);
    dashboard.getRange(rowNumber, 13).setValue(afterAverage);

    rowNumber++;

  });

  // Percentage formatting
  dashboard
    .getRange("L4:M8")
    .setNumberFormat("0.00%");

  dashboard.getRange("K3:M3")
    .setFontWeight("bold");

  dashboard.autoResizeColumns(11, 3);

  Logger.log("City-wise attrition data created.");
}

Role-wise Attrition Analysis.
function createRoleAttritionData() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const attritionSheet = ss.getSheetByName("Monthly_Attrition");
  const dashboard = ss.getSheetByName("Dashboard");

  // Read attrition data
  const data = attritionSheet.getDataRange().getValues();

  const headers = data[0];
  const rows = data.slice(1);

  // Find columns
  const roleIndex = headers.indexOf("Role");
  const beforeIndex = headers.indexOf("AttritionBefore");
  const afterIndex = headers.indexOf("AttritionAfter");

  // Store role data
  const roleData = {};

  rows.forEach(row => {

    const role = row[roleIndex];
    const before = Number(row[beforeIndex]);
    const after = Number(row[afterIndex]);

    if (!roleData[role]) {
      roleData[role] = {
        beforeTotal: 0,
        afterTotal: 0,
        count: 0
      };
    }

    roleData[role].beforeTotal += before;
    roleData[role].afterTotal += after;
    roleData[role].count += 1;

  });

  // Clear previous helper data
  dashboard.getRange("O3:Q15").clearContent();

  // Headers
  dashboard.getRange("O3").setValue("Role");
  dashboard.getRange("P3").setValue("Before Canteen");
  dashboard.getRange("Q3").setValue("After Canteen");

  // Write role data
  const roles = Object.keys(roleData);

  let rowNumber = 4;

  roles.forEach(role => {

    const item = roleData[role];

    const beforeAverage =
      (item.beforeTotal / item.count) / 100;

    const afterAverage =
      (item.afterTotal / item.count) / 100;

    dashboard.getRange(rowNumber, 15).setValue(role);
    dashboard.getRange(rowNumber, 16).setValue(beforeAverage);
    dashboard.getRange(rowNumber, 17).setValue(afterAverage);

    rowNumber++;

  });

  // Percentage formatting
  dashboard
    .getRange("P4:Q10")
    .setNumberFormat("0.00%");

  dashboard.getRange("O3:Q3")
    .setFontWeight("bold");

  dashboard.autoResizeColumns(15, 3);

  Logger.log("Role-wise attrition data created.");
}

City × Role Attrition Matrix.
function createCityRoleMatrix() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const attritionSheet = ss.getSheetByName("Monthly_Attrition");
  const dashboard = ss.getSheetByName("Dashboard");

  // Read data
  const data = attritionSheet.getDataRange().getValues();

  const headers = data[0];
  const rows = data.slice(1);

  // Find columns
  const cityIndex = headers.indexOf("City");
  const roleIndex = headers.indexOf("Role");
  const beforeIndex = headers.indexOf("AttritionBefore");

  // Store city-role data
  const matrix = {};

  rows.forEach(row => {

    const city = row[cityIndex];
    const role = row[roleIndex];
    const before = Number(row[beforeIndex]);

    if (!matrix[city]) {
      matrix[city] = {};
    }

    if (!matrix[city][role]) {
      matrix[city][role] = {
        total: 0,
        count: 0
      };
    }

    matrix[city][role].total += before;
    matrix[city][role].count += 1;

  });

  // Get all roles
  const roles = [...new Set(rows.map(row => row[roleIndex]))];

  // Clear previous matrix
  dashboard.getRange("A20:F30").clearContent();

  // Title
  dashboard.getRange("A20").setValue(
    "City × Role Attrition Matrix"
  );

  // Header row
  dashboard.getRange("A22").setValue("City");

  roles.forEach((role, index) => {
    dashboard
      .getRange(22, index + 2)
      .setValue(role);
  });

  // Write cities and values
  const cities = Object.keys(matrix);

  cities.forEach((city, cityIndex) => {

    const sheetRow = cityIndex + 23;

    dashboard
      .getRange(sheetRow, 1)
      .setValue(city);

    roles.forEach((role, roleIndex) => {

      let value = "";

      if (
        matrix[city][role] &&
        matrix[city][role].count > 0
      ) {

        value =
          (matrix[city][role].total /
            matrix[city][role].count) / 100;

      }

      dashboard
        .getRange(sheetRow, roleIndex + 2)
        .setValue(value);

    });

  });

  // Format percentages
  dashboard
    .getRange("B23:F27")
    .setNumberFormat("0.00%");

  // Formatting
  dashboard
    .getRange("A20:F20")
    .merge()
    .setFontWeight("bold")
    .setFontSize(14);

  dashboard
    .getRange("A22:F22")
    .setFontWeight("bold");

  dashboard.autoResizeColumns(1, 6);

  Logger.log("City × Role matrix created.");
}
