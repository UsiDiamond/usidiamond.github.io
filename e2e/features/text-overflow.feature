Feature: Text does not overflow its container
  Verifies that headings across the site (including any WebGL text
  effects rendered on top of them) stay within their parent card or
  column and that no page introduces horizontal scrolling.


  Scenario Outline: Card headings fit within their cards on "<page>"
    Given I go to "http://localhost:8080/#/<page>"
    Then every h2 inside a diamond-card stays within the card

    Examples:
      | page          |
      | projects      |
      | education     |
      | volunteering  |
