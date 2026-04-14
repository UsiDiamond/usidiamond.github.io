Feature: Projects Page
  Verifies that the Projects page loads correctly and displays project content.

  Scenario: Projects link navigates to the projects page
    Given I go to "http://localhost:8080/"
    When I click the Projects nav link
    Then the URL contains "/projects"
    And the page header is visible

  Scenario: Projects page renders project section cards
    Given I go to "http://localhost:8080/#/projects"
    Then project section cards are visible

  Scenario: Projects page contains the mySocialSecurity project
    Given I go to "http://localhost:8080/#/projects"
    Then the projects page contains "mySocialSecurity - Online Self Service"

  Scenario: Projects page has skip link target
    Given I go to "http://localhost:8080/#/projects"
    Then the main content area is present
