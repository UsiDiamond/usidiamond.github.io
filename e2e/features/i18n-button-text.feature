@skip
Feature: bg-toggle and skip-link text is translated in every language
  Verifies that the pause-animation button label and skip-to-content link
  render the correct translated string (not the raw i18n key) for all
  supported languages, and that the skip link actually moves focus to the
  main content area.

  Scenario Outline: bg-toggle label shows translated text in <lang>
    Given I go to "http://localhost:8080/"
    When the language is set to "<lang>"
    Then the bg-toggle label reads "<pauseText>"
    And the bg-toggle label does not contain "common."

  Examples:
    | lang    | pauseText                  |
    | en      | Pause animation            |
    | ar      | إيقاف الحركة مؤقتاً        |
    | de      | Animation pausieren        |
    | es      | Pausar animación           |
    | fr      | Mettre en pause            |
    | ko      | 애니메이션 일시정지         |
    | ru      | Пауза анимации             |
    | tl      | I-pause ang animasyon      |
    | vi      | Tạm dừng hoạt ảnh          |
    | yi      | פּויזירן אַנימאַציע          |
    | zh-Hans | 暂停动画                   |

  Scenario Outline: skip-to-content link shows translated text in <lang>
    Given I go to "http://localhost:8080/"
    When the language is set to "<lang>"
    Then the skip link reads "<skipText>"

  Examples:
    | lang    | skipText                                    |
    | en      | Skip to main content                        |
    | ar      | تخطي إلى المحتوى الرئيسي                    |
    | de      | Zum Hauptinhalt springen                    |
    | es      | Saltar al contenido principal               |
    | fr      | Aller au contenu principal                  |
    | ko      | 본문으로 건너뛰기                            |
    | ru      | Перейти к основному содержимому             |
    | tl      | Laktawan ang pangunahing nilalaman          |
    | vi      | Chuyển đến nội dung chính                   |
    | yi      | שפּרינג צום הויפּט־אינהאַלט                |
    | zh-Hans | 跳至主要内容                                |

  Scenario Outline: skip link moves focus to main content in <lang>
    Given I go to "http://localhost:8080/#/home"
    When the language is set to "<lang>"
    And I click on the Skip to Content link
    Then the main content area is present
    And the main content area has focus

  Examples:
    | lang    |
    | en      |
    | ar      |
    | de      |
    | zh-Hans |
