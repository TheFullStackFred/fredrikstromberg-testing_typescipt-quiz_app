Feature: Difficulty

  Scenario: Pick a difficulty
    Given difficulty: easy
    When Picking a difficulty
    Then The picked difficulty should be: easy
