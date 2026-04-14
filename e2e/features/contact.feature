Feature: Contact Page
  Verifies that the Contact page loads and displays contact information.

  Scenario: Contact page displays the email address
    Given I go to "http://localhost:8080/#/contact"
    Then the page contains "usi@usidiamond.dev"

  Scenario: Contact page has a mailto link for the email address
    Given I go to "http://localhost:8080/#/contact"
    Then a mailto link for "usi@usidiamond.dev" is present
