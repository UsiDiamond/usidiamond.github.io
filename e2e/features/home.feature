Feature: Home Page
  Verifies that the Introduction page loads and displays all sections and links.

  Scenario Outline: Home page contains the "<section>" section
    Given I go to "http://localhost:8080/#/home"
    Then the page contains "<section>"

    Examples:
      | section      |
      | What is an Usi? |
      | Pronouns     |
      | Social Links |

  Scenario: Home page has a LinkedIn link
    Given I go to "http://localhost:8080/#/home"
    Then a link to "linkedin.com/in/usidiamond" is present

  Scenario: Home page has a GitHub link
    Given I go to "http://localhost:8080/#/home"
    Then a link to "github.com/usidiamond" is present
