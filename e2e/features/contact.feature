Feature: Contact Page
  Verifies that the Contact page loads correctly and displays contact information.

  Scenario: Contact link navigates to the contact page
    Given I go to "http://localhost:8080/"
    When I click the Contact nav link
    Then the URL contains "/contact"
    And the page header is visible

  Scenario: Contact page has skip link target
    Given I go to "http://localhost:8080/#/contact"
    Then the main content area is present

  Scenario: Contact page displays the email address
    Given I go to "http://localhost:8080/#/contact"
    Then the contact page displays "usi@usidiamond.dev"

  Scenario: Contact page has a mailto link for the email address
    Given I go to "http://localhost:8080/#/contact"
    Then a mailto link for "usi@usidiamond.dev" is present
