Feature: Site Navigation
  Verifies that the site header, navigation menu, skip link, and all nav links work correctly.

  Scenario: Site loads with header, navigation menu, and skip link
    Given I go to "http://localhost:8080/"
    Then the page header is visible
    And the navigation menu is visible
    And a skip to content link is present

  Scenario Outline: <label> nav link navigates to the correct page
    Given I go to "http://localhost:8080/"
    When I click the "<label>" nav link
    Then the URL contains "/<route>"
    And the page header is visible
    And the navigation menu is visible

    Examples:
      | label        | route     |
      | Introduction | home      |
      | Projects     | projects  |
      | Education    | education |
      | Contact      | contact   |

  Scenario Outline: Skip link and main content target are present on the <page> page
    Given I go to "http://localhost:8080/#/<route>"
    Then a skip to content link is present
    And the main content area is present

    Examples:
      | page        | route     |
      | Home        | home      |
      | Projects    | projects  |
      | Education   | education |
      | Contact     | contact   |
