Feature: Site Navigation
  Verifies that the site loads correctly and the navigation links work.

  Scenario: Site loads and displays the header and navigation
    Given I go to "http://localhost:8080/"
    Then the page header is visible
    And the navigation menu is visible

  Scenario: Introduction link navigates to the home page
    Given I go to "http://localhost:8080/"
    When I click the Introduction nav link
    Then the URL contains "/home"
    And the page header is visible

  Scenario: About link navigates to the about page
    Given I go to "http://localhost:8080/"
    When I click the About nav link
    Then the URL contains "/about"
    And the page header is visible
