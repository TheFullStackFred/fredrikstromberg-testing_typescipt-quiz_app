Feature: Difficulty

  Scenario: Pick a difficulty
    Given difficulty: Hard
    When Picking a difficulty
    Then The picked difficulty should be: Hard
