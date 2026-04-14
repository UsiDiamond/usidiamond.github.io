Feature: About Page
  Verifies that the About page loads and displays all sections.

  Scenario Outline: About page contains the "<section>" section
    Given I go to "http://localhost:8080/#/about"
    Then the page contains "<section>"

    Examples:
      | section                         |
      | What music does it like?        |
      | What causes does it care about? |
      | What games does it like?        |
      | What does the Usi do for money? |
