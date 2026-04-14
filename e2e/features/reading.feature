Feature: Reading Page
  Verifies that the Reading page loads and displays the book list with Amazon links.

  Scenario: Reading page renders reading section cards
    Given I go to "http://localhost:8080/#/reading"
    Then reading section cards are visible

  Scenario: Reading nav link navigates to the correct page
    Given I go to "http://localhost:8080/#/home"
    When I click the "Reading" nav link
    Then the URL contains '/reading'
    And the page header is visible
    And the navigation menu is visible

  Scenario: Reading page links to Amazon
    Given I go to "http://localhost:8080/#/reading"
    Then a link to "amazon.com" is present

  Scenario Outline: Reading page contains the "<title>" book
    Given I go to "http://localhost:8080/#/reading"
    Then the page contains "<title>"

    Examples:
      | title                          |
      | The Anarchy                    |
      | A Wizard of Earthsea           |
      | The Phoenix Project            |
      | The Bahir                      |
      | Classical Mechanics            |
      | Flatland                       |
      | Dragonflight                   |
      | Gödel, Escher, Bach            |
