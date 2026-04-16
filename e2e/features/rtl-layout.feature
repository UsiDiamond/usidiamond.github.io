Feature: RTL language layout — no overflow or element overlap
  When a right-to-left language is selected the pause-animation button
  must move to the inline-end side and no text should overflow its container.

  Scenario Outline: No horizontal overflow in <lang> (<label>)
    Given the viewport is <width>x<height>
    Given I go to "http://localhost:8080/#/home"
    And the language is set to "<lang>"
    Then the page does not scroll horizontally
    And every h1 and h2 stays within the viewport
    And every nav link text stays within its button

  Examples:
    | label   | width | height | lang |
    | mobile  |   375 |    700 | ar   |
    | mobile  |   375 |    700 | yi   |
    | mobile  |   375 |    700 | de   |
    | mobile  |   375 |    700 | ru   |
    | tablet  |   768 |   1024 | ar   |
    | tablet  |   768 |   1024 | yi   |
    | desktop |  1440 |    900 | ar   |
    | desktop |  1440 |    900 | yi   |

  Scenario Outline: bg-toggle button does not overlap language selector in <lang> (<label>)
    Given the viewport is <width>x<height>
    Given I go to "http://localhost:8080/#/home"
    And the language is set to "<lang>"
    Then the bg-toggle button does not overlap the language switcher

  Examples:
    | label   | width | height | lang |
    | mobile  |   375 |    700 | ar   |
    | mobile  |   375 |    700 | en   |
    | desktop |  1440 |    900 | ar   |
    | desktop |  1440 |    900 | en   |
