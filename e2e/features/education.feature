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
      | Private Studio of Shazy King in Baltimore MD              |
      | University of Maryland Baltimore County                   |
      | Licenses & Certifications                                 |
      | Adult and Pediatric First Aid/CPR/AED                     |
      | Basic Life Support for Healthcare and Public Safety (BLS) |
      | Introduction to R Course                                  |
      | Certified Advanced Tutor                                  |
