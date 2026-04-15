Feature: Volunteering Page
  Verifies that the Volunteering page loads and displays all volunteering content.

  Scenario: Volunteering page renders volunteering section cards
    Given I go to "http://localhost:8080/#/volunteering"
    Then volunteering section cards are visible

  Scenario: Volunteering nav link navigates to the correct page
    Given I go to "http://localhost:8080/#/home"
    When I click the "Volunteering" nav link
    Then the URL contains '/volunteering'
    And the page header is visible
    And the navigation menu is visible

  Scenario Outline: Volunteering page contains the "<entry>" entry
    Given I go to "http://localhost:8080/#/volunteering"
    Then the page contains "<entry>"

    Examples:
      | entry                                      |
      | Health and Safety Specialist               |
      | The Pride Center of Maryland               |
      | Baltimore Playwrights Festival             |
      | Opera Vivente                              |
