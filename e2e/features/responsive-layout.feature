Feature: Responsive layout across devices
  Validates that the site does not introduce horizontal scrolling,
  that cards stay inside their columns, and that heading chips stay
  inside their parent containers at mobile, tablet, and desktop
  viewport sizes.

  Scenario Outline: "<page>" has no horizontal overflow on <label>
    Given the viewport is <width>x<height>
    When I go to "http://localhost:8080/#/<page>"
    Then the page does not scroll horizontally
    And every h1 and h2 stays within the viewport
    And every diamond-card stays within its column

    Examples:
      | label   | width | height | page          |
      | mobile  |  375  |  700   | home          |
      | mobile  |  375  |  700   | projects      |
      | mobile  |  375  |  700   | education     |
      | mobile  |  375  |  700   | volunteering  |
      | mobile  |  375  |  700   | contact       |
      | tablet  |  768  |  1024  | home          |
      | tablet  |  768  |  1024  | projects      |
      | tablet  |  768  |  1024  | education     |
      | tablet  |  768  |  1024  | volunteering  |
      | tablet  |  768  |  1024  | contact       |
      | desktop | 1440  |   900  | home          |
      | desktop | 1440  |   900  | projects      |
      | desktop | 1440  |   900  | education     |
      | desktop | 1440  |   900  | volunteering  |
      | desktop | 1440  |   900  | contact       |

  Scenario Outline: page title is horizontally centred on <label>
    Given the viewport is <width>x<height>
    When I go to "http://localhost:8080/#/<page>"
    Then the first page-title heading is horizontally centred

    Examples:
      | label   | width | height | page          |
      | mobile  |  375  |  700   | projects      |
      | tablet  |  768  |  1024  | projects      |
      | desktop | 1440  |   900  | projects      |
      | mobile  |  375  |  700   | volunteering  |
      | tablet  |  768  |  1024  | volunteering  |
      | desktop | 1440  |   900  | volunteering  |

  Scenario Outline: navigation menu is reachable on <label>
    Given the viewport is <width>x<height>
    When I go to "http://localhost:8080/#/home"
    Then the navigation menu is visible

    Examples:
      | label   | width | height |
      | mobile  |  375  |  700   |
      | tablet  |  768  |  1024  |
      | desktop | 1440  |   900  |
