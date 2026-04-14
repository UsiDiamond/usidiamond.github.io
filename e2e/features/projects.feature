Feature: Projects Page
  Verifies that the Projects page loads and displays all project content.

  Scenario: Projects page renders project section cards
    Given I go to "http://localhost:8080/#/projects"
    Then project section cards are visible

  Scenario Outline: Projects page contains the "<project>" project
    Given I go to "http://localhost:8080/#/projects"
    Then the page contains "<project>"

    Examples:
      | project                                          |
      | mySocialSecurity - Online Self Service           |
      | mySocialSecurity - Representative Payee Services |
      | Upload Documents                                 |
      | Neurodiversity in Business Website Rewrite       |
      | Heros-Engine                                     |
      | Enterprise Project Management Office Application |
      | EMAC 1                                           |
      | LRERWMS                                          |
      | AuDITS                                           |
      | EMAC 2                                           |
      | SRDP                                             |
      | DOORS                                            |
      | ESP                                              |
      | Combined Federal Campaign Data Analytics and Reporting |
