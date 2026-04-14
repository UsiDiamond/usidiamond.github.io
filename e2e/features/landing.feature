Feature: Landing Page
    This feature lets a user see the landing page.

    Scenario: Skip to content link is present
        Given I go to "http://localhost:8080/"
        Then a skip to content link is present
