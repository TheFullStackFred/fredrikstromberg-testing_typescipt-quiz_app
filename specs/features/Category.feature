Feature: Category

  Scenario: Pick a category
    Given category: history
    When Picking a category
    Then The picked category should be: history
