Feature: Landing Page
    This feature lets a user see the landing page.

    Scenario: Skip to content link navigates to main content
        Given I go to "http://localhost:8080/"
        When I click on the Skip to Content link
        Then the URL contains "#maincontent"
