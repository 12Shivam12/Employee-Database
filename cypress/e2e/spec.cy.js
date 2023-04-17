import data from "../../submissionData.json"; // do not create this file
// const data = [
//   {
//     submission_link: "http://localhost:3001",
//     id: "manish-local",
//     json_server_link: "http://localhost:8080",
//   },
// ];

C1Testcase();

function C1Testcase() {
  describe("React-Students-Score-Tracker", () => {
    let acc_score = 1;

    data.forEach(({ submission_link: url, id }) => {
      if (url.charAt(url.length - 1) != "/") {
        url = url + "/";
      }

      it("should show basic structure", function () {
        // 1 marks
        cy.intercept("GET", "**/get-employees?*").as("initialreq");
        cy.visit(url);
        cy.wait("@initialreq");
        cy.get("h2").should("contain.text", "Employees Database");
        cy.get("thead").should("be.visible");
        cy.get(".department_list")
          .should("be.visible")
          .children()
          .should("have.length", 6);
        cy.get(".name").should("be.visible");
        cy.get(".gender").should("be.visible");
        cy.get(".department").should("be.visible");
        cy.get(".Salary").should("be.visible");
        cy.then(() => {
          acc_score += 1;
        });
      });

      it("should render the first page with 10 results by default", function () {
        cy.intercept("GET", "**/get-employees?*").as("getPage1Data");
        cy.visit(url);
        cy.wait("@getPage1Data");
        // cy.get("table").should("exists");
        cy.get(".tbody").children().should("have.length", 10);
        cy.fixture("pageOne.json").then((apiData) => {
          cy.get(".tbody")
            .children()
            .each((child, index) => {
              cy.wrap(child)
                .find(".name")
                .should("contain", apiData.data[index].name);
            });
        });

        cy.then(() => {
          acc_score += 2;
        });
      });

      it("pagination should work properly", () => {
        cy.intercept("GET", "**/get-employees?*").as("getPageData");
        cy.visit(url);
        cy.wait("@getPageData");
        cy.get("[data-testid=page-btn]").eq(0).should("be.disabled");
        cy.get("[data-testid=page-btn]").eq(4).should("be.visible").click();
        cy.wait("@getPageData").then((interception) => {
          expect(interception.request.url).to.include("page=5");
          expect(interception.request.url).to.include("limit=10");
        });
        cy.get("[data-testid=page-btn]").eq(0).should("not.be.disabled");
        cy.get("[data-testid=page-btn]").eq(4).should("be.disabled");
        cy.fixture("pageFive.json").then((apiData) => {
          cy.get(".tbody")
            .children()
            .each((child, index) => {
              cy.wrap(child)
                .find(".name")
                .should("contain", apiData.data[index].name);
            });
        });
        cy.then(() => {
          acc_score += 2;
        });
      });

      it("should filter the data by department(hr) and render the pagination buttons accordingly", function () {
        cy.intercept("GET", "**/get-employees?*").as("getEmployees");
        cy.visit(url);
        cy.wait("@getEmployees");
        cy.get(".department_list").select("hr").should("have.value", "hr");
        cy.wait("@getEmployees").then((interception) => {
          expect(interception.request.url).to.include("filterBy=department");
          expect(interception.request.url).to.include("filterValue=hr");
        });
        cy.fixture("pageOneHR.json").then((apiData) => {
          cy.get(".tbody")
            .children()
            .each((child, index) => {
              cy.wrap(child)
                .find(".name")
                .should("contain", apiData.data[index].name);
              cy.wrap(child)
                .find(".department")
                .should("contain", apiData.data[index].department);
            });
        });
        cy.get("[data-testid=page-btn").should("have.length", 1);
        cy.then(() => {
          acc_score += 2;
        });
      });
      it("should filter the data by department(engineering) and render the pagination buttons accordingly", function () {
        cy.intercept("GET", "**/get-employees?*").as("getEmployees");
        cy.visit(url);
        cy.wait("@getEmployees");
        cy.get(".department_list")
          .select("engineering")
          .should("have.value", "engineering");
        cy.wait("@getEmployees").then((interception) => {
          expect(interception.request.url).to.include("filterBy=department");
          expect(interception.request.url).to.include(
            "filterValue=engineering"
          );
        });
        cy.get("[data-testid=page-btn]").eq(1).should("be.visible").click();
        cy.wait("@getEmployees").then((interception) => {
          expect(interception.request.url).to.include("filterBy=department");
          expect(interception.request.url).to.include(
            "filterValue=engineering"
          );
          expect(interception.request.url).to.include("page=2");
        });
        cy.fixture("pageTwoEng.json").then((apiData) => {
          cy.get(".tbody")
            .children()
            .each((child, index) => {
              cy.wrap(child)
                .find(".name")
                .should("contain", apiData.data[index].name);
              cy.wrap(child)
                .find(".department")
                .should("contain", apiData.data[index].department);
            });
        });
        cy.get("[data-testid=page-btn").should("have.length", 3);
        cy.then(() => {
          acc_score += 2;
        });
      });

      it("should filter the data by department(marketing) and render the pagination buttons accordingly", function () {
        cy.intercept("GET", "**/get-employees?*").as("getEmployees");
        cy.visit(url);
        cy.wait("@getEmployees");
        cy.get(".department_list")
          .select("marketing")
          .should("have.value", "marketing");
        cy.wait("@getEmployees").then((interception) => {
          expect(interception.request.url).to.include("filterBy=department");
          expect(interception.request.url).to.include("filterValue=marketing");
        });
        cy.get("[data-testid=page-btn]").eq(1).should("be.visible").click();
        cy.wait("@getEmployees").then((interception) => {
          expect(interception.request.url).to.include("filterBy=department");
          expect(interception.request.url).to.include("filterValue=marketing");
          expect(interception.request.url).to.include("page=2");
        });
        cy.fixture("pageTwoMarketing.json").then((apiData) => {
          cy.get(".tbody")
            .children()
            .each((child, index) => {
              cy.wrap(child)
                .find(".name")
                .should("contain", apiData.data[index].name);
              cy.wrap(child)
                .find(".department")
                .should("contain", apiData.data[index].department);
            });
        });
        cy.get("[data-testid=page-btn").should("have.length", 2);
        cy.then(() => {
          acc_score += 2;
        });
      });

      it("should filter the data by department(operations) and render the pagination buttons accordingly", function () {
        cy.intercept("GET", "**/get-employees?*").as("getEmployees");
        cy.visit(url);
        cy.wait("@getEmployees");
        cy.get(".department_list")
          .select("operations")
          .should("have.value", "operations");
        cy.wait("@getEmployees").then((interception) => {
          expect(interception.request.url).to.include("filterBy=department");
          expect(interception.request.url).to.include("filterValue=operations");
        });
        cy.fixture("pageOneOps.json").then((apiData) => {
          cy.get(".tbody")
            .children()
            .each((child, index) => {
              cy.wrap(child)
                .find(".name")
                .should("contain", apiData.data[index].name);
              cy.wrap(child)
                .find(".department")
                .should("contain", apiData.data[index].department);
            });
        });
        cy.get("[data-testid=page-btn").should("have.length", 5);
        cy.then(() => {
          acc_score += 2;
        });
      });
      it("should filter the data by department(finance) and render the pagination buttons accordingly", function () {
        cy.intercept("GET", "**/get-employees?*").as("getEmployees");
        cy.visit(url);
        cy.wait("@getEmployees");
        cy.get(".department_list")
          .select("finance")
          .should("have.value", "finance");
        cy.wait("@getEmployees").then((interception) => {
          expect(interception.request.url).to.include("filterBy=department");
          expect(interception.request.url).to.include("filterValue=finance");
        });
        cy.fixture("pageOneFinance.json").then((apiData) => {
          cy.get(".tbody")
            .children()
            .each((child, index) => {
              cy.wrap(child)
                .find(".name")
                .should("contain", apiData.data[index].name);
              cy.wrap(child)
                .find(".department")
                .should("contain", apiData.data[index].department);
            });
        });
        cy.get("[data-testid=page-btn").should("have.length", 1);
        cy.then(() => {
          acc_score += 2;
        });
      });

      it(`generate score`, () => {
        console.log("final score:", acc_score);
        ////////////// this should not be chnages
        let result = {
          id,
          marks: Math.ceil(acc_score),
        };
        result = JSON.stringify(result);
        cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
          if (err) {
            console.error(err);
          }
        });
        //////////////////
      });
    });
  });
}
