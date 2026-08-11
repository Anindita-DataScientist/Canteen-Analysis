# Prototype Canteen Workforce Analytics Dashboard

## Project Overview

The **Prototype Canteen Workforce Analytics Dashboard** is an HR analytics project designed to evaluate employee attrition before and after the introduction of a canteen facility.

The organization has a workforce of **2,000 employees across five cities** and is experiencing an attrition rate of approximately **10%**. Management introduced a canteen facility as an employee-retention initiative, with an expected reduction in attrition to approximately **7%**.

The project provides a data-driven view of employee attrition and analyzes how the change varies across:

- Cities
- Employee roles
- Months
- City × Role combinations

The dashboard was developed in **two implementations**:

1. **Power BI Dashboard** – Business Intelligence and interactive data visualization
2. **Google Apps Script Web Dashboard** – Interactive web-based dashboard using Google Sheets, Apps Script, HTML, CSS and JavaScript

---

# Business Problem

The organization needs to evaluate the change in employee attrition after the introduction of the canteen facility and understand how attrition varies across different cities and employee roles.

The analysis is intended to help HR and management:

- Monitor overall workforce attrition
- Compare attrition before and after the intervention
- Identify high-attrition cities
- Identify high-attrition employee roles
- Analyze monthly attrition trends
- Identify specific city-role combinations requiring attention
- Evaluate the overall association between the canteen initiative and employee retention

---

# Workforce Distribution

| City | Employees |
|------|-----------|
| Hyderabad | 300 |
| Bangalore | 400 |
| Pune | 200 |
| Mumbai | 500 |
| Chennai | 600 |
| **Total** | **2,000** |

---

# Project Objective

The objective is to develop an HR analytics solution that:

- Compares attrition before and after the canteen intervention
- Provides monthly attrition trend analysis
- Analyzes attrition city-wise
- Analyzes attrition role-wise
- Identifies areas with higher attrition
- Analyzes City × Role attrition combinations
- Assesses the effectiveness of the canteen initiative
- Provides an interactive dashboard for HR and management

---

# Dashboard KPIs

The dashboard contains four major KPI cards.

### 1. Total Employees

**2,000 employees**

Represents the total workforce across the five cities.

### 2. Current Attrition %

**Approximately 10%**

Represents the attrition rate before considering the canteen intervention.

### 3. Post-Canteen Attrition %

**Approximately 7%**

Represents the attrition rate after the canteen intervention.

### 4. Attrition Reduction

**Approximately 3 percentage points**

Represents the reduction between the pre-canteen and post-canteen attrition rates.

---

# Dashboard Implementations

The project was implemented using two different approaches.

## 1. Power BI Dashboard

The Power BI implementation focuses on business intelligence, interactive analysis and management reporting.

### Technologies Used

- Power BI
- DAX
- Power Query
- Data Modeling
- Interactive Slicers
- Data Visualization

### Power BI Features

- KPI Cards
- City and Job Role Slicers
- Workforce Distribution Donut Chart
- Monthly Attrition Line Chart
- City-wise Attrition Clustered Column Chart
- Role-wise Attrition Clustered Column Chart
- City × Role Attrition Matrix

---

# 2. Google Apps Script Web Dashboard

A second implementation of the same analytics solution was developed as an interactive web dashboard using Google technologies.

### Technologies Used

- Google Sheets
- Google Apps Script
- HTML
- CSS
- JavaScript
- Google Charts

The Google Sheets tabs are used as the underlying data source:

- `Employee_Master`
- `Canteen_Usage`
- `Monthly_Attrition`

Apps Script processes the spreadsheet data and provides the required analytics to the web interface.

The HTML, CSS and JavaScript layer provides the interactive dashboard interface.

### Apps Script Dashboard Features

The web dashboard includes:

- Interactive City filter
- Interactive Role filter
- Total Workforce KPI
- Current Attrition KPI
- Post-Canteen Attrition KPI
- Attrition Reduction KPI
- Workforce Distribution Donut Chart
- Monthly Attrition Trend
- City-wise Attrition Analysis
- Role-wise Attrition Analysis
- City × Role Attrition Matrix
- Responsive web interface

The filters dynamically request filtered data from Apps Script and update the dashboard accordingly.

### Live Apps Script Dashboard

**[Open the Interactive Workforce Analytics Dashboard](https://script.google.com/macros/s/AKfycbxnyO1mjQoDXgy7vEXTNr3ryUmKy9HTyrRmozP5dNOyR4o_WgO-xSyWIcw_mhQ8sVa5Ig/exec)**

---

# Dashboard Visualizations
<img width="407" height="226" alt="image" src="https://github.com/user-attachments/assets/d6a95411-2de8-487d-b2ed-3f0c922dba32" />

## 1. KPI Cards

The dashboard displays:

- Total Employees
- Current Attrition %
- Post-Canteen Attrition %
- Attrition Reduction

These KPI cards provide management with a quick summary of the workforce and attrition situation.

---

## 2. City and Job Role Filters

Interactive filters are provided for:

- City
- Job Role

Users can select a particular city or employee role to analyze the corresponding attrition information.

In the Apps Script implementation, these filters dynamically update the dashboard based on the selected values.

---

## 3. Workforce Distribution

A **Donut Chart** displays the workforce distribution across the five cities.

This provides a quick visual understanding of how the organization's 2,000 employees are distributed geographically.

Workforce distribution:

- Hyderabad – 300
- Bangalore – 400
- Pune – 200
- Mumbai – 500
- Chennai – 600

---

## 4. Monthly Attrition Trend

A **Line Chart** compares current attrition and post-canteen attrition across the 12 months.

The analysis shows that attrition was approximately **10% before the canteen intervention** and reduced to approximately **7% after the intervention**.

The monthly pattern varies across the 12 months.

### Key Insight

The post-canteen attrition trend remains below the current attrition trend, indicating an overall improvement in attrition levels after the intervention.

---

## 5. City-wise Attrition Analysis

A **Clustered Column Chart** compares current and post-canteen attrition across:

- Chennai
- Hyderabad
- Bangalore
- Mumbai
- Pune

### Key Insight

Attrition declined across all five cities after the canteen intervention.

The dashboard analysis identifies **Pune as having the highest post-canteen attrition**.

### Business Interpretation

The reduction is not limited to one city; improvement is observed across all five locations.

---

## 6. Role-wise Attrition Analysis

A **Clustered Column Chart** compares attrition across:

- WM Technician
- AC Technician
- RF Technician
- Helper

### Highest Pre-Canteen Attrition – WM Technicians

WM Technicians had the highest attrition before the canteen intervention at approximately **10.20%**.

After the intervention, their attrition decreased to approximately **7.00%**, showing a significant improvement.

### Highest Post-Canteen Attrition – AC Technicians

After the intervention, AC Technicians have the highest remaining attrition at approximately **7.24%**.

Therefore, AC Technicians may require additional retention attention.

### Canteen Impact

All four roles experienced a reduction in attrition after the canteen was introduced.

This consistent reduction indicates a positive association between the canteen initiative and employee retention.

---

# 7. City × Role Attrition Matrix

The **City × Role Matrix** analyzes attrition across different combinations of:

**City × Employee Role**

This helps identify specific city-role combinations that may require additional attention.

The documented analysis highlights:

- Mumbai – AC Technician
- Chennai – Helper

as specific areas of interest.

This type of analysis allows HR teams to move beyond overall attrition and identify more specific workforce segments that may require targeted retention strategies.

---

# Key Business Insights

## Overall Attrition Improvement

Overall attrition decreased from approximately:

**10% → 7%**

This represents an approximately **3 percentage-point reduction** in the attrition rate.

---

## City-wise Insight

Attrition declined across all five cities following the canteen intervention.

**Pune** was identified as having the highest post-canteen attrition in the dashboard analysis.

---

## Role-wise Insight

**WM Technicians** had the highest pre-canteen attrition at approximately **10.20%**.

Their attrition decreased to approximately **7.00%** after the intervention.

**AC Technicians** have the highest post-canteen attrition at approximately **7.24%**, making them a potential area for additional retention attention.

Most importantly, all four roles experienced a reduction in attrition after the canteen intervention.

---

## City × Role Insight

The City × Role analysis helps identify more granular workforce segments.

The analysis highlights combinations such as:

- Mumbai – AC Technician
- Chennai – Helper

These segments can be considered for further HR investigation and targeted retention initiatives.

---

# Overall Conclusion

The dashboard indicates that employee attrition improved after the introduction of the canteen facility.

The overall attrition rate decreased from approximately:

**10% → 7%**

The reduction was also observed across the different cities and employee roles.

The role-wise analysis shows that all four roles experienced lower attrition after the intervention, while the city-wise analysis shows a decline across all five cities.

Therefore, the dashboard provides evidence of a **positive association between the canteen initiative and improved employee retention**.

> **Important Note:** The dashboard shows an association between the canteen intervention and lower attrition. It does not independently prove that the canteen directly caused the reduction.

---

# Data Structure

The project uses three primary datasets.

### Employee_Master

Contains employee-level workforce information including:

- Employee
- City
- Role
- Workforce information

### Canteen_Usage

Contains information related to canteen usage, including:

- Month
- City
- Total Employees
- Breakfast Users
- Lunch Users
- Dinner Users
- Total Meals
- Monthly Cost
- Average Meals per Employee
- Cost per Employee

### Monthly_Attrition

Contains monthly attrition information including:

- Month
- City
- Role
- Employees Start
- Attrition Before
- Attrition After
- Employees End
- Attrition Improvement
- Attrition Improvement %

---

# Data Modeling

For the **Power BI implementation**, the project uses data modeling and relationships between the relevant tables to support city-wise, role-wise and monthly analysis.

For the **Google Apps Script implementation**, the Google Sheets tabs act as the underlying data source, while Apps Script reads and processes the relevant tables and dynamically returns the required results to the web dashboard.

This provides two different approaches to implementing the same analytical solution:

**Power BI Data Model → DAX → Visualizations**

and

**Google Sheets → Apps Script → HTML/CSS/JavaScript → Interactive Web Dashboard**

---

# Future Analysis

The project can be further expanded by analyzing canteen usage and cost, including:

- How much the canteen is being used
- How much the company spends on the canteen
- Canteen spending per employee
- Average number of meals consumed by each employee
- Whether canteen usage is increasing or decreasing over the 12 months
- Which city uses the canteen the most
- Relationship between canteen usage and employee attrition
- Cost-effectiveness of the canteen initiative
- Employee retention by canteen usage level

These additional analyses could help determine whether higher canteen utilization is associated with stronger employee retention.

---

# Tools & Technologies

## Business Intelligence

- **Power BI** – Dashboard development and visualization
- **DAX** – KPI and attrition calculations
- **Power Query** – Data transformation and preparation
- **Data Modeling** – Relationships between analytical tables

## Web Dashboard

- **Google Sheets** – Data storage
- **Google Apps Script** – Backend data processing and dashboard logic
- **HTML** – Dashboard structure
- **CSS** – UI design and responsive layout
- **JavaScript** – Interactivity and dynamic filtering
- **Google Charts** – Web-based data visualization

---

# Project Outcome

The Prototype Canteen Workforce Analytics project provides HR and management with an interactive view of employee attrition and the change observed after the canteen intervention.

The project demonstrates the ability to build the same business analytics solution using both a **Business Intelligence platform** and a **web-based application approach**.

The solution helps management:

- Monitor overall attrition
- Compare before and after attrition
- Identify high-attrition cities
- Identify high-attrition roles
- Analyze monthly trends
- Analyze City × Role combinations
- Identify workforce segments requiring attention
- Build a foundation for future canteen usage and cost analysis

---

# Project Highlights

### Power BI Implementation

**Business Intelligence Dashboard**

Data → Power Query → Data Model → DAX → Interactive Visualizations

### Apps Script Implementation

**Interactive Web Dashboard**

Google Sheets → Apps Script → HTML/CSS/JavaScript → Google Charts → Web Application

### Key Business Result

**Overall Attrition: ~10% → ~7%**

**Reduction: ~3 percentage points**

---

# Live Dashboard

### Google Apps Script Web Dashboard

[Open Interactive Dashboard](https://script.google.com/macros/s/AKfycbxnyO1mjQoDXgy7vEXTNr3ryUmKy9HTyrRmozP5dNOyR4o_WgO-xSyWIcw_mhQ8sVa5Ig/exec)

---

# Project Summary

This project demonstrates an end-to-end HR analytics workflow, from structured workforce data and attrition analysis to interactive visualization and web-based dashboard deployment.

It combines **Power BI analytics** with **Google Apps Script web development**, providing both a traditional BI solution and a lightweight interactive web application for workforce analytics.
