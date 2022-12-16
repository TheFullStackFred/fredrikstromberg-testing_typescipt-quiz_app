Feature: Category

  Scenario: Pick a category and difficulty
    Given category:music
    Given difficulty:easy
    When Picking category and difficulty
    Then The picked CD should be musiceasy
