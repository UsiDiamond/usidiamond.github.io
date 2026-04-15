Feature: Education Page
  Verifies that the Education page loads and displays all education and certification content.

  Scenario: Education page renders education section cards
    Given I go to "http://localhost:8080/#/education"
    Then education section cards are visible

  Scenario Outline: Education page contains the "<entry>" entry
    Given I go to "http://localhost:8080/#/education"
    Then the page contains "<entry>"

    Examples:
      | entry                                                     |
      | Stevenson University                                      |
      | Licenses & Certifications                                 |
      | Certified Advanced Tutor                                  |
