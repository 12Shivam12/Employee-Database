## React-Employee Database

### Submission Instructions [Please note]

#### Maximum Marks - 16

- The Submission should not contain spaces, for example /rct-101 folder/eval will not work.
- Do not push node_modules and package_lock.json to github.

```
✅ able to submit the app - 1 mark ( minimum score )
✅ should show basic structure - 1 mark.
✅ should render the first page with 10 results by default - 2 marks.
✅ pagination should work properly- 2 marks.
✅ should filter the data by department(hr) and render the pagination buttons accordingly- 2 marks.
✅ should filter the data by department(engineering) and render the pagination buttons accordingly - 2 marks.
✅ should filter the data by department(marketing) and render the pagination buttons accordingly - 2 marks.
✅ should filter the data by department(operations) and render the pagination buttons accordingly - 2 marks.
✅ should filter the data by department(finance) and render the pagination buttons accordingly - 2 marks.

```

### Installation

- Use node v16.16.0
- please make sure you do not push package-lock.json
- Download and unzip the boilerplate file and then copy the "**contents**" of the unzipped file in the Masai Folder.
- Navigate to the Masai Folder, in VS Code.
- Run the following commands inside,
  - `npm install --engine-strict`
  - `npm start`
- **_Note_**:

1. Do not change the package.json

## Problem

### Folder structure

- cypress
  - e2e
    - spec.cy.js (you can find the test file )
- public
- src
  - Components
    - EmployeesTable.jsx
    - Pagination.jsx
- package.json
- README.md

## API Details

Base URL : `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees`

### Query Params

1. `page` -
   type = number; optional = yes; works : together with limit param; value/values can be : 1,2,3,...

2. `limit`-
   type = number; optional = yes; works : together with page param; value/values can be : 1,2,3,...100
   Example using page and limit params

`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10`

3. `filterBy` You can filter by department or gender

4. `filterValue`  
   If filterBy value is gender | filterValue can be male,female,others

   If filterBy value is department | filterValue can be hr,marketing, finance, engineering, operations

   Example :
   `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10&filterBy=department&filterValue=hr`

#### Note - Make sure you use only the given components and don't create new files and folders. Changing the component name, and structures might result in giving you zero marks.

### You haven't taught cypress to run the test cases locally, you can see the passed/ failed test cases and test errors on CP itself.

### Description

Create a react application that fetches the employees data , filteres the data by department along with pagination.
Given two components

- EmployeedTable.jsx
- This is the dashboard where user can see the employee data and can filter the data by department.
- user can go through different pages and fetch the relevant data.
- Functionalites to implement
- This commponent has different sections

  - Department dropdown
    - it should have the following values as options (case sensitive)
    - --Select Department-- (default option)
    - hr
    - finance
    - marketing
    - engineering
    - operations

- Table
  - S.no
  - Name - should have `classname = name`
  - Gender - `classname = gender`
  - Department - `classname = department`
  - Salary - `classname = salary`
- On initial loading of the page make a fetch request to the following API with default query params page 1 and limit 10
- Populate the pagination button according to the reponse
- if totalpages 10 there should be 10 button with 1,2,3...n written on it.
- The active/current page button should be in different style and should be in disabled state.
- Whenever a new page clicked request an API call and render the data.
  ![](https://i.imgur.com/6Q8AnTs.png)

  #### DropDown functionality

  - On selecting any of the departments from the dropdown make fetch call to the given api with page,limlit,filterBy and filterValue as params
  - User should be able to go through all pages of filtered data and view the results
  - Make sure You are on first page whenever a new department from the list is selected.
  - The active/current page button should be in different style and should be in disabled state.
    ![](https://i.imgur.com/JnlCBo4.jpg)

#### Pagination

- This component should receive the following props
  - totalPages
  - handlePageChange - callback function (onclicking a page send the page number back as an argument)
  - currentPage

#### **Note**

- Only make API requests when the page loads and when you are posting the data, for sorting the data you should not make any network requests.
- Make sure you use only the given components and don't create new Components, files, or folders of your own. Changing the component name, and file/folder structures might result in giving you zero marks
- Do Not Remove `data-cy="xxxx"` from anywhere, these are used by testing tools to test your code, and removal of this will lead to low scores.
- Also make sure to cross-check all the spellings and Cases of Texts.

### General Guidelines

- The system on cp.masaischool.com may take between 1-20 minutes for responding,
- so we request you to read the problem carefully and debug it before itself
- we also request you not to just submit it last minute
- try to keep one submission at a time
