Feature: Category

  Scenario: Pick a category
    Given category: History
    When Check if the category is correct
    Then The picked category should be: History
