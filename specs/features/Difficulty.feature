Feature: Difficulty

  Scenario: Pick a difficulty
    Given difficulty: Hard
    When Check if the difficulty is correct
    Then The picked difficulty should be: Hard
